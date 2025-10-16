import { StyleSheet } from "react-native";

const transactionDetailStyle = StyleSheet.create({
  container: {
    height: 700,
    padding: 20,
    
  },
  labelIDStyle:{
    fontSize:12,
    fontFamily: "Poppins",
    color: "#83520A",
  },  
  header: {
    fontFamily: "Poppins",
    color: "#83520A",
    fontSize: 20,
    fontWeight: "bold",
    marginTop:10,
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  itemText: {
    fontFamily: "Poppins",
    color: "#83520A",
    fontSize: 15,
  },
  itemPrice: {
    fontFamily: "Poppins",
    color: "#83520A",
    fontSize: 15,
  },
  divider: {
    fontFamily: "Poppins",
    color: "#83520A",
    fontSize: 15,
    marginTop: 2,
  },
  totalRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
  totalText: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#83520A",
    fontSize: 15,
  },
  totalAmount: {
    fontFamily: "Poppins",
    fontWeight: "bold",
    color: "#83520A",
    fontSize: 15,
  },
  textDesc: {
    fontFamily: "Poppins",
    color: "#83520A",
    fontSize: 15,
    marginTop: 7,
  },
  noItems: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: "#83520A",
    textAlign: "center",
    marginTop: 10,
  },
  buttonStatusPaymentSuscces:{
    backgroundColor: "green",
    width: "75%",
    height: 40,
    borderRadius: 10,
    marginTop: 20,
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    
  },
  completedContainer:{
    backgroundColor:'grey',
    borderRadius:10,
    height:50,
    marginTop:20,
    justifyContent:'center',
    alignItems:'center'
  },
  completedText:{
    fontFamily:'Poppins',
    fontSize:20,
    fontWeight:'bold',
    color:'white'
}
});

export default transactionDetailStyle;
