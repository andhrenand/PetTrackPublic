import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import EditStockScreenStyle from "../../styles/ProductScreenStyle/EditStockScreenStyle";
import { useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import { firestoreDb, storage } from "../../firebase";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { getStorage, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

export default function EditStockScreen({ route }) {
  const [isUploading, setIsUploading] = useState(false);
  const { product } = route.params;
  const navigation = useNavigation();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(product.category);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProductName, setEditedProductName] = useState(
    product.productName
  );
  const [editedAmount, setEditedAmount] = useState(
    String(product.productAmount)
  );
  const [editedPrice, setEditedPrice] = useState(String(product.price));
  const [image, setImage] = useState(product.image || null);

  const categories = [
    { label: "Choose Category", value: null },
    { label: "Food", value: "Food" },
    { label: "Snack & Treat", value: "Snack & Trea" },
    { label: "Accesories", value: "Accesories" },
    { label: "Health & Care", value: "Health & Care" },
    { label: "Daily Essentials", value: "Daily Essentials" },
    { label: "Other", value: "Other" },
  ];

  // Fungsi untuk memilih gambar dari galeri
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled) {
        Alert.alert("Upload dibatalkan");
        return;
      }

      // Set gambar yang dipilih ke state
      setImage(result.assets[0].uri);
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Gagal memilih gambar");
    }
  };

  const uploadImage = async () => {
    if (!image) return null;

    try {
      setIsUploading(true);
      const storage = getStorage();
      const fileName = `${product.id}_${Date.now()}.jpg`;
      const storageRef = ref(storage, `product_images/${fileName}`);

      const response = await fetch(image);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob);

      const downloadUrl = await getDownloadURL(storageRef);
      console.log("New Product Image URL:", downloadUrl);

      setIsUploading(false);
      return downloadUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsUploading(false);
      Alert.alert("Gagal mengupload gambar");
      return null;
    }
  };

  const updateProduct = async () => {
    try {
      setIsUploading(true);

      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage();
      }

      const updatedProductData = {
        productName: editedProductName,
        productAmount: parseInt(editedAmount, 10),
        price: parseInt(editedPrice, 10),
        category,
      };

      if (imageUrl) {
        updatedProductData.image = imageUrl;
      }

      const productRef = doc(firestoreDb, "products", product.id);
      await updateDoc(productRef, updatedProductData);

      Alert.alert("Success", "Product updated successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating product: ", error);
      Alert.alert("Error updating product: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const deleteProduct = async () => {
    Alert.alert(
      "Delete Product",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const productRef = doc(firestoreDb, "products", product.id);
              await deleteDoc(productRef);
              Alert.alert("Success", "Product deleted successfully!");
              navigation.goBack();
            } catch (error) {
              console.error("Error deleting product:", error);
              Alert.alert("Error", "Failed to delete product.");
            }
          },
        },
      ]
    );
  };

  const toggleEdit = () => {
    if (isEditing) {
      updateProduct();
    }
    setIsEditing(!isEditing);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: 20,
          backgroundColor: "white",
        }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableOpacity
          onPress={deleteProduct}
          style={{ alignSelf: "flex-end", right: 30, top: 20 }}
        >
          <Image
            style={{ width: 24, height: 24 }}
            source={require("../../assets/trashIcon.png")}
          />
        </TouchableOpacity>

        {/* Product Image */}
        <TouchableOpacity onPress={isEditing ? pickImage : null}>
          {image ? (
            <Image
              source={{ uri: image }}
              style={{
                height: 200,
                width: 200,
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 20,
                borderRadius: 20,
              }}
            />
          ) : (
            <View
              style={{
                height: 200,
                width: 200,
                backgroundColor: "#ddd",
                alignSelf: "center",
                marginTop: 20,
                marginBottom: 20,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
              }}
            >
              <Text style={{ color: "#555" }}>No Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 16,
            marginTop: 5,
            marginLeft: 45,
            color: "#83520A",
          }}
        >
          Category
        </Text>
        <DropDownPicker
          open={open}
          value={category}
          items={categories}
          setOpen={setOpen}
          setValue={setCategory}
          style={EditStockScreenStyle.dropdown}
          placeholder="Choose Category"
          placeholderStyle={{ color: "#83520A" }}
          dropDownContainerStyle={EditStockScreenStyle.dropdownContainer}
          disabled={!isEditing}
        />

        <ScrollView
          style={{ paddingHorizontal: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={EditStockScreenStyle.textDetailOfProduct}>
            Product Name
          </Text>
          <TextInput
            style={EditStockScreenStyle.textInputStyle}
            placeholder="Product Name"
            value={editedProductName}
            editable={isEditing}
            onChangeText={setEditedProductName}
          />

          <Text style={EditStockScreenStyle.textDetailOfProduct}>Amount</Text>
          <TextInput
            style={EditStockScreenStyle.textInputStyle}
            placeholder="Amount"
            value={editedAmount}
            editable={isEditing}
            onChangeText={setEditedAmount}
            keyboardType="numeric"
          />

          <Text style={EditStockScreenStyle.textDetailOfProduct}>Price</Text>
          <TextInput
            style={EditStockScreenStyle.textInputStyle}
            placeholder="Price"
            value={editedPrice}
            editable={isEditing}
            onChangeText={setEditedPrice}
            keyboardType="numeric"
          />
        </ScrollView>

        <TouchableOpacity
          style={EditStockScreenStyle.EditButtonStyle}
          onPress={toggleEdit}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 20, fontWeight: "bold" }}>
            {isEditing ? "SAVE" : "EDIT"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
