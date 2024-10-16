// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCeTsSYo22TKxanXnySj6bKIw7-4U9XKc",
  authDomain: "holbegram-dabb8.firebaseapp.com",
  projectId: "holbegram-dabb8",
  storageBucket: "holbegram-dabb8.appspot.com",
  messagingSenderId: "1072328628951",
  appId: "1:1072328628951:web:d1595534311184625f2e92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Authentication
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
