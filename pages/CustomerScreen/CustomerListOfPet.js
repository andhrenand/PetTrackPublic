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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { firestoreDb, realtimeDb } from "../../firebase"; // Import Firestore and Realtime Database
import { doc, getDoc } from "firebase/firestore"; // Import Firestore functions
import { ref, onValue } from "firebase/database"; // Import Realtime Database functions
import CustomerListOfPetStyle from "../../styles/CustomerScreenStyle/CustomerListOfPetStyle";

export default function CustomerListOfPet() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState([]); // Semua data hewan
  const [filteredPets, setFilteredPets] = useState([]); // Filtered pets data
  const [searchQuery, setSearchQuery] = useState(""); // Search query
  const [refreshing, setRefreshing] = useState(false); // Pull-to-refresh state
  const [userUsername, setUserUsername] = useState(""); // Store the username of the logged-in user

  // Fetch the pet list by the logged-in user's username
  const showPetListByUsername = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.log("User is not logged in");
      setLoading(false);
      return;
    }

    try {
      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(firestoreDb, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log("User data:", userData); // Debugging: Check user data
        const username = userData.username; // Retrieve the username
        setUserUsername(username); // Store the username
      } else {
        console.log("No user data found");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false);
    }
  };

  

  useEffect(() => {
    if (userUsername) {
      setLoading(true);
      const petsRef = ref(realtimeDb, "pets/");
      onValue(petsRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          
          
          const petsArray = Object.keys(data).map((key) => ({
            id: key,  // Masukkan key sebagai id
            ...data[key],
          }));
      
          const customerPets = petsArray.filter(
            (pet) => pet.customerUsername === userUsername
          );
      
      
          setPets(customerPets);
          setFilteredPets(customerPets);
        } else {
          console.log("No pets found in database");
          setPets([]);
          setFilteredPets([]);
        }
        setLoading(false);
      });
    }
  }, [userUsername]);

  // Handle search functionality
  const handleSearch = (text) => {
    setSearchQuery(text);
    

    if (text.trim() === "") {
      setFilteredPets(pets); // Reset filtered pets
      return;
    }

    // Ensure petName exists before filtering
    const filteredByName = pets.filter((pet) =>
      pet.petName?.toLowerCase().includes(text.toLowerCase())
    );

    
    setFilteredPets(filteredByName);
  };

  // Handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  // Call showPetListByUsername when the component is mounted
  useEffect(() => {
    showPetListByUsername();
  }, []);

  return (
    <View style={CustomerListOfPetStyle.wholepage}>
      <View
        style={{
          marginTop: 20,
          height: 630,
          width: 360,
          backgroundColor: "rgba(195, 167, 113, 0.3)",
          alignItems: "center",
          borderRadius: 20,
          alignSelf: "center",
        }}
      >
        <View flexDirection="row">
          <View style={CustomerListOfPetStyle.searchContainer}>
            <Image
              source={require("../../assets/searchIcon.png")}
              style={CustomerListOfPetStyle.searchIcon}
            />
            <TextInput
              style={{
                marginLeft: 10,
                fontFamily: "Poppins",
                fontSize: 16,
                width: "100%",
              }}
              placeholder="Search by pet's name "
              value={searchQuery}
              onChangeText={handleSearch}
              placeholderTextColor="#838383"
            />
            
          </View>
        </View>
        <ScrollView
          style={{ width: 370, marginTop: 10 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredPets.map((pet) => (
            <TouchableOpacity
              key={pet.id || pet.petName} // Use petName as fallback if id is missing
              style={CustomerListOfPetStyle.StyleOfList}
              onPress={() => {
                if (!pet || !pet.id) {
                  console.error("Error: Pet data is missing or undefined!", pet);
                  return;
                }
                console.log("Navigating with pet data:", pet.id);
                navigation.navigate("Customer Pet Overview Screen", { pet });
              }}
            >
              <View flexDirection="row">
                <Image
                  source={{ uri: pet.petImage }}
                  style={CustomerListOfPetStyle.petImage}
                />
                <View style={{ alignSelf: "center" }}>
                  <Text style={CustomerListOfPetStyle.petNameLabel}>
                    {pet.petName}
                  </Text>
                  <Text style={CustomerListOfPetStyle.petTypeLabel}>
                    {pet.petType}
                  </Text>
                  <Text style={CustomerListOfPetStyle.petAgeLabel}>
                    {pet.age} Tahun
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
