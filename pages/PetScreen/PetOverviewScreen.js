import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import PetOverviewScreenStyle from "../../styles/PetScreenStyle/PetOverviewScreenStyle";
import { ref, get, remove, update } from "firebase/database";
import { realtimeDb } from "../../firebase";

export default function PetOverviewScreen({ route, navigation }) {
  const { pet } = route.params;
  const screenWidth = Dimensions.get("window").width;
  const [medicalRecords, setMedicalRecords] = useState({
    diagnosis: [],
    treatment: [],
    anamnesis: [],
  });
  const [petStatus, setPetStatus] = useState(pet.status || "Still in Progress");
  const [refreshing, setRefreshing] = useState(false);

  const fetchPets = async () => {
    try {
      const petRef = ref(realtimeDb, `pets/${pet.id}`);
      const petSnap = await get(petRef);

      if (petSnap.exists()) {
        const petData = petSnap.val();
        setMedicalRecords({
          anamnesis: Array.isArray(petData.anamnesis) ? petData.anamnesis : [],
          diagnosis: Array.isArray(petData.diagnosis) ? petData.diagnosis : [],
          treatment: Array.isArray(petData.treatment) ? petData.treatment : [],
        });
      } else {
        console.log("No data available");
        setMedicalRecords({ diagnosis: [], treatment: [], anamnesis: [] });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPets();
    setRefreshing(false);
  };

  const updatePetStatus = async (status) => {
    try {
      const petRef = ref(realtimeDb, `pets/${pet.id}`);
      await update(petRef, { status });
      setPetStatus(status);
      Alert.alert("Success", `Pet status updated to: ${status}`);
    } catch (error) {
      console.error("Error updating status:", error);
      Alert.alert("Error", "Failed to update pet status.");
    }
  };

  // Function to delete the pet data
  const deletePet = async () => {
    Alert.alert("Delete Pet", "Are you sure you want to delete this pet?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const petRef = ref(realtimeDb, `pets/${pet.id}`);
            await remove(petRef); // Delete the pet data from the database
            Alert.alert("Success", "Pet deleted successfully!");
            navigation.goBack(); // Navigate back to the previous screen
          } catch (error) {
            console.error("Error deleting pet:", error);
            Alert.alert("Error", "Failed to delete pet.");
          }
        },
      },
    ]);
  };

  const deleteMedicalRecord = async (index) => {
    Alert.alert(
      "Delete Record",
      "Are you sure you want to delete this medical record?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              // Hapus data pada index yang dipilih
              const updatedAnamnesis = [...medicalRecords.anamnesis];
              const updatedDiagnosis = [...medicalRecords.diagnosis];
              const updatedTreatment = [...medicalRecords.treatment];

              updatedAnamnesis.splice(index, 1);
              updatedDiagnosis.splice(index, 1);
              updatedTreatment.splice(index, 1);

              // Buat objek untuk diperbarui di Firebase
              const updatedRecords = {
                anamnesis:
                  updatedAnamnesis.length > 0 ? updatedAnamnesis : null,
                diagnosis:
                  updatedDiagnosis.length > 0 ? updatedDiagnosis : null,
                treatment:
                  updatedTreatment.length > 0 ? updatedTreatment : null,
              };

              // Update Firebase
              const petRef = ref(realtimeDb, `pets/${pet.id}`);
              await update(petRef, updatedRecords);

              // Update state
              setMedicalRecords(updatedRecords);

              Alert.alert("Success", "Medical record deleted successfully!");
            } catch (error) {
              console.error("Error deleting record:", error);
              Alert.alert("Error", "Failed to delete record.");
            }
          },
        },
      ]
    );
  };

  const InfoRow = ({ label, value }) => (
    <View style={{ flexDirection: "row", marginBottom: 4 }}>
      <Text style={[PetOverviewScreenStyle.TextDescription, { width: 100 }]}>
        {label}
      </Text>
      <Text style={PetOverviewScreenStyle.TextDescription}>: {value}</Text>
    </View>
  );

  return (
    <View style={PetOverviewScreenStyle.wholepage}>
      {/* Pet Information */}
      <View style={PetOverviewScreenStyle.FirstContainer}>
        <TouchableOpacity onPress={deletePet}>
          <Image
            style={{ left: 160, marginTop: 20 }}
            source={require("../../assets/trashIcon.png")}
          />
        </TouchableOpacity>
        <Image
          style={PetOverviewScreenStyle.ImageProfilePet}
          source={{ uri: pet.petImage }}
        />
      </View>

      <View style={PetOverviewScreenStyle.SecondContainer}>
        <View>
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 24,
              color: "#83520A",
              fontWeight: "bold",
              marginLeft: 20,
              marginTop: 5,
            }}
          >
            {pet.petName}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 20,
              fontWeight: "450",
              color: "#83520A",
              marginLeft: 20,
              marginTop: 3,
            }}
          >
            {pet.petType}
          </Text>
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 15,
              fontWeight: "450",
              color: "#83520A",
              marginLeft: 20,
              marginTop: 3,
            }}
          >
            {pet.age} Months
          </Text>
        </View>

        <View style={{ justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 15,
              marginLeft: 100,
              color: "#83520A",
              fontWeight: "700",
            }}
          >
            {pet.customerName}
          </Text>
          <Text
            style={{
              marginTop: 5,
              color: "#83520A",
              fontSize: 15,
              fontWeight: "700",
              marginLeft: 100,
            }}
          >
            {pet.phoneNumber}
          </Text>
          <Text
            style={{
              marginTop: 5,
              fontWeight: "700",
              color: "#83520A",
              fontSize: 10,
              marginLeft: 100,
            }}
            numberOfLines={2}
            ellipsizeMode="clip"
          >
            {pet.address}
          </Text>
        </View>
      </View>

      <Text
        style={{
          marginTop: 25,
          marginLeft: 25,
          fontFamily: "Poppins",
          fontSize: 14,
          color: "#83520A",
          fontWeight: 600,
        }}
      >
        Medical Records
      </Text>

      <View
        style={{
          marginTop: 0,
          height: "35%",
          width: 357,
          alignSelf: "center",
          paddingBottom: 10,
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {medicalRecords.treatment.map((treatmentItem, index) => (
            <View
              style={PetOverviewScreenStyle.ContainerMedic}
              key={`${pet.id}_record_${index}`}
            >
              <View style={{ flexDirection: "column" }}>
                <InfoRow
                  label="Date"
                  value={new Date(treatmentItem.date).toLocaleDateString()}
                />
                <InfoRow label="Treatment" value={treatmentItem.text} />
                <InfoRow
                  label="Diagnosis"
                  value={
                    medicalRecords.diagnosis[index]
                      ? medicalRecords.diagnosis[index].text
                      : "No diagnosis available"
                  }
                />
                <InfoRow
                  label="Anamnesis"
                  value={
                    medicalRecords.anamnesis[index]
                      ? medicalRecords.anamnesis[index].text
                      : "No anamnesis available"
                  }
                />
                <TouchableOpacity onPress={() => deleteMedicalRecord(index)}>
                  <Image
                    style={{
                      width: 25,
                      height: 25,
                      position: "absolute",
                      left: screenWidth * 0.76,
                      bottom: screenWidth * 0.02,
                    }}
                    source={require("../../assets/trashIcon.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 5,
        }}
      >
        <TouchableOpacity
          onPress={() => updatePetStatus("TREATMENT COMPLETED")}
          style={{ backgroundColor: "green", padding: 10, borderRadius: 10 }}
        >
          <Text style={{ fontSize: 10, color: "white", fontWeight: "bold" }}>
            TREATMENT COMPLETED
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => updatePetStatus("Still Under Treatment")}
          style={{ backgroundColor: "red", padding: 10, borderRadius: 10 }}
        >
          <Text style={{ fontSize: 10, color: "white", fontWeight: "bold" }}>
            STILL UNDER TREATMENT
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignSelf: "center",
          height: 50,
          width: 230,
          justifyContent: "center",
          borderRadius: 30,
          backgroundColor: "#83520A",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          style={{ marginTop: 0, alignSelf: "center", alignItems: "center" }}
          onPress={() =>
            navigation.navigate("Add Medical Record Screen", { petId: pet.id })
          }
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#FFFFFF" }}>
            Add Medical Record
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
