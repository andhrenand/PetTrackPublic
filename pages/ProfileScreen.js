import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { auth, firestoreDb } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ProfileScreenStyle from "../styles/ProfileScreenStyle";

export default function ProfileScreen() {
    const navigation = useNavigation();
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const [username, setUsername] = useState(""); 
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchProfileData();
    }, []);

    const fetchProfileData = async () => {
        const user = auth.currentUser;
        if (!user) return;

        try {
            const userDoc = await getDoc(doc(firestoreDb, "users", user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                setUsername(userData.username || "User");
                setProfilePictureUrl(userData.profilePictureUrl || null);
                console.log("Fetched profile picture URL:", userData.profilePictureUrl);
            }
        } catch (error) {
            console.error("Error fetching profile data:", error);
        }
    };

    const handleSignOut = () => {
        auth.signOut()
            .then(() => {
                navigation.replace("Welcome Page");
            })
            .catch((error) => alert(error.message));
    };

    const handleProfilePictureUpdate = async () => {
        const user = auth.currentUser;
        if (!user) return;

        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (result.canceled) {
                Alert.alert("Upload dibatalkan");
                return;
            }

            setIsUploading(true);
            const imageUri = result.assets[0].uri;
            const storage = getStorage();
            const storageRef = ref(storage, `profile_pictures/${user.uid}.jpg`);

            // Fetch image and convert to blob
            const response = await fetch(imageUri);
            const blob = await response.blob();

            // Upload file to Firebase Storage
            await uploadBytes(storageRef, blob);

            // Get download URL
            const downloadUrl = await getDownloadURL(storageRef);
            console.log("New Profile Picture URL:", downloadUrl);

            // Update Firestore user document
            await updateDoc(doc(firestoreDb, "users", user.uid), { profilePictureUrl: downloadUrl });

            // Update state to trigger re-render
            setProfilePictureUrl(downloadUrl);
            setIsUploading(false);
            Alert.alert("Foto profil berhasil diperbarui!");
        } catch (error) {
            console.error("Error uploading image:", error);
            setIsUploading(false);
            Alert.alert("Gagal mengupload gambar");
        }
    };

    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <View
                style={{
                    marginTop: -20,
                    height: 350,
                    width: "100%",
                    backgroundColor: "rgba(195, 167, 113, 0.3)",
                    borderRadius: 30,
                }}
            >
                <Text
                    style={{
                        top: 100,
                        alignSelf: "center",
                        fontFamily: "Poppins",
                        fontSize: 30,
                        fontWeight: "bold",
                        color: "#83520A",
                    }}
                >
                    {username}'s Profile
                </Text>

                <TouchableOpacity onPress={handleProfilePictureUpdate} disabled={isUploading}>
                    <View
                        style={{
                            top: 150,
                            width: 120,
                            height: 120,
                            borderRadius: 60,
                            overflow: "hidden",
                            borderWidth: 3,
                            borderColor: "#83520A",
                            alignSelf: "center",
                            justifyContent: "center",
                            backgroundColor: "#ddd",
                        }}
                    >
                        {profilePictureUrl ? (
                            <Image
                                source={{ uri: profilePictureUrl }}
                                style={{ width: "100%", height: "100%" }}
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={{ alignSelf: "center", justifyContent: "center" }}>
                                {isUploading ? <ActivityIndicator size="small" color="#83520A" /> : <Text>Upload</Text>}
                            </View>
                        )}
                    </View>
                </TouchableOpacity>
            </View>


            <TouchableOpacity
                style={{
                    backgroundColor: "#83520A",
                    padding: 10,
                    margin: 10,
                    marginTop: 100,
                    borderRadius: 90,
                    width: "30%",
                    height: 40,
                    alignSelf: "center",
                    alignItems: "center",
                }}
                onPress={handleSignOut}
            >
                <Text
                    style={{
                        color: "#FFFFFF",
                        fontFamily: "Poppins",
                        fontSize: 16,
                        fontWeight: "bold",
                    }}
                >
                    Sign Out
                </Text>
            </TouchableOpacity>
        </View>
    );
}
