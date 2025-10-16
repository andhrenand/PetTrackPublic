import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from 'react-native';
import HomeScreen from "./pages/HomeScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from "./pages/ProfileScreen";
import PetTrackScreen from "./pages/PetTrackScreen";

const Tab = createBottomTabNavigator();

const RFIDIcon = require ('./assets/BottomNavBarIcon/RFIDLight.png');
const RFIDIconFocused = require ('./assets/BottomNavBarIcon/RFIDDark.png');
const HomeIcon = require('./assets/BottomNavBarIcon/HomeLight.png');
const HomeIconFocused = require ('./assets/BottomNavBarIcon/HomeDark.png');

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home Screen') {
                        iconName = focused ? HomeIconFocused : HomeIcon;
                        // Return Image icons for Home
                        return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
                    } else if (route.name === 'Profile Screen') {
                        // Use Ionicons for Profile
                        iconName = focused ? 'person' : 'person-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Pet Track') {
                        iconName = focused ? RFIDIconFocused : RFIDIcon;
                        // Return Image icons for RFID
                        return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
                    }
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Home Screen" component={HomeScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Pet Track" component={PetTrackScreen} options={{ headerShown: false }} />
            <Tab.Screen name="Profile Screen" component={ProfileScreen} options={{headerShown: false}} />
        </Tab.Navigator>
    );
}
