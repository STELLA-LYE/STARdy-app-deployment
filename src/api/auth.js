import { authentication } from '../../config';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from 'react-native';

export const signup = async ( navigation, email, password ) => {
    await createUserWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        console.log('Account created!');
        navigation.navigate('Profile')
      })
      .catch((error) => {
        console.log('Error', error);
        Alert.alert('' + error);
      });  
};

export async function login (navigation, email, password ) {
    console.log('login called');
    await signInWithEmailAndPassword(authentication, email, password)
      .then((userCredential) => {
        console.log('User logged in successfully:',  userCredential);
        navigation.navigate('Main Tab')
      })
      .catch((error) => {
        console.log('Error at login ', error);
        Alert.alert('Error at login ' + error);
      });
};