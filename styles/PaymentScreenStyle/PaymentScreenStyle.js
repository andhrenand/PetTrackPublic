import { StyleSheet } from "react-native";

const PaymentScreenStyle = StyleSheet.create({
    textBill:{
        fontFamily: 'Poppins',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#83520A',
        marginLeft:5,
        marginBottom: 5,
    },
    containerListProduct:{
        maxHeighteight:299,
        width:390,
        alignSelf: 'center',
        paddingBottom: 20,
    },
    containerProduct:{
        padding:5,
        flexDirection: 'row',
        height:70,
        width:'90%',
        alignSelf: 'center',
        borderColor:'#83520A',
        borderRadius:10,
        marginTop:10,
        marginBottom: 5,
        backgroundColor: 'white',
        shadowColor: "#000", // Shadow color
        shadowOffset: { width: 0, height: 3 }, // Slightly adjusted for realistic shadow
        shadowOpacity: 0.2, // Softer shadow appearance
        shadowRadius: 6, // Smooth spread
        elevation: 6,
    },
    productNameStyle:{
        justifyContent:'center',
        marginTop:1,
        fontFamily: 'Poppins',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#83520A',
        marginBottom: 3,
      },
      productPriceStyle:{
        fontFamily: 'Poppins',
        fontSize: 12,
        fontWeight: 'bold',
        color: '#83520A',
        marginBottom:2,
      },
    containerPaymentMethod:{
        height:75,
        width:103,
        borderRadius:10,
        color:'#rgba(195, 168, 113, 0.95)',
        borderWidth:1,
        borderColor:'#83520A',
        alignSelf:'center',
        justifyContent:'center',
        margin: 10,
    },
    textPaymentMethod:{
        alignSelf:'center',
        fontSize: 12,
        color:'#83520A',
        fontFamily:'Poppins',
        marginTop:5
    },
    buttonPrintBill:{
        height: 50,
        width: 200,
        backgroundColor: '#83520A',
        borderRadius: 90,
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    textInputNameNumber:{
        height: 40,
        width: 354,
        borderColor:'#83520A',
        marginBottom: 10,
        borderRadius: 10,
        borderWidth:1,
        padding:10
    }
})

export default PaymentScreenStyle;