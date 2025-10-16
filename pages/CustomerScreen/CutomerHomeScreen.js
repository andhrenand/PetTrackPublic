import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import CustomerHomeScreenStyle from "../../styles/CustomerScreenStyle/CustomerHomeScreenStyle";

export default function CustomerHomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const customerUsername = route?.params?.customerUsername || "";

  return (
    <View>
      <Image
        source={require("../../assets/HeaderImage/gambarpetshop.png")}
        style={CustomerHomeScreenStyle.headerImage}
      />
      <View style={CustomerHomeScreenStyle.homeContainer}>
        <Text style={CustomerHomeScreenStyle.descAppText}>
          Welcome to Pet Track
        </Text>
        <Text style={CustomerHomeScreenStyle.descAppText}>
          Your best digital companion for your pets! Effortlessly monitor their
          health, activity, and happiness anytime, anywhere. Pet Track takes pet
          care to the next level with advanced features that make every moment
          spent together more meaningful!
        </Text>
        <TouchableOpacity
          style={CustomerHomeScreenStyle.buttoncheckpet}
          onPress={() => navigation.navigate("Customer List Of Pet")}
        >
          <Text style={CustomerHomeScreenStyle.descbutton}>
            Check Your Pet!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
