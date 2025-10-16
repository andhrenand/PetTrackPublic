import { StyleSheet } from "react-native";

const IncomeScreenStyle = StyleSheet.create({
  firstContainer: {
    paddingTop: 100,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  datepickerstyle: {
    width: 150,
    height: 35,
    borderBlockColor: "white",
    backgroundColor: "#83520A",
    borderWidth: 0,
    borderRadius: 20,
    marginTop: 5,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  monthlyCashFlowText: {
    marginTop: 30,
    alignSelf: "center",
    fontSize: 35,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#83520A",
  },
  cashFlowLabel: {
    marginTop: 5,
    alignSelf: "center",
    fontSize: 10,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#83520A",
  },
  balanceSummaryContainer: {
    width: 362,
    height: 70,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "rgba(195, 167, 113, 0.6)",
    borderRadius: 10,
    backgroundColor: "#FFF8E7",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  balanceItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    alignSelf: "center",
    marginRight: 5,
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  amountText: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#83520A",
  },
  labelText: {
    fontSize: 12,
    fontFamily: "Poppins",
    color: "rgba(195, 167, 113, 0.8)",
  },
  divider: {
    height: 40,
    width: 1,
    backgroundColor: "rgba(195, 167, 113, 0.4)",
  },
  transactionHeader: {
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#83520A",
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
  transactionContainer: {
    width: 350,
    minHeight: 49, // Gunakan minHeight agar bisa menyesuaikan
    marginBottom: 20,
    alignSelf: "center",
    borderColor: "rgba(195, 167, 113, 0.6)",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center", // Menyesuaikan dengan isi
  },
  transactionProductName: {
    fontSize: 14,
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#83520A",
  },
  transactionDate: {
    fontSize: 12,
    fontFamily: "Poppins",
    color: "rgba(195, 167, 113, 0.7)",
  },
  transactionPrice: {
    fontSize: 14,
    alignSelf: "center",
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "green",
  },
  inputIOS: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 10,
  },
  inputIOSContainer: {
    zIndex: 9999, // sangat penting untuk iOS
  },
  inputAndroid: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
  },
});

export default IncomeScreenStyle;
