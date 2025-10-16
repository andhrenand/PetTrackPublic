import { StyleSheet, Dimensions, Platform } from "react-native";

const { width, height } = Dimensions.get("window");

const SignInPageStyle = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        padding: width * 0.05,
    },
    TextHi: {
        marginTop: height * 0.2,
        marginLeft: width * 0.1,
        fontSize: width * 0.12,
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        color: '#83520A'
    },
    TextDesc: {
        marginTop: height * 0.02,
        marginLeft: width * 0.1,
        fontSize: width * 0.05,
        fontWeight: '400',
        fontFamily: 'Poppins',
        color: '#83520A'
    },
    Label: {
        marginTop: height * 0.02,
        color: '#83520A',
        fontSize: width * 0.03,
        marginLeft: width * 0.1,
        fontWeight: '600',
    },
    StyleInput: {
        height: height * 0.05,
        width: '80%',
        backgroundColor: '#FEFAF6',
        borderColor: '#83520A',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: height * 0.01,
        paddingLeft: width * 0.03,
        alignSelf: 'center',
        color: '#83520A',
    },
    StyleButton: {
        marginTop: height * 0.03,
        alignItems: 'center',
        justifyContent: 'center'
    },
    StyleSignInButton: {
        backgroundColor: '#83520A',
        width: width * 0.43,
        height: height * 0.06,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: width * 0.045,
        fontFamily: 'Inter',
        fontWeight: 'bold',
    },
    forgotPassword: {
        marginTop: height * 0.03,
        color: '#83520A',
        fontSize: width * 0.03,
        alignSelf:'center',
        fontWeight: '600',
    },
});

export default SignInPageStyle;