import React, { useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import RadioGroup, { RadioButtonProps } from "react-native-radio-buttons-group";
import { ImagePickerAsset } from "expo-image-picker";
import axios from "axios";
import Constants from "expo-constants";

import {
  useCreateUserEcoActionMutation,
  useGetValidationsByEcoActionQuery,
} from "../gql/generated/schema";
import ImagePickerElement from "./ImagePicker";

const env = Constants.expoConfig?.extra || {};

interface ValidationProps {
  ecoActionId: number;
  groupId: number;
  refetchParent: () => void;
}

const Validation = ({
  ecoActionId,
  groupId,
  refetchParent,
}: ValidationProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<string>("0");
  const [fileData, setFileData] = useState<null | ImagePickerAsset>(null);

  const [createUserEcoAction, { loading: loadingCreateUserEcoAction }] =
    useCreateUserEcoActionMutation();

  const { data, loading: loadingPoints } = useGetValidationsByEcoActionQuery({
    variables: { ecoActionId },
  });
  const validationPoints = data?.getValidationsByEcoAction;

  const radioButtons: RadioButtonProps[] = useMemo(
    () =>
      validationPoints?.map((validation) => ({
        id: validation.points.toString(),
        label: validation.points.toString() + " pts",
        value: validation.points.toString(),
      })) || [],
    [validationPoints]
  );

  const showConfirmDialog = () => {
    return Alert.alert(
      "Valider mon défi",
      `Voulez-vous valider votre défi avec ${selectedPoint} points ?`,
      [
        // The "Yes" button
        {
          text: "Oui",
          onPress: () => {
            handleValidation();
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "Non",
        },
      ]
    );
  };

  const photoUploader = async () => {
    if (!fileData) return;
    const url = "https://upload.uploadcare.com/base/";
    const photo = {
      name: fileData.uri.split("/").pop() || "photo.jpg",
      uri: fileData.uri,
      type: "image/jpg",
    };
    const body = new FormData();
    body.append("file", photo);
    body.append("UPLOADCARE_PUB_KEY", env?.REACT_APP_UPLOADCARE_PUBLIC_KEY);
    body.append("UPLOADCARE_STORE", "auto");

    try {
      let response = await axios.post(url, body, { timeout: 20000 });

      return response.data;
    } catch (e: any) {
      console.error("error: ", e.response.data);
      return e.response;
    }
  };

  const handleValidation = async () => {
    const uploadcareResponse = await photoUploader();

    if (uploadcareResponse.status >= 400) {
      return;
    }

    const fileUrl = "https://ucarecdn.com/" + uploadcareResponse.file + "/";

    try {
      const res = await createUserEcoAction({
        variables: {
          data: {
            ecoActionId,
            groupId,
            points: parseInt(selectedPoint),
            proof: fileUrl,
          },
        },
      });

      refetchParent();
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.btnText}>Valider</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.buttonClose}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.buttonCLoseText}>X</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.modalTitle}>Je note mon défi</Text>
              <RadioGroup
                radioButtons={radioButtons}
                onPress={setSelectedPoint}
                selectedId={selectedPoint}
                containerStyle={styles.radioGroup}
              />
            </View>
            <View style={{ marginVertical: 25 }}>
              <Text style={{ textAlign: "center", fontSize: 18 }}>
                J'ajoute une preuve
              </Text>
              <ImagePickerElement
                getFileData={(data: ImagePickerAsset) => setFileData(data)}
              />
            </View>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={showConfirmDialog}
              disabled={loadingCreateUserEcoAction}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: "white",
                  textTransform: "uppercase",
                  fontWeight: "600",
                }}
              >
                {loadingCreateUserEcoAction
                  ? "Validation en cours..."
                  : "Confirmer"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Validation;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    backgroundColor: "orange",
    borderRadius: 5,
  },
  btnText: {
    textTransform: "uppercase",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 55,
    position: "relative",
  },
  buttonClose: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "green",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50,
  },
  buttonCLoseText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  modalView: {
    display: "flex",
    gap: 10,
    position: "relative",
    backgroundColor: "#DDE2D2",
    maxWidth: "90%",
    padding: 35,
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    marginTop: 15,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  radioGroup: {
    flexDirection: "row",
  },
  confirmButton: {
    backgroundColor: "teal",
    padding: 14,
    borderRadius: 5,
    width: 250,
  },
});
