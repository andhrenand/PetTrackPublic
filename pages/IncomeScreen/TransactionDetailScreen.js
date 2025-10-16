import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert, TouchableOpacity, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import {
  doc,
  updateDoc,
  getDocs,
  query,
  collection,
  where,
} from "firebase/firestore";
import { firestoreDb } from "../../firebase"; // Ensure this path matches your Firebase config
import transactionDetailStyle from "../../styles/IncomeScreenStyle/TransactionDetailStyle";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function TransactionDetailScreen() {
  const route = useRoute();
  const { transaction } = route.params || {};
  const [pictReceipt, setPictReceipt] = useState(transaction?.receiptURL || null);
  const [transactionId, setTransactionId] = useState(transaction?.id || ""); 
  const [paymentStatus, setPaymentStatus] = useState(
    transaction?.paymentStatus || "Unpaid"
  ); // Store payment status
  const [isTransactionCompleted, setIsTransactionCompleted] = useState(
    paymentStatus === "Paid" || paymentStatus === "Transaction Completed"
  );

  useEffect(() => {
    const fetchTransactionId = async () => {
      if (!transaction?.id) {
        try {
          const q = query(
            collection(firestoreDb, "transactions"),
            where("timestamp", "==", transaction?.timestamp) // Match by timestamp or other unique fields.
          );
          const querySnapshot = await getDocs(q);
          if (!querySnapshot.empty) {
            const fetchedTransaction = querySnapshot.docs[0];
            setTransactionId(fetchedTransaction.id); // Get the ID from the document
            setPaymentStatus(
              fetchedTransaction.data().paymentStatus || "Unpaid"
            ); // Get the payment status from the fetched data
            setIsTransactionCompleted(
              fetchedTransaction.data().paymentStatus === "Paid"
            );
          } else {
            Alert.alert("Error", "Transaction not found.");
          }
        } catch (error) {
          console.error("Error fetching transaction:", error);
          Alert.alert("Error", "Failed to fetch transaction.");
        }
      } else {
        setTransactionId(transaction.id); // Set the ID directly if it's available
        setPaymentStatus(transaction.paymentStatus || "Unpaid"); // Set the paymentStatus if already available
        setIsTransactionCompleted(transaction.paymentStatus === "Paid");
      }
    };

    fetchTransactionId();
  }, [transaction]);

  const handleUploadReceipt = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsEditing: true,
      });

      if (
        !result ||
        result.canceled ||
        !result.assets ||
        result.assets.length === 0
      ) {
        return;
      }

      const imageUri = result.assets[0].uri;

      const fileInfo = await FileSystem.getInfoAsync(imageUri);
      const maxSize = 500 * 1024; // 500 KB

      if (fileInfo.size > maxSize) {
        Alert.alert(
          "Error",
          "Image size exceeds 500 KB. Please choose a smaller image."
        );
        return;
      }

      const storage = getStorage();
      const imageName = `receipts/${transactionId}_${Date.now()}.jpg`;
      const storageRef = ref(storage, imageName);

      const response = await fetch(imageUri);
      const blob = await response.blob();

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      const transactionRef = doc(firestoreDb, "transactions", transactionId);
      await updateDoc(transactionRef, { receiptURL: downloadURL });

      setPictReceipt(downloadURL);
      Alert.alert("Success", "Receipt uploaded successfully.");
    } catch (error) {
      console.error("Upload failed:", error);
      Alert.alert("Error", "Failed to upload receipt.");
    }
  };

  // Function to update payment status
  const updatePaymentStatus = async (status) => {
    try {
      if (!transactionId) {
        Alert.alert("Error", "Transaction ID is missing.");
        return;
      }

      const transactionRef = doc(firestoreDb, "transactions", transactionId);
      await updateDoc(transactionRef, { paymentStatus: status }); // Update payment status in Firestore

      setPaymentStatus(status); // Update local state to reflect new status
      setIsTransactionCompleted(status === "Paid"); // Set transaction as completed if "Paid"
      Alert.alert("Success", `Payment status updated to ${status}`);
    } catch (error) {
      console.error("Error updating payment status:", error);
      Alert.alert("Error", "Failed to update payment status.");
    }
  };

  // If no transaction data, display error
  if (!transaction) {
    return (
      <View style={transactionDetailStyle.container}>
        <Text style={transactionDetailStyle.errorText}>
          Transaction data not found.
        </Text>
      </View>
    );
  }

  return (
    <View style={transactionDetailStyle.container}>
      <Text style={transactionDetailStyle.labelIDStyle}>
        ID Transaction: {transaction.id}
      </Text>
      <Text style={transactionDetailStyle.labelIDStyle}>
        Customer Name: {transaction.customerName}
      </Text>
      <Text style={transactionDetailStyle.labelIDStyle}>
        Customer Phone Number: {transaction.customerPhoneNumber}
      </Text>

      <Text style={transactionDetailStyle.header}>Item List:</Text>
      <ScrollView style={{ maxHeight:170, borderWidth:0}}>
        {transaction.cart && transaction.cart.length > 0 ? (
          transaction.cart.map((item, index) => (
            <View key={index} style={transactionDetailStyle.itemRow}>
              <Text style={transactionDetailStyle.itemText}>
                - {item.productName} ({item.quantityToBuy || 0} x{" "}
                {item.price ? item.price.toLocaleString("id-ID") : "0"})
              </Text>
              <Text style={transactionDetailStyle.itemPrice}>
                Rp. {(item.quantityToBuy * item.price).toLocaleString("id-ID")}
              </Text>
            </View>
          ))
        ) : (
          <Text style={transactionDetailStyle.noItems}>No items available</Text>
        )}
      </ScrollView>
      <Text style={transactionDetailStyle.divider}>
        ------------------------------------------------ +
      </Text>
      <View style={transactionDetailStyle.totalRow}>
        <Text style={transactionDetailStyle.totalText}>Total Cost</Text>
        <Text style={transactionDetailStyle.totalAmount}>
          Rp.{" "}
          {transaction.totalCost
            ? transaction.totalCost.toLocaleString("id-ID")
            : "0"}
        </Text>
      </View>
      <Text style={transactionDetailStyle.textDesc}>
        Payment Method: {transaction.paymentMethod || "N/A"}
      </Text>
      <Text style={transactionDetailStyle.textDesc}>
        Payment Status: {paymentStatus}
      </Text>
     
          <TouchableOpacity
            onPress={handleUploadReceipt}
            style={{
              height: 40,
              width: 140,
              marginTop: 7,
              justifyContent: "center",
              borderRadius: 5,
              backgroundColor: "#b29d72",
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Upload Receipt
            </Text>
          </TouchableOpacity>
      
        <View style={{ alignItems: "center", marginTop: 10 }}>
          <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Receipt:</Text>
          {pictReceipt ? (
            <Image
              source={{ uri: pictReceipt }}
              style={{ width: 200, height: 200, borderRadius: 10 }}
              resizeMode="contain"
            />
          ) : (
            <Text style={{ color: "gray" }}>No receipt available</Text>
          )}
        </View>
      
      {isTransactionCompleted ? (
        <View style={transactionDetailStyle.completedContainer}>
          <Text style={transactionDetailStyle.completedText}>
            Transaction Completed
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={transactionDetailStyle.buttonStatusPaymentSuscces}
          onPress={() => updatePaymentStatus("Paid")}
          disabled={!transactionId} // Disable if transaction ID is not available
        >
          <Text
            style={{
              color: "white",
              fontFamily: "Poppins",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            PAID
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
