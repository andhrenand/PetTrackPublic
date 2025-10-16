import { StyleSheet } from "react-native";

const AddMedicalRecordStyle = StyleSheet.create({
    TextMedicalRecord:{
        fontSize: 20, 
        color: '#83520A',
        fontWeight: 'bold',
        alignSelf: 'center' 
    },
    TextLabelStyle:{
        marginTop: 30, 
        marginBottom:5,
        fontFamily: 'Poppins',
        color: '#83520A', 
        fontWeight: '600', 
        fontSize: 14, marginLeft:30
    },
    TextInputStyle:{
        alignSelf:'center',
        width: '90%', 
        height: 43,
        borderWidth: 1, 
        borderRadius: 20, 
        marginBottom:-20, 
        padding: 10,
        backgroundColor: 'rgba(195, 167, 113, 0.15)',
        borderColor:'#83520A'
    },
    AddButtonStyle:{
        marginTop: 20, 
        alignSelf: 'center', 
        alignItems: 'center', 
        backgroundColor: '#83520A', 
        paddingVertical: 10, 
        paddingHorizontal: 30, 
        borderRadius: 30
    },

})
export default AddMedicalRecordStyle;