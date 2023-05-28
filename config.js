// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref } from "firebase/storage";
import { getAuth } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6Tvwo9Agc125cvsPE45_qAa0z6GPZBKU",
  authDomain: "stardy-app.firebaseapp.com",
  projectId: "stardy-app",
  storageBucket: "stardy-app.appspot.com",
  messagingSenderId: "738640029925",
  appId: "1:738640029925:web:eff2a8e1848f0b8e87cc0c",
  measurementId: "G-E2Y7EM9KF4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const authentication = getAuth(app);




