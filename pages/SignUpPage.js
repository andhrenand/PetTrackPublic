import React, { useState } from "react";
import { 
    View, 
    Text, 
    TextInput, 
    TouchableOpacity, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Alert 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SignUpStyle from "../styles/SignUpPageStyle";
import { auth, firestoreDb } from "../firebase"; // Ensure correct Firestore import
import { createUserWithEmailAndPassword } from "firebase/auth";
import { 
    collection, 
    query, 
    where, 
    getDocs, 
    setDoc, 
    doc 
} from "firebase/firestore"; 
export default function SignUpPage() {
    const navigation = useNavigation();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        if (!username.trim()) {
            Alert.alert("Validation Error", "Username cannot be empty.");
            return;
        }
        if (!email.trim() || !email.includes("@")) {
            Alert.alert("Validation Error", "Enter a valid email address.");
            return;
        }
        if (password.length < 6) {
            Alert.alert("Validation Error", "Password must be at least 6 characters.");
            return;
        }
    
        try {
            // Cek apakah username sudah terdaftar
            const usersRef = collection(firestoreDb, "users");
            const q = query(usersRef, where("username", "==", username.trim()));
            const querySnapshot = await getDocs(q);
    
            if (!querySnapshot.empty) {
                Alert.alert("Sign Up Fail", "Username is already taken. Please choose another.");
                return;
            }
    
            // Jika username belum digunakan, buat akun baru
            const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password.trim());
            const user = userCredential.user;
    
            // Simpan data user di Firestore dengan role default "customer"
            await setDoc(doc(firestoreDb, "users", user.uid), {
                username: username.trim(),
                email: email.trim(),
                profilePictureUrl: "",  
                role: "customer", // Default role untuk user baru      
            });
    
            console.log("Registered with", user.email);
            Alert.alert("Success", "Account created successfully!", [
                { text: "OK", onPress: () => navigation.navigate("Sign In") }
            ]);
        } catch (error) {
            let errorMessage = "Sign up failed. Please try again.";
    
            switch (error.code) {
                case "auth/email-already-in-use":
                    errorMessage = "This email is already registered.";
                    break;
                case "auth/invalid-email":
                    errorMessage = "Invalid email format.";
                    break;
                case "auth/weak-password":
                    errorMessage = "Password should be at least 6 characters.";
                    break;
                default:
                    errorMessage = error.message;
            }
    
            Alert.alert("Error", errorMessage);
        }
    };
    

    return (
        <KeyboardAvoidingView
            style={SignUpStyle.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View>
                        <Text style={SignUpStyle.TextHi}>Hi!</Text>
                        <Text style={SignUpStyle.TextDesc}>Create a New Account</Text>
                        
                        <Text style={SignUpStyle.label}>Username</Text>
                        <TextInput 
                            style={SignUpStyle.styleinput} 
                            placeholder="Enter your username"
                            value={username}
                            onChangeText={setUsername}
                        />
                        
                        <Text style={SignUpStyle.label}>Email</Text>
                        <TextInput 
                            style={SignUpStyle.styleinput}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        
                        <Text style={SignUpStyle.label}>Password</Text>
                        <TextInput 
                            style={SignUpStyle.styleinput} 
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        
                        <View style={SignUpStyle.stylebutton}>
                            <TouchableOpacity 
                                style={SignUpStyle.StyleSignUpButton} 
                                onPress={handleSignUp}
                            >
                                <Text style={SignUpStyle.buttonText}>SIGN UP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
