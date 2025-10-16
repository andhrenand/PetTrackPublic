import { StyleSheet } from "react-native";

const EditStockScreenStyle = StyleSheet.create({
    textProductName:{
        fontFamily: 'Poppins',
        fontWeight:'bold',
        fontSize: 25,
        marginTop: 20,
        marginLeft: 20,
        color: '#83520A',
        marginBottom:7,
    },
    textDetailOfProduct:{
        fontFamily: 'Poppins',
        fontSize: 16,
        marginTop: 5,
        marginLeft: 25,
        color: '#83520A',
    },
    textInputStyle: {
        marginTop: 5,
        marginBottom:7,
        marginLeft:0,
        height: 40,
        width: '87%',
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#8D6E63',
        borderRadius: 90,
        paddingHorizontal: 10,
        backgroundColor:'rgba(195, 167, 113, 0.15)',
      },
    EditButtonStyle:{
        height: 47,
        width: 182,
        backgroundColor: "#83520A",
        borderRadius: 90,
        marginTop: 40,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        alignSelf: "center",
        backgroundColor: "rgba(195, 167, 113, 0.15)",
        borderColor: "#ccc",
        borderWidth: 1,
        borderColor: "#8D6E63",
        borderRadius: 20,
        width: "77%",
        height: 40,
        marginTop: 5,
        marginBottom: 15,
      },
      dropdownContainer: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 20,
        width: "77%",
        alignSelf: "center"  
      },
})

export default EditStockScreenStyle;