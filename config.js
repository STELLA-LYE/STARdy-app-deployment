// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from 'firebase/auth';
//import { getReactNativePersistence, initializeAuth } from "firebase/auth/react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdvXAlD2HF44zmbZ9Dn553TNNXJRMHX8g",
  authDomain: "stardy-app-4.firebaseapp.com",
  projectId: "stardy-app-4",
  storageBucket: "stardy-app-4.appspot.com",
  messagingSenderId: "811964394033",
  appId: "1:811964394033:web:92de95fa5ed63bbcf38310"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const authentication = getAuth(app);