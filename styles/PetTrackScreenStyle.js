import { StyleSheet } from "react-native";
import PetTrackScreen from "../pages/PetTrackScreen";

const PetTrackScreenStyle = StyleSheet.create({
    wholepage:{
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    TittleCustomer:{
        fontFamily:"Poppins",
        fontSize:25,
        fontWeight:'bold',
        color:'#83520A',
        alignSelf:'center',
        marginTop:20
    },
    containercustomer:{
        height:117,
        width:342,
        backgroundColor: 'rgba(195, 167, 113, 0.15)',
        alignSelf:'center',
        marginTop: 15,
        borderRadius: 20,
        borderColor: '#83520A',
        borderWidth: 2,  
    },
    IconCustomer:{
        marginLeft: 20,
        marginTop: 13,
    },
    TittlePet:{
        fontFamily:"Poppins",
        fontSize:25,
        fontWeight:'bold',
        color:'#83520A',
        alignSelf:'center',
        marginTop:21,
    },
    titleTextInput:{
        marginTop: 10,
        fontFamily: 'Poppins',
        color: '#83520A',
        fontWeight:'600',
        fontSize:14,
        marginLeft: 30,
    },
    TextInputStyle:{
        height: 40,
        width: '87%',
        marginTop: 3,
        marginBottom: 3,
        alignSelf: 'center',
        backgroundColor: 'rgba(195, 167, 113, 0.15)',
        borderRadius: 20,
        paddingLeft: 10,
        borderWidth: 1,
        borderColor: '#83520A',
        justifyContent:'center',
        alignItems:'center',
        verticalAlign:'center',
    },
    UploadButtonStyle: {
        height: 34,
        width: 110,
        backgroundColor: "rgba(195, 167, 113, 0.15)",
        left:'30',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        borderWidth:1,
        borderColor:'#83520A'
    },
    TextUploadStyle: {
        color: '#83520A',
        fontSize: 13,
        fontWeight: '600',
        justifyContent:'center'
    },
    imagePreview: {
        width: 200,
        height: 200,
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
    },

    AddButtonStyle:{
        height: 47,
        width: 182,
        backgroundColor: "#83520A",
        alignSelf:'center',
        borderRadius: 20,
        justifyContent:'center',
        alignItems:'center',
        marginTop: 20,
    },
    TextAddStyle:{
        fontWeight: 'bold',
        fontFamily: "Poppins",
        color: '#FFFFFF',
        fontSize: 25,
    }
})

export default PetTrackScreenStyle;
