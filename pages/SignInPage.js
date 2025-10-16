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
  Alert,
} from "react-native";
import SignInPageStyles from "../styles/SignInPageStyle";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestoreDb } from "../firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";

// 🧩 Tambahkan ini di atas:
const DEV_MODE = true; // ubah ke false untuk pakai login asli Firebase

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleSignIn = async () => {
    if (DEV_MODE) {
      // 🚀 Skip login untuk testing UI
      console.log("⚙️ Dev Mode Active: Skipping authentication.");

      // Pilih role manual
      const userRole = email.toLowerCase().includes("admin")
        ? "admin"
        : "customer";

      // Navigasi langsung
      navigation.reset({
        index: 0,
        routes: [
          {
            name: userRole === "admin" ? "Home Screen" : "Customer HomeScreen",
          },
        ],
      });

      return; // ⛔ Jangan lanjut ke Firebase
    }

    // 👇 Bagian normal login Firebase tetap jalan kalau DEV_MODE = false
    if (!email.trim()) {
      Alert.alert("Validation Error", "Please enter your email.");
      return;
    }
    if (!password.trim()) {
      Alert.alert("Validation Error", "Please enter your password.");
      return;
    }

    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );
      const user = userCredentials.user;
      console.log("Logged in with:", user.email);

      // Fetch user role from Firestore
      const userDocRef = doc(firestoreDb, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const userRole = userData.role || "customer";

        if (userRole === "admin") {
          navigation.reset({
            index: 0,
            routes: [{ name: "Home Screen" }],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: "Customer HomeScreen" }],
          });
        }
      } else {
        Alert.alert("Error", "User data not found in Firestore.");
      }
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "No account found with this email. Please sign up or check your email.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email format. Please enter a valid email.";
          break;
        case "auth/too-many-requests":
          errorMessage = "Too many failed attempts. Try again later or reset your password.";
          break;
        default:
          errorMessage = error.message;
      }

      Alert.alert("Sign In Error", errorMessage);
    }
  };

  const handleForgotPassword = () => {
    if (!email.trim()) {
      Alert.alert("Forgot Password", "Please enter your email to reset your password.");
      return;
    }

    sendPasswordResetEmail(auth, email.trim())
      .then(() => {
        Alert.alert("Password Reset", "A password reset link has been sent to your email.");
      })
      .catch((error) => {
        console.error("Error sending reset email:", error.message);
        let errorMessage = "Failed to send password reset email.";
        if (error.code === "auth/user-not-found") {
          errorMessage = "User not found. Please check your email.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "Invalid email format.";
        }
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <KeyboardAvoidingView
      style={SignInPageStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View>
            <Text style={SignInPageStyles.TextHi}>Welcome!</Text>
            <Text style={SignInPageStyles.TextDesc}>Sign In To Continue</Text>
            <Text style={SignInPageStyles.Label}>Email</Text>
            <TextInput
              style={SignInPageStyles.StyleInput}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Text style={SignInPageStyles.Label}>Password</Text>
            <TextInput
              style={SignInPageStyles.StyleInput}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholder="Password"
              secureTextEntry
            />
            <View style={SignInPageStyles.StyleButton}>
              <TouchableOpacity
                style={SignInPageStyles.StyleSignInButton}
                onPress={handleSignIn}
              >
                <Text style={SignInPageStyles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={SignInPageStyles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
