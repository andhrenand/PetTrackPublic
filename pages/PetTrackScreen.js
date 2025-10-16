import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Alert,
} from "react-native";
import MedicalRecordScreenStyle from "../styles/PetTrackScreenStyle";
import {
  ref,
  set,
  push,
  get,
  query,
  getDatabase,
  limitToLast,
  onValue,
  remove,
} from "firebase/database";
import { realtimeDb } from "../firebase";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

export default function PetTrackScreen({ navigation }) {
  const [rfidUID, setRfidUID] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerUsername, setCustomerUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");
  const [age, setAge] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [treatment, setTreatment] = useState("");
  const [anamnesis, setAnamnesis] = useState("");
  const [diagnosisList, setDiagnosisList] = useState([]);
  const [treatmentList, setTreatmentList] = useState([]);
  const [anamnesisList, setAnamnesisList] = useState([]);
  const [petImage, setPetImage] = useState(null);
  const storage = getStorage();

  const fetchAndDeleteRFID = async (uid) => {
    try {
      const db = getDatabase();
      const rfidRef = ref(db, "RFID");
      const latestQuery = query(rfidRef, limitToLast(1));

      const snapshot = await get(latestQuery);

      if (snapshot.exists()) {
        let latestData = null;
        let latestKey = null;

        snapshot.forEach((childSnapshot) => {
          latestKey = childSnapshot.key; // Get the key of the latest entry
          latestData = { uid: latestKey, ...childSnapshot.val() };
        });

        console.log("Latest RFID Data:", latestData);

        if (latestKey) {
          setTimeout(async () => {
            try {
              await remove(ref(db, `RFID/${latestKey}`));
              console.log(`RFID data with UID ${latestKey}`);
            } catch (deleteError) {
              console.error("Error deleting RFID data:", deleteError);
            }
          }, 1000);
        }

        return latestData; // Ensure the function returns the latest data
      } else {
        return null; // Return null if no data exists
      }
    } catch (error) {
      console.error("Error fetching latest RFID data:", error);
      return null; // Return null in case of error
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const rfidRef = ref(db, "RFID");
  
    const unsubscribe = onValue(rfidRef, (snapshot) => {
      if (snapshot.exists()) {
        let latestData = null;
        let latestKey = null;
  
        snapshot.forEach((childSnapshot) => {
          latestKey = childSnapshot.key; // Ambil key terbaru
          latestData = { uid: latestKey, ...childSnapshot.val() };
        });
  
        console.log("Latest RFID Data:", latestData);
        setRfidUID(latestData.uid);
  
        // Hapus data setelah terbaca
        if (latestKey) {
          remove(ref(db, `RFID/${latestKey}`))
            .then(() => console.log(`RFID data with UID ${latestKey} removed`))
            .catch((error) => console.error("Error deleting RFID data:", error));
        }
      }
    });
  
    return () => unsubscribe(); // Membersihkan listener saat komponen unmount
  }, []);

  const inputPetData = () => {
    if (diagnosis.trim())
      setDiagnosisList((prev) => [
        ...prev,
        { text: diagnosis.trim(), date: new Date().toISOString() },
      ]);
    if (treatment.trim())
      setTreatmentList((prev) => [
        ...prev,
        { text: treatment.trim(), date: new Date().toISOString() },
      ]);
    if (anamnesis.trim())
      setAnamnesisList((prev) => [
        ...prev,
        { text: anamnesis.trim(), date: new Date().toISOString() },
      ]);

    const newPetKey = push(ref(realtimeDb, "pets")).key;
    const currentDate = new Date().toISOString();

    set(ref(realtimeDb, "pets/" + newPetKey), {
      customerName,
      phoneNumber,
      address,
      customerUsername,
      rfidUID,
      petName,
      petType,
      age,
      diagnosis: [
        ...diagnosisList,
        { text: diagnosis.trim(), date: currentDate },
      ].filter((item) => item.text),
      treatment: [
        ...treatmentList,
        { text: treatment.trim(), date: currentDate },
      ].filter((item) => item.text),
      anamnesis: [
        ...anamnesisList,
        { text: anamnesis.trim(), date: currentDate },
      ].filter((item) => item.text),
      petImage,
      date: currentDate,
    })
      .then(() => {
        Alert.alert("Success", "Pet data successfully added!");

        clearFields();
      })
      .catch((error) => {
        console.error("Error writing data: ", error);
        Alert.alert("Error", "An error occurred. Please try again.");
      });
  };

  const clearFields = () => {
    setCustomerName("");
    setCustomerUsername;
    setPhoneNumber("");
    setAddress("");
    setRfidUID("");
    setPetName("");
    setPetType("");
    setAge("");
    setDiagnosis("");
    setDiagnosisList([]);
    setTreatment("");
    setTreatmentList([]);
    setAnamnesis("");
    setAnamnesisList([]);
    setPetImage(null);
  };

  const handleImagePicker = async () => {
    Alert.alert(
      "Upload Image",
      "Choose an option:",
      [
        {
          text: "Take Photo",
          onPress: () => pickImageFromCamera(),
        },
        {
          text: "Choose from Gallery",
          onPress: () => pickImageFromGallery(),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };
  
  const pickImageFromCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera is required!");
      return;
    }
  
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };
  
  const pickImageFromGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };
  
  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageRef = storageRef(storage, `petImages/${Date.now()}.jpg`);
  
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);
      setPetImage(downloadURL); // Simpan URL gambar
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload Failed", "There was an error uploading the image.");
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={MedicalRecordScreenStyle.wholepage}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
          <View>
            <Text style={MedicalRecordScreenStyle.TittleCustomer}>
              CUSTOMER
            </Text>

            <Text style={MedicalRecordScreenStyle.titleTextInput}>
              Customer Name
            </Text>
            <TextInput
              value={customerName}
              onChangeText={setCustomerName}
              style={MedicalRecordScreenStyle.TextInputStyle}
              placeholder="Nama Customer"
              placeholderTextColor="#838383"
            />
            <Text style={MedicalRecordScreenStyle.titleTextInput}>
              Username
            </Text>
            <TextInput
              value={customerUsername}
              onChangeText={setCustomerUsername}
              style={MedicalRecordScreenStyle.TextInputStyle}
              placeholder="Username"
              placeholderTextColor="#838383"
            />

            <Text style={MedicalRecordScreenStyle.titleTextInput}>
              Phone Number
            </Text>
            <TextInput
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              style={MedicalRecordScreenStyle.TextInputStyle}
              placeholder="No Telephone"
              placeholderTextColor="#838383"
              keyboardType="numeric"
            />

            <Text style={MedicalRecordScreenStyle.titleTextInput}>Address</Text>
            <TextInput
              value={address}
              onChangeText={setAddress}
              style={MedicalRecordScreenStyle.TextInputStyle}
              placeholder="Alamat"
              placeholderTextColor="#838383"
            />

            <Text style={MedicalRecordScreenStyle.TittlePet}>PET</Text>

            <Text style={MedicalRecordScreenStyle.titleTextInput}>
              UID RFID
            </Text>
            <TextInput
              value={rfidUID}
              style={MedicalRecordScreenStyle.TextInputStyle}
              placeholder="Scan RFID Terlebih Dahulu"
              placeholderTextColor="#838383"
              editable={false}
            />

            <Text style={MedicalRecordScreenStyle.titleTextInput}>
              Pet Name
            </Text>
            <TextInput
              value={petName}
              onChangeText={setPetName}
              style={MedicalRecordScreenStyle.TextInputStyle}
              placeholder="Nama Hewan"
              placeholderTextColor="#838383"
            />

            <Text style={MedicalRecordScreenStyle.titleTextInput}>
              Pet Type
            </Text>
            <TextInput
              value={petType}
              onChangeText={setPetType}
              style={MedicalRecordScreenStyle.TextInputStyle}
              placeholder="Jenis Hewan"
              placeholderTextColor="#838383"
            />
            <Text style={MedicalRecordScreenStyle.titleTextInput}>Age</Text>
            <TextInput
              value={age}
              onChangeText={setAge}
              style={MedicalRecordScreenStyle.TextInputStyle}
              placeholder="Age"
              placeholderTextColor="#838383"
              keyboardType="numeric"
            />

            <Text style={MedicalRecordScreenStyle.titleTextInput}>
              Anamnesis
            </Text>
            <TextInput
              value={anamnesis}
              onChangeText={setAnamnesis}
              style={MedicalRecordScreenStyle.TextInputStyle}
              placeholder="Anamnesis"
              placeholderTextColor="#838383"
            />

            <Text style={MedicalRecordScreenStyle.titleTextInput}>
              Diagnosis
            </Text>
            <TextInput
              value={diagnosis}
              onChangeText={setDiagnosis}
              style={MedicalRecordScreenStyle.TextInputStyle}
              placeholder="Diagnosis"
              placeholderTextColor="#838383"
            />

            <Text style={MedicalRecordScreenStyle.titleTextInput}>
              Treatment
            </Text>
            <TextInput
              value={treatment}
              onChangeText={setTreatment}
              style={MedicalRecordScreenStyle.TextInputStyle}
              placeholder="Treatment"
              placeholderTextColor="#838383"
            />

            <TouchableOpacity
              style={MedicalRecordScreenStyle.UploadButtonStyle}
              onPress={handleImagePicker}
            >
              <Text style={MedicalRecordScreenStyle.TextUploadStyle}>
                Select Image
              </Text>
            </TouchableOpacity>

            {petImage && (
              <Image
                source={{ uri: petImage }}
                style={MedicalRecordScreenStyle.imagePreview}
              />
            )}

            <TouchableOpacity
              style={MedicalRecordScreenStyle.AddButtonStyle}
              onPress={inputPetData}
            >
              <Text style={MedicalRecordScreenStyle.TextAddStyle}>ADD</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
