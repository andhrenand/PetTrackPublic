import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from "./pages/ProfileScreen";
import CustomerHomeScreen from "./pages/CustomerScreen/CutomerHomeScreen";
import ShoppingCartScreen from "./pages/PaymentScreen/ShoppingCartScreen";

const Tab = createBottomTabNavigator();

const HomeIcon = require('./assets/BottomNavBarIcon/HomeLight.png');
const HomeIconFocused = require ('./assets/BottomNavBarIcon/HomeDark.png');

export default function SecondBottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Customer Home Screen') {
                        iconName = focused ? HomeIconFocused : HomeIcon;
                        
                        return <Image source={iconName} style={{ width: size, height: size, tintColor: color }} />;
                    } else if (route.name === 'Shop') {
                        iconName = focused ? 'cart' : 'cart-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Profile Screen') {
                        iconName = focused ? 'person' : 'person-outline';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Customer Home Screen" component={CustomerHomeScreen} options={{ headerShown: false , title: "Home Screen"}} />
            <Tab.Screen name="Shop" component={ShoppingCartScreen} options={{headerShown: false, title: "Shopping"}} />
            <Tab.Screen name="Profile Screen" component={ProfileScreen} options={{headerShown: false}} />
        </Tab.Navigator>
    );
}
