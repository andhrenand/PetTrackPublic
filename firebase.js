import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// 🔒 Firebase configuration (disembunyikan di .env)
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
  databaseURL: process.env.EXPO_PUBLIC_DATABASE_URL,
};

// ✅ Inisialisasi Firebase app (hindari re-init)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// ✅ Inisialisasi service
const auth = getAuth(app);
auth.useDeviceLanguage();
auth.setPersistence(getReactNativePersistence(AsyncStorage));

const firestoreDb = getFirestore(app);
const realtimeDb = getDatabase(app);

// ⚠️ Analytics hanya aktif di web
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.log("Analytics not supported in this environment.");
}

export { app, auth, firestoreDb, realtimeDb, analytics };
