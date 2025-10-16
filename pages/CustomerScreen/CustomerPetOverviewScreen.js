import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ref, get, remove, onValue } from "firebase/database";
import { realtimeDb } from "../../firebase";
import CustomerPetOverviewScreenStyle from "../../styles/CustomerScreenStyle/CustomerPetOverviewScreenStyle";

export default function CustomerPetOverviewScreen({ route, navigation }) {
  const { pet } = route.params;
  const [medicalRecords, setMedicalRecords] = useState({
    diagnosis: [],
    treatment: [],
    anamnesis: [],
  });
  const [refreshing, setRefreshing] = useState(false);
  const [petStatus, setPetStatus] = useState("Still in Progress");

  const fetchPetsCustomer = async () => {
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
        setPetStatus(petData.status || "Still in Progress"); // Fetch and set pet status
      } else {
        console.log("No data available");
        setMedicalRecords({ diagnosis: [], treatment: [], anamnesis: [] });
        setPetStatus("Still in Progress"); // Default status if no data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
  const petRef = ref(realtimeDb, `pets/${pet.id}`);
  
  const unsubscribe = onValue(petRef, (snapshot) => {
    if (snapshot.exists()) {
      const petData = snapshot.val();
      setMedicalRecords({
        anamnesis: Array.isArray(petData.anamnesis) ? petData.anamnesis : [],
        diagnosis: Array.isArray(petData.diagnosis) ? petData.diagnosis : [],
        treatment: Array.isArray(petData.treatment) ? petData.treatment : [],
      });
      setPetStatus(petData.status || "Still in Progress");
    } else {
      setMedicalRecords({ diagnosis: [], treatment: [], anamnesis: [] });
      setPetStatus("Still in Progress");
    }
  });

  return () => unsubscribe();
}, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchPetsCustomer();
    setRefreshing(false);
  };

  // Function to delete the pet data

  return (
    <View style={CustomerPetOverviewScreenStyle.wholepage}>
      {/* Pet Information */}
      <View style={CustomerPetOverviewScreenStyle.FirstContainer}>
        <Image
          style={CustomerPetOverviewScreenStyle.ImageProfilePet}
          source={{ uri: pet.petImage }}
        />
      </View>

      <View style={CustomerPetOverviewScreenStyle.SecondContainer}>
        <View>
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: 24,
              color: "#83520A",
              fontWeight: "bold",
              
              marginTop:7,
       
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
              
              marginTop: 3,
            }}
          >
            {pet.age} Tahun
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
        Rekam Medis
      </Text>

      <View
        style={{ marginTop: 0, height: "50%", width: 357, alignSelf: "center" }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {medicalRecords.treatment.map((treatmentItem, index) => (
            <View
              style={CustomerPetOverviewScreenStyle.ContainerMedic}
              key={`${pet.id}_record_${index}`}
            >
              <Text style={CustomerPetOverviewScreenStyle.TextDescription}>
                Date : {new Date(treatmentItem.date).toLocaleDateString()}
              </Text>
              <View>
                <Text style={CustomerPetOverviewScreenStyle.TextDescription}>
                  Tindakan : {treatmentItem.text}
                </Text>
                <Text style={CustomerPetOverviewScreenStyle.TextDescription}>
                  Diagnosa :{" "}
                  {medicalRecords.diagnosis[index]
                    ? medicalRecords.diagnosis[index].text
                    : "No diagnosa available"}
                </Text>
                <Text style={CustomerPetOverviewScreenStyle.TextDescription}>
                  Anamnesis :{" "}
                  {medicalRecords.anamnesis[index]
                    ? medicalRecords.anamnesis[index].text
                    : "No anamnesis available"}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            height: 42,
            width: 353,
            borderRadius: 10,
            marginTop: 15,
            alignContent: "center",
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center",
            backgroundColor:
              petStatus === "Still Under Treatment"
                ? "#83520A"
                : "rgba(195, 167, 113, 0.15)",
          }}
        >
          <Text
            style={{
              color:
                petStatus === "Still Under Treatment"
                  ? "rgba(237, 229, 212, 1)"
                  : "#83520A",
              fontFamily: "Poppins",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {petStatus === "Still Under Treatment"
              ? "STILL UNDER TREATMENT"
              : "TREATMENT COMPLETED"}
          </Text>
        </View>
      </View>
    </View>
  );
}
