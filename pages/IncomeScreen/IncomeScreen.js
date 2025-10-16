import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  Platform,
} from "react-native";
import IncomeScreenStyle from "../../styles/IncomeScreenStyle/IncomeScreenStyle";
import { collection, getDocs } from "firebase/firestore";
import { firestoreDb } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import XLSX from "xlsx";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function IncomeScreen() {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const fetchTransactions = async () => {
    try {
      const transactionsCollectionRef = collection(firestoreDb, "transactions");
      const querySnapshot = await getDocs(transactionsCollectionRef);
      const transactionsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        items: [],
        ...doc.data(),
      }));
      const sortedTransactions = transactionsArray.sort(
        (a, b) => b.timestamp.seconds - a.timestamp.seconds
      );
      setTransactions(sortedTransactions);
    } catch (error) {
      console.error("Error fetching transactions: ", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
  if (selectedDate) {
    const filtered = transactions.filter((transaction) => {
      const tDate = new Date(transaction.timestamp.seconds * 1000);
      return (
        tDate.toDateString() === selectedDate.toDateString()
      );
    });
    setFilteredTransactions(filtered);

    const income = filtered.reduce((sum, transaction) => {
      return sum + (transaction.totalCost > 0 ? transaction.totalCost : 0);
    }, 0);
    setTotalIncome(income);
  } else {
    // Jika selectedDate null, tampilkan semua transaksi
    setFilteredTransactions(transactions);
    const income = transactions.reduce((sum, transaction) => {
      return sum + (transaction.totalCost > 0 ? transaction.totalCost : 0);
    }, 0);
    setTotalIncome(income);
  }
}, [selectedDate, transactions]);

  
  const onRefresh = async () => {
    setRefreshing(true);
    await fetchTransactions();
    setRefreshing(false);
  };

  const exportToExcel = async () => {
    try {
      const data = filteredTransactions.map((transaction) => ({
        ID: transaction.id,
        Date: new Date(transaction.timestamp.seconds * 1000).toLocaleString(),
        Products:
          transaction.cart?.map((item) => item.productName).join(", ") ||
          "No items",
        TotalCost: transaction.totalCost,
        PaymentMethod: transaction.paymentMethod,
        PaymentStatus: transaction.paymentStatus || "Unpaid",
        customerName: transaction.customerName,
        customerPhoneNumber: transaction.customerPhoneNumber,
        pictReceipt: transaction.pictReceipt,
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Income");

      const wbout = XLSX.write(wb, { type: "base64", bookType: "xlsx" });
      const uri = FileSystem.cacheDirectory + "IncomeReport.xlsx";

      await FileSystem.writeAsStringAsync(uri, wbout, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        alert("Sharing is not available on this device");
      }
    } catch (error) {
      console.error("Error exporting Excel: ", error);
    }
  };

  return (
    
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      <View style={{ borderWidth:1, borderColor:'white',borderRadius:7, backgroundColor:'rgba(195, 167, 113, 0.23)', padding:3, height:220}}>

        <TouchableOpacity
          style={{
            alignSelf: "flex-end",
            marginBottom: 10,
            padding: 10,
            borderRadius: 10,
          }}
          onPress={exportToExcel}
        >
          <Icon name="microsoft-excel" size={28} color="#217346" />
        </TouchableOpacity>
        <View style={{flexDirection:'row', alignSelf:'center'}}>

  <TouchableOpacity
    style={{
      height:37,
      width:'12%',
      alignSelf:'center',
      marginRight:5,
      justifyContent:'center',
      borderRadius:7,
      backgroundColor:'#83520A'
    }}
    onPress={() => setSelectedDate(null)} // Hapus filter
  >
    <Text style={{alignSelf:'center', fontFamily:"Poppins", color:'white', fontWeight:'bold'}}> All</Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={{
      height:37,
      width:'30%',
      alignSelf:'center',
      justifyContent:'center',
      borderRadius:7,
      backgroundColor:'#83520A'
    }}
    onPress={() => setShowDatePicker(prev => !prev)}
  >
    <Text style={{alignSelf:'center', fontFamily:"Poppins", color:'white', fontWeight:'bold'}}> Pick a Date</Text>
  </TouchableOpacity>

</View>

        <Text style={IncomeScreenStyle.monthlyCashFlowText}>
          Rp {totalIncome.toLocaleString("id-ID")},00
        </Text>
        <Text style={IncomeScreenStyle.cashFlowLabel}>Total Income</Text>
        <Text style={IncomeScreenStyle.cashFlowLabel}>{selectedDate
    ? selectedDate.toLocaleDateString("id-ID")
    : "All"}
</Text>
      </View>

        <Text style={IncomeScreenStyle.transactionHeader}>
          Transaction History
        </Text>
        <ScrollView
          style={{ height: 300, paddingBottom: 5 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {filteredTransactions.map((transaction) => (
            <TouchableOpacity
              key={transaction.id}
              style={IncomeScreenStyle.transactionContainer}
              onPress={() =>
                navigation.navigate("Detail Transaction", { transaction })
              }
            >
              <View style={{ flexDirection: "column", flex: 1 }}>
                <Text
                  style={IncomeScreenStyle.transactionProductName}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {transaction.cart?.length > 2
                    ? transaction.cart
                        .slice(0, 2)
                        .map((cart) => cart.productName)
                        .join(", ") + ", ..."
                    : transaction.cart
                        ?.map((cart) => cart.productName)
                        .join(", ") || "No items"}
                </Text>
                <Text style={IncomeScreenStyle.transactionDate}>
                  {new Date(
                    transaction.timestamp.seconds * 1000
                  ).toLocaleString()}
                </Text>
              </View>
              <View style={{ flexShrink: 1 }}>
                <Text
                  style={{
                    color: transaction.totalCost < 0 ? "red" : "green",
                    fontWeight: "bold",
                  }}
                >
                  {transaction.totalCost > 0
                    ? `+Rp ${transaction.totalCost.toLocaleString("id-ID")}`
                    : `-Rp ${Math.abs(transaction.totalCost).toLocaleString(
                        "id-ID"
                      )}`}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={(event, date) => {
            if (Platform.OS === "android") setShowDatePicker(false);
            if (event.type === "set" && date) {
              setSelectedDate(date);
            } else if (event.type === "dismissed") {
              setShowDatePicker(false);
            }
          }}
        />
      )}
    </View>
  );
}
