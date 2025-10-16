import { StyleSheet } from "react-native";

const SignUpPageStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    TextHi: {
        marginTop: 147,
        marginLeft: 38,
        fontSize: 70,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: '#83520A'
    },
    TextDesc: {
        marginTop: 2,
        marginLeft: 38,
        fontSize: 20,
        fontWeight: '400',
        fontFamily: 'Poppins',
        color: '#83520A',
    },
    label: {
        marginTop: 20,
        color: '#83520A',
        fontSize: 12,
        marginLeft: 38,
        fontWeight: '600',
    },
    styleinput: {
        height: 40,
        backgroundColor: '#FEFAF6',
        width: '80%',
        borderColor: '#83520A',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 7,
        paddingLeft: 10,
        alignSelf: 'center',
        color: '#83520A',
    },
    stylebutton:{
        marginTop: 30, // Adjusted margin for better spacing
        alignItems: 'center', // Center the button
        justifyContent: 'center',
    },
    StyleSignUpButton:{
        backgroundColor: '#83520A',
        width: 187,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Inter',
        fontWeight: 'bold',
    },
});

export default SignUpPageStyle;