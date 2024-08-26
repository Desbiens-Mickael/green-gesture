import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useGetUserEcoActionQuery } from "../gql/generated/schema";

interface Props {
  groupId: number;
  ecoActionId: number;
}

const ValidationDetails = ({ groupId, ecoActionId }: Props) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { data, loading } = useGetUserEcoActionQuery({
    variables: { groupId, ecoActionId },
  });
  const userEcoAction = data?.getUserEcoAction;

  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.btnText}>Ma validation</Text>
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
              <Text style={styles.modalTitle}>Ma note</Text>
              <Text>{`${
                userEcoAction?.points !== undefined ? userEcoAction.points : 0
              } points`}</Text>
            </View>
            <View style={{ marginVertical: 25 }}>
              <Text
                style={{ textAlign: "center", fontSize: 18, marginBottom: 15 }}
              >
                {userEcoAction?.proof ? "Ma preuve" : "Aucune preuve fournie"}
              </Text>
              {userEcoAction?.proof && (
                <Image
                  source={{ uri: userEcoAction?.proof }}
                  style={{ width: 200, height: 200, borderRadius: 10 }}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ValidationDetails;

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
    fontSize: 18,
  },
  modalView: {
    display: "flex",
    gap: 10,
    position: "relative",
    backgroundColor: "#DDE2D2",
    maxWidth: "90%",
    width: "100%",
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
});
