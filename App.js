import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomePage from "./pages/WelcomePage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ListOfPetScreen from "./pages/PetScreen/ListOfPetScreen";
import BottomTabNavigator from "./BottomNavBar";
import ProfileScreen from "./pages/ProfileScreen";
import PetOverviewScreen from "./pages/PetScreen/PetOverviewScreen";
import AddMedicalRecordScreen from "./pages/PetScreen/AddMedicalRecordScreen";
import AddStockScreen from "./pages/ProductScreen/AddStockScreen";
import StockingScreen from "./pages/ProductScreen/StockingScreen";
import ShoppingCartScreen from "./pages/PaymentScreen/ShoppingCartScreen";
import PaymentScreen from "./pages/PaymentScreen/PaymentScreen";
import IncomeScreen from "./pages/IncomeScreen/IncomeScreen";
import EditStockScreen from "./pages/ProductScreen/EditStockScreen";
import PetTrackScreen from "./pages/PetTrackScreen";
import SecondBottomTabNavigator from "./BottomNavBarCustomer";
import CustomerListOfPet from "./pages/CustomerScreen/CustomerListOfPet";
import CustomerPetOverviewScreen from "./pages/CustomerScreen/CustomerPetOverviewScreen";
import TransactionDetailScreen from "./pages/IncomeScreen/TransactionDetailScreen";

const Stack = createNativeStackNavigator();

function App(){
  
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Welcome Page" component={WelcomePage} options={{headerShown:false}} />
        <Stack.Screen name="Sign In" component={SignInPage} options={{headerShown:false}} />
        <Stack.Screen name="Sign Up" component={SignUpPage} options={{headerShown:false}} />
        <Stack.Screen name="Customer HomeScreen" component={SecondBottomTabNavigator} options={{headerShown:true,
          headerStyle:{
            backgroundColor: '#rgba(178, 157, 114, 0.94)',  
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle:{
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF'              
          },
          title: 'PetTrack',
          headerBackVisible: false,
        }} />
        <Stack.Screen name="Customer Pet Overview Screen" component={CustomerPetOverviewScreen} options={{headerShown:true,
          headerStyle:{
            backgroundColor: '#rgba(178, 157, 114, 0.94)',  
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle:{
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF'              
          },
          title: 'Pet Overview',
          headerBackVisible: true,
        }} />
        <Stack.Screen name="Customer List Of Pet" component={CustomerListOfPet} options={{headerShown:true,
          headerStyle:{
            backgroundColor: '#rgba(178, 157, 114, 0.94)',  
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle:{
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF'              
          },
          title: 'List Of Pet',
          headerBackVisible: true,
        }} />
        <Stack.Screen name="Home Screen" component={BottomTabNavigator} 
          options={{headerShown: true,
            headerStyle:{
              backgroundColor: '#rgba(178, 157, 114, 0.94)',  
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle:{
              fontFamily: 'Poppins',
              fontSize: 24,
              fontWeight: 'bold',
              color: '#FFFFFF'              
            },
            title: 'PetTrack',
            headerBackVisible: false,
        }}/>
        <Stack.Screen name="List Of Pet" component={ListOfPetScreen} options={{headerShown:true
          ,headerStyle:{
            backgroundColor: '#rgba(178, 157, 114, 0.94)',  
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle:{
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF'              
          },
          headerBackTitle:'Back',
          title: 'List of Pets',
        }} />
        <Stack.Screen name="Pet Track" component={PetTrackScreen} options={{headerShown:false}} />
        <Stack.Screen name="Profile Screen" component={ProfileScreen} options={{headerShown:false}} />
        <Stack.Screen name="Detail Transaction" component={TransactionDetailScreen} options={{headerShown:true,
          headerStyle:{
            backgroundColor: '#rgba(178, 157, 114, 0.94)',  
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle:{
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF'              
          },
          title: 'Transaction Detail',
          headerBackTitle:'Back',
        }} />
        <Stack.Screen name="Pet Overview Screen" component={PetOverviewScreen} options={{headerShown:true,
          headerStyle:{
            backgroundColor: '#rgba(178, 157, 114, 0.94)',  
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle:{
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF'              
          },
          title: 'Pet Overview',
          headerBackTitle:'Back',
        }} />
        <Stack.Screen name="Add Medical Record Screen" component={AddMedicalRecordScreen} options={{headerShown:true,
          headerStyle:{
            backgroundColor: '#rgba(178, 157, 114, 0.94)',  
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle:{
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF'              
          },
          title: 'Add Medical Record',
          headerBackTitle:'Back',
        }} />
        <Stack.Screen name="Add Stock Screen" component={AddStockScreen} options={{headerShown:true
          ,headerStyle:{
            backgroundColor: '#rgba(178, 157, 114, 0.94)',  
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle:{
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF'              
          },
          title: 'Add Stock',
        }} />
        <Stack.Screen name="Stocking Screen" component={StockingScreen} options={{headerShown:true,
          headerStyle:{
            backgroundColor: '#rgba(178, 157, 114, 0.94)',  
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle:{
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF'              
          },
          title: 'List Of Stock',
          headerBackTitle:'Back',
        }} />
        <Stack.Screen name="Shopping Cart" component={ShoppingCartScreen} options={{headerShown:true,
          headerStyle:{
            backgroundColor: '#rgba(178, 157, 114, 0.94)',  
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle:{
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF'              
          },
          title: 'Shopping Cart',
          headerbackTitle:'Back',
        }} />
        <Stack.Screen name="Payment Screen" component={PaymentScreen} options={{headerShown:true,
          headerStyle:{
            backgroundColor: '#rgba(178, 157, 114, 0.94)',  
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle:{
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF'              
          },
          title: 'Payment',
          headerbackTitle:'Back',
        }} />
        <Stack.Screen name="Edit Stock" component={EditStockScreen} options={{headerShown:true,
          headerStyle:{
            backgroundColor: '#rgba(178, 157, 114, 0.94)',  
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle:{
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF'              
          },
          title: 'Edit Stock',
          headerBackTitle:'Back',
        }} />
        <Stack.Screen name="Income Screen" component={IncomeScreen} options={{headerShown:true,
          headerStyle:{
            backgroundColor: '#rgba(178, 157, 114, 0.94)',  
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle:{
            fontFamily: 'Poppins',
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFFFFF'              
          },
          title:"Income History",
          headerBackTitle:'Back'
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;