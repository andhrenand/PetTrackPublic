import { StyleSheet } from "react-native";

const WelcomePageStyle = StyleSheet.create({
    wholepage:{
        flex: 1,
        backgroundColor:'#FFFFFF'
    },
    WelcomeImage:{
        width: 413,
        height: 213,
        transform: [{rotateX: '180deg'}],
        alignSelf: 'center',
        marginTop: 0
    },
    container:{
        backgroundColor:'#C3A771',
        borderRadius: 65,
        height: 700,
        marginTop: 29,
        alignItems: 'center'
    },
    styleHello: {
        fontSize: 70,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        marginTop: 100,
    },
    stylelgs:{
        fontSize: 35,
        color: 'white',
        fontFamily: 'Poppins',
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: 20 
    },
    stylebutton: {
        marginTop: 40,
    },
    button: {
        backgroundColor: '#83520A',
        width: 187,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30, // Added borderRadius to round the corners
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Inter',
        fontWeight: 'bold',
    },
    button1: {
        marginTop:28,
        backgroundColor: '#FEFAF6',
        width: 187,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    buttonText1: {
        color: '#83520A',
        fontSize: 18,
        fontFamily: 'Inter',
        fontWeight: 'bold',
    },
})

export default WelcomePageStyle;