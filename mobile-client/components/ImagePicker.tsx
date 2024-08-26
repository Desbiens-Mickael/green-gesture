import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

interface Props {
  getFileData: (fileData: ImagePicker.ImagePickerAsset) => void;
}

export default function ImagePickerElement({ getFileData }: Props) {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      getFileData(result.assets[0]);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={pickImage} style={styles.button}>
        <Text style={{ fontWeight: "600", textAlign: "center" }}>
          {image ? "Changer l'image" : "Ajouter une image"}
        </Text>
      </TouchableOpacity>
      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, borderRadius: 10 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "lightgray",
    borderRadius: 5,
    padding: 8,
    borderWidth: 1,
    marginVertical: 15,
  },
});
