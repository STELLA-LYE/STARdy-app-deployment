// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from 'firebase/auth';
//import { getReactNativePersistence, initializeAuth } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyv5OGvjZwSUpReEQP3-6SANzMCbcYovo",
  authDomain: "stardy-2.firebaseapp.com",
  projectId: "stardy-2",
  storageBucket: "stardy-2.appspot.com",
  messagingSenderId: "801488903589",
  appId: "1:801488903589:web:e28716c631e5cf4bbb1c4c"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const authentication = getAuth(app);

// 