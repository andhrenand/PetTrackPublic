import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  ScrollView,
  Platform,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AddStockScreenStyle from "../../styles/ProductScreenStyle/AddStockScreenStyle";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { firestoreDb } from "../../firebase"; 
import DropDownPicker from "react-native-dropdown-picker"; 

export default function AddStockScreen() {
  const [productName, setProductName] = useState("");
  const [productAmount, setProductAmount] = useState("");
  const [category, setCategory] = useState(null);
  const [open, setOpen] = useState(false); // Controls dropdown visibility
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const categories = [
    { label: "Choose Category", value: null },
    { label: "Food", value: "Food" },
    { label: "Snack & Treat", value: "Snack & Trea" },
    { label: "Accesories", value: "Accesories" },
    { label: "Health & Care", value: "Health & Care" },
    { label: "Daily Essentials", value: "Daily Essentials" },
    { label: "Other", value: "Other" },

  ];

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

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
      setImage(result.assets[0].uri);
    }
  };

  const inputProduct = async () => {
    try {
      let imageUrl = null;
  
      if (image) {
        const storage = getStorage(); // get Firebase Storage instance
        const response = await fetch(image);
        const blob = await response.blob();
        const filename = `product_images/${Date.now()}_${Math.floor(Math.random() * 10000)}.jpg`;
        const storageRef = ref(storage, filename);
        await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(storageRef);
      }
  
      const productRef = collection(firestoreDb, "products");

      await addDoc(productRef, {
        productName,
        productAmount,
        category,
        price,
        image: imageUrl,
      });
  
      alert("Data successfully added!");
      setProductName("");
      setProductAmount("");
      setCategory(null);
      setPrice("");
      setImage(null);
    } catch (error) {
      console.error("Error uploading data: ", error);
      alert("Failed to upload. Try again.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={AddStockScreenStyle.wholepage}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View  contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
        <View style={{marginTop: 20}}>
          <Text style={AddStockScreenStyle.textLabel}>Product Name</Text>
          <TextInput
            style={AddStockScreenStyle.textInputStyle}
            value={productName}
            onChangeText={setProductName}
            placeholder="Nama Product"
          />
          <Text style={AddStockScreenStyle.textLabel}>Amount Product</Text>
          <TextInput
            style={AddStockScreenStyle.textInputStyle}
            value={productAmount}
            onChangeText={setProductAmount}
            placeholder="Jumlah Product"
            keyboardType="numeric"
          />

          <Text style={AddStockScreenStyle.textLabel}>Categories</Text>
          <DropDownPicker
            open={open}
            value={category}
            items={categories}
            setOpen={setOpen}
            setValue={setCategory}
            style={AddStockScreenStyle.dropdown}
            placeholder="Choose Category"
            placeholderStyle={{ color: "#83520A" }}
            dropDownContainerStyle={AddStockScreenStyle.dropdownContainer}
            />
          <Text style={AddStockScreenStyle.textLabel}>Price</Text>
          <TextInput
            style={AddStockScreenStyle.textInputStyle}
            value={price}
            onChangeText={setPrice}
            placeholder="Harga"
            keyboardType="numeric"
            />
          <Text style={AddStockScreenStyle.textLabel}>Upload Product Image</Text>
          <TouchableOpacity
            style={AddStockScreenStyle.buttonStyle}
            onPress={pickImage}
            >
            <Text style={AddStockScreenStyle.buttonText}>
              Choose Image
            </Text>
          </TouchableOpacity>
            {image && (
              <View style={AddStockScreenStyle.imageContainer}>
                <Image
                  source={{ uri: image }}
                  style={AddStockScreenStyle.imageStyle}
                />
              </View>
            )}
          <TouchableOpacity
            style={AddStockScreenStyle.AddButtonStyle}
            onPress={inputProduct}
          >
            <Text style={AddStockScreenStyle.TextAddStyle}> ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}