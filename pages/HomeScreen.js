import React from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"; // Responsiveness
import HomeScreenStyles from "../styles/HomeScreenStyle";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

// Pair the products into rows of two
const pairProducts = (products) => {
  const pairs = [];
  for (let i = 0; i < products.length; i += 2) {
    pairs.push(products.slice(i, i + 2));
  }
  return pairs;
};

export default function HomeScreen() {
  const navigation = useNavigation();

  // Define the product buttons with their associated data
  const products = [
    { label: "PET", image: require("../assets/MenuIcon/PetIcon.png"), screen: "List Of Pet" },
    { label: "Stocking", image: require("../assets/MenuIcon/StockIcon.png"), screen: "Stocking Screen" },
    { label: "Payment", image: require("../assets/MenuIcon/PaymentIcon.png"), screen: "Shopping Cart" },
    { label: "Income", image: require("../assets/MenuIcon/IncomeIcon.png"), screen: "Income Screen" },
  ];

  // Use the pairProducts function to create rows of two items
  const pairedProducts = pairProducts(products);

  return (
    <View style={HomeScreenStyles.wholepage}>
      <Image
        source={require("../assets/HeaderImage/CatInThePetShop.jpg")}
        style={{
          marginTop: hp("2%"),
          alignSelf: "center",
          width: wp("90%"),
          height: hp("20%"),
          borderRadius: wp("5%"),
        }}
      />

      <View style={HomeScreenStyles.MenuContainer}>
        <Text style={HomeScreenStyles.TextService}>SERVICE</Text>

        {pairedProducts.map((pair, index) => (
          <View key={index} style={HomeScreenStyles.rowContainer}>
            {pair.map((product, idx) => (
              <TouchableOpacity
                key={idx}
                style={HomeScreenStyles.ContainerButtonService}
                onPress={() => navigation.navigate(product.screen)}
              >
                <Image source={product.image} style={{ width: wp("20%"), height: hp("10%") }} />
                <Text style={HomeScreenStyles.textPet}>{product.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}
