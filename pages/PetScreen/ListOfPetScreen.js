import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  ScrollView,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ListOfPetScreenStyle from "../../styles/PetScreenStyle/ListOfPetScreenStyle";
import { realtimeDb } from "../../firebase";
import {
  ref,
  onValue,
  get,
  getDatabase,
  query,
  limitToLast,
  onChildAdded,
  remove,
} from "firebase/database";

export default function ListOfPetScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]); // Semua data hewan
  const [rfidUID, setRfidUID] = useState(""); // RFID UID terbaru
  const [filteredPets, setFilteredPets] = useState([]); // Hasil filter
  const [searchQuery, setSearchQuery] = useState(""); // Query pencarian
  const [refreshing, setRefreshing] = useState(false); // Pull-to-refresh state

  // Fetch the latest RFID UID
  useEffect(() => {
    const db = getDatabase();
    const rfidRef = ref(db, "RFID");

    const unsubscribe = onChildAdded(rfidRef, async (snapshot) => {
      if (snapshot.exists()) {
        const latestKey = snapshot.key;
        const latestData = snapshot.val();

        if (latestData && latestData.uid) {
          console.log("Latest RFID UID:", latestData.uid);

          setRfidUID(latestData.uid);
          setSearchQuery(latestData.uid);

          // Hapus data setelah mendapatkan UID
          setTimeout(async () => {
            try {
              await remove(ref(db, `RFID/${latestKey}`));
              console.log(
                `RFID data with UID ${latestData.uid} has been deleted`
              );
            } catch (deleteError) {
              console.error("Error deleting RFID data:", deleteError);
            }
          }, 1000);
        }
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery);
    }
  }, [searchQuery]);

  // Fetch pets data from Firebase
  const fetchPets = () => {
    const petsRef = ref(realtimeDb, "pets");
    onValue(
      petsRef,
      (snapshot) => {
        if (snapshot.exists()) {
          const petsArray = [];
          snapshot.forEach((childSnapshot) => {
            petsArray.push({
              id: childSnapshot.key,
              ...childSnapshot.val(),
            });
          });
          setPets(petsArray);
          setFilteredPets(petsArray);
          console.log("Fetched Pets:", petsArray);
        } else {
          console.log("No pets available");
        }
        setLoading(false);
        setRefreshing(false);
      },
      (error) => {
        console.error("Error fetching pets: ", error);
        setLoading(false);
        setRefreshing(false);
      }
    );
  };

  useEffect(() => {
    fetchPets();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchPets();
  };

  // Handle search by pet name or UID
  const handleSearch = (text) => {
    setSearchQuery(text);

    // If search input is empty, show all pets
    if (!text || text.trim() === "") {
      setFilteredPets(pets);
      return;
    }

    console.log("rfidUID dari state:", rfidUID);
    console.log("Teks yang dicari:", text);

    let filteredResults = [];

    if (text.trim().toLowerCase() === rfidUID.trim().toLowerCase()) {
      console.log("Mencari berdasarkan UID");
      filteredResults = pets.filter(
        (pet) =>
          pet.rfidUID &&
          String(pet.rfidUID).trim().toLowerCase() ===
            String(text).trim().toLowerCase()
      );
      console.log("Hasil Filtered by UID:", filteredResults);
    } else {
      const filteredByName = pets.filter(
        (pet) =>
          pet.petName && pet.petName.toLowerCase().includes(text.toLowerCase())
      );
      const filteredByRFID = pets.filter(
        (pet) =>
          pet.rfidUID &&
          String(pet.rfidUID).toLowerCase().includes(text.toLowerCase())
      );
      filteredResults = [...new Set([...filteredByName, ...filteredByRFID])];
      console.log("Hasil Filtered by Name & RFID:", filteredResults);
    }

    setFilteredPets(filteredResults);

    if (filteredResults.length === 0) {
      Alert.alert("Pet Not Found", "Your pet is not registered yet.");
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={ListOfPetScreenStyle.wholepage}>
      <View
        style={{
          marginTop: 20,
          height: "90%",
          width: 360,
          backgroundColor: "rgba(195, 167, 113, 0.3)",
          alignItems: "center",
          borderRadius: 20,
          alignSelf: "center",
          paddingBottom:10
        }}
      >
        <View flexDirection="row">
          <View style={ListOfPetScreenStyle.searchContainer}>
            <Image
              source={require("../../assets/searchIcon.png")}
              style={ListOfPetScreenStyle.searchIcon}
            />
            <TextInput
              style={{
                marginLeft: 10,
                fontFamily: "Poppins",
                fontSize: 16,
                width: "100%",
              }}
              placeholder="Search by pet's name or UID..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={() => handleSearch(searchQuery)}
              returnKeyType="search"
              placeholderTextColor="#838383"
            />

            <Image
              source={require("../../assets/rfidIcon.png")}
              style={ListOfPetScreenStyle.rfidIcon}
            />
          </View>
        </View>
        <ScrollView
          style={{ width: '100%', marginTop: 10 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredPets.map((pet) => (
            <TouchableOpacity
              key={pet.id}
              style={ListOfPetScreenStyle.StyleOfList}
              onPress={() =>
                navigation.navigate("Pet Overview Screen", { pet })
              }
            >
              <View flexDirection="row">
                <Image
                  source={{ uri: pet.petImage }}
                  style={ListOfPetScreenStyle.petImage}
                />
                <View style={{ alignSelf: "center" }}>
                  <Text style={ListOfPetScreenStyle.petNameLabel}>
                    {pet.petName}
                  </Text>
                  <Text style={ListOfPetScreenStyle.petTypeLabel}>
                    {pet.petType}
                  </Text>
                  <Text style={ListOfPetScreenStyle.petAgeLabel}>
                    {pet.age} Month
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
