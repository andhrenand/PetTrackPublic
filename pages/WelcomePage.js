import React from "react";
import { useNavigation } from "@react-navigation/native";
import { View, Image, Text, TouchableOpacity } from "react-native";
import WelcomePageStyle from "../styles/WelcomePageStyle";

export default function WelcomePage(){
    const navigation = useNavigation();
    return(
        <View style={WelcomePageStyle.wholepage}>
            <Image source={require('../assets/PawWelcome.png')} style ={WelcomePageStyle.WelcomeImage}/>
            <View style={WelcomePageStyle.container}>
                <Text style={WelcomePageStyle.styleHello}>Hello!</Text>
                <Text style={WelcomePageStyle.stylelgs}>Let's Get Started</Text>
                <View style={WelcomePageStyle.stylebutton}>
                    <TouchableOpacity style={WelcomePageStyle.button} onPress={() => navigation.navigate('Sign Up')}>
                        <Text style={WelcomePageStyle.buttonText}>SIGN UP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={WelcomePageStyle.button1} onPress={() => navigation.navigate('Sign In')}>
                        <Text style={WelcomePageStyle.buttonText1}>SIGN IN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}