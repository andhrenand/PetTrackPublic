import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  TextInput,
} from "react-native";
import PaymentScreenStyle from "../../styles/PaymentScreenStyle/PaymentScreenStyle";
import { printToFileAsync } from "expo-print";
import { shareAsync } from "expo-sharing";
import { doc, updateDoc, addDoc, collection } from "firebase/firestore";
import { firestoreDb } from "../../firebase";
import { Asset } from "expo-asset";
import { useNavigation } from "@react-navigation/native";

// Fungsi untuk memformat angka ke format Rupiah
const formatCurrency = (number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  })
    .format(number)
    .replace("Rp", "Rp"); // Menambahkan titik setelah Rp
};

export default function PaymentScreen({ route }) {
  const { cart } = route.params;
  const [customerName, setCustomerName] = useState("");
  const [customerPhoneNumber, setCustomerPhoneNumber] = useState("");
  const navigation = useNavigation();

  const [paymentMethod, setPaymentMethod] = useState("");

  const calculateTotalCost = () => {
    return cart.reduce(
      (total, product) => total + (product.quantityToBuy || 0) * product.price,
      0
    );
  };
  
  const [transactionId, setTransactionId] = useState(null);

  const totalCost = calculateTotalCost();
  const qrCodeImage = Asset.fromModule(require("../../assets/QRpict.jpeg")).uri;

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Receipt</title>
        <style>
            body {
                font-family: 'Courier New', Courier, monospace;
                background-color: #f7f7f7;
                color: #333;
                padding: 20px;
            }
            .receipt {
                background-color: white;
                padding: 20px;
                border: 1px dashed #ccc;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .receipt h1 {
                text-align: center;
                margin-bottom: 20px;
            }
            .receipt table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
            }
            .receipt table th,
            .receipt table td {
                padding: 8px;
                text-align: left;
                border-bottom: 1px dashed #ccc;
            }
            .receipt .total {
                font-weight: bold;
                font-size: 16px;
                margin-top: 10px;
            }
                .qr-code img {
                width: 150px;  /* Resizing the image */
                height: auto;  /* Maintain aspect ratio */
            }
            .payment-method {
                margin-top: 20px;
                font-size: 14px;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div class="receipt">
            <h1>Bill Details</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Qty</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${cart
                      .map(
                        (product) => `
                          <tr>
                              <td>${product.productName}</td>
                              <td>${product.quantityToBuy}</td>
                              <td>${formatCurrency(product.price)}</td>
                              <td>${formatCurrency(
                                product.quantityToBuy * product.price
                              )}</td>
                          </tr>
                        `
                      )
                      .join("")}
                </tbody>
            </table>
            <div class="total">Grand Total: ${formatCurrency(totalCost)}</div>
            <div class="payment-method">Payment Method: ${paymentMethod}</div>
            <div class="account-number">
                <p>Bank ABC</p>
                <p>No. Rek: 1234567890</p>
                <p>Atas Nama: James</p>
            </div>
            <div class="qr-code picture">
               <img class="gbr-qr" src="${qrCodeImage}" alt="QR Code" />
            <p>Thank you for shopping with us!</p>
        </div>
    </body>
    </html>
  `;

  const updateProductStock = async (productId, newStock) => {
    try {
      const productRef = doc(firestoreDb, "products", productId);
      await updateDoc(productRef, {
        productAmount: newStock,
      });
      console.log(`Stock updated for product ${productId}`);
    } catch (error) {
      console.error("Error updating product stock:", error);
      Alert.alert("Error", `Failed to update stock for product ${productId}.`);
    }
  };

 const saveTransaction = async () => {
  try {
    const docRef = await addDoc(collection(firestoreDb, "transactions"), {
      cart,
      totalCost,
      paymentMethod,
      timestamp: new Date(),
      customerName,
      customerPhoneNumber,
    });
    console.log("Transaction saved successfully with ID:", docRef.id);
    return docRef.id; 
  } catch (error) {
    console.error("Error saving transaction:", error);
    Alert.alert("Error", "Failed to save the transaction.");
    return null;
  }
};


  const generatePDF = async () => {
  try {
    if (!paymentMethod) {
      Alert.alert("Error", "Please select a payment method.");
      return;
    }

    for (const product of cart) {
      if (product.quantityToBuy > 0) {
        const newStock = (product.productAmount || 0) - product.quantityToBuy;
        if (newStock >= 0) {
          await updateProductStock(product.id, newStock);
        } else {
          Alert.alert(
            "Error",
            `Insufficient stock for ${product.productName}.`
          );
          return;
        }
      }
    }

    const newTransactionId = await saveTransaction();
    if (!newTransactionId) return;
    setTransactionId(newTransactionId); // Store in state

    const htmlWithTransactionId = html.replace(
      "<h1>Bill Details</h1>",
      `<h1>Bill Details</h1><p><strong>Transaction ID:</strong> ${newTransactionId}</p>`
    );

    const file = await printToFileAsync({
      html: htmlWithTransactionId,
      base64: false,
    });

    await shareAsync(file.uri);

    Alert.alert(
      "Success",
      "Bill generated and transaction saved successfully!"
    );
  } catch (error) {
    console.error("Error generating PDF:", error);
    Alert.alert("Error", "Failed to generate the bill.");
  }
};


  return (
    <View style={{ padding: 20, flex: 1, backgroundColor: "#FFFFFF" }}>
      <Text style={PaymentScreenStyle.textBill}>Bills</Text>
      <View
        style={{ height: 300, marginBottom: 20, backgroundColor: "#FFFFFF" }}
      >
        <ScrollView style={PaymentScreenStyle.containerListProduct}>
          {cart.map((product) => (
            <View key={product.id} style={PaymentScreenStyle.containerProduct}>
              <Image
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 10,
                  marginRight: 8,
                  alignSelf:'center',
                }}
                source={{ uri: product.image }}
              />
              <View>
                <Text style={PaymentScreenStyle.productNameStyle}>
                  {product.productName}
                </Text>
                <Text style={PaymentScreenStyle.productPriceStyle}>
                  Price: {formatCurrency(product.price)}
                </Text>
                <Text style={PaymentScreenStyle.productPriceStyle}>
                  Amount: {product.quantityToBuy}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

        <TextInput
          style={{height:35, borderWidth:1, padding:10, backgroundColor:'', borderRadius:7, borderColor:'#83520A',marginBottom:7}}
          placeholder="Name"
          value={customerName}
          onChangeText={setCustomerName}
        />
        <TextInput
          style={{height:35, borderWidth:1, padding:10, backgroundColor:'', borderRadius:7, borderColor:'#83520A'}}
          placeholder="Phone Number"
          value={customerPhoneNumber}
          onChangeText={setCustomerPhoneNumber}
        />
      <View style={{ flexDirection: "row", marginTop: 7 }}>
        <Text
          style={{
            fontFamily: "Poppins",
            fontSize: 14,
            fontWeight: "bold",
            color: "#83520A",
          }}
        >
          Total: {formatCurrency(totalCost)}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: "Poppins",
          color: "#83520A",
          fontWeight: "bold",
          fontSize: 17,
        }}
      >
        Select Payment Method:
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "center",
          alignContent: "space-between",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => setPaymentMethod("Cash")}
          style={[
            PaymentScreenStyle.containerPaymentMethod,
            paymentMethod === "Cash" && {
              backgroundColor: "rgba(195, 167, 113, 0.15)",
            },
          ]}
        >
          <Image
            style={{ alignSelf: "center", height: 37, width: 54 }}
            source={require("../../assets/cashIcon.png")}
          />
          <Text style={PaymentScreenStyle.textPaymentMethod}>Cash</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPaymentMethod("Debit Card")}
          style={[
            PaymentScreenStyle.containerPaymentMethod,
            paymentMethod === "Debit Card" && {
              backgroundColor: "rgba(195, 167, 113, 0.15)",
            },
          ]}
        >
          <Image
            style={{ alignSelf: "center", height: 37, width: 37 }}
            source={require("../../assets/cardIcon.png")}
          />
          <Text style={PaymentScreenStyle.textPaymentMethod}>Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setPaymentMethod("QRIS")}
          style={[
            PaymentScreenStyle.containerPaymentMethod,
            paymentMethod === "QRIS" && {
              backgroundColor: "rgba(195, 167, 113, 0.15)",
            },
          ]}
        >
          <Image
            style={{ alignSelf: "center", height: 37, width: 37 }}
            source={require("../../assets/scanIcon.png")}
          />
          <Text style={PaymentScreenStyle.textPaymentMethod}>QRIS</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={PaymentScreenStyle.buttonPrintBill}
        onPress={generatePDF}
      >
        <Text
          style={{
            fontFamily: "Poppins",
            color: "white",
            alignSelf: "center",
            fontWeight: "bold",
            fontSize: 23,
          }}
        >
          Print Bill
        </Text>
      </TouchableOpacity>
    </View>
  );
}
