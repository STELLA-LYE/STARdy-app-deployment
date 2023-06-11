import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, BackHandler, Alert } from 'react-native'
import React, {useState, useEffect} from 'react';

import { MaterialIcons } from '@expo/vector-icons';

//import auth from '@react-native-firebase/auth';


import { authentication } from '../../config';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import MainTab from '../navigation/mainTab';


const Login = ({ navigation }) => {
    
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // const logInUser = async () => {
    //     try {
    //         const loginRes = await createUserWithEmailAndPassword(authentication, email, password)
    //         console.log(loginRes.user.email);
    //     } catch ({message}) {
    //         console.log('Error');
    //     }
    //     navigation.navigate('profile');
    // }
   

    // useEffect(() => {
    //     const unsubscribe = authentication.onAuthStateChanged((user) => {
    //         if(user) {
    //             console.log('logged in');
    //             //setIsLoggedIn(true);
    //         } else {
    //             console.log('logged out');
    //             //setIsLoggedIn(false);
    //         }
    //     })
    //     return unsubscribe;
    // },[]);

    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
          if (user) {
            console.log("USER IS STILL LOGGED IN: " , user);
            setUser(user);
            //setIsLoggedIn(true);
          }
        });
      }, [user]);

      const handleLogin = () => {
        signInWithEmailAndPassword(authentication, email, password)
          .then((userCredential) => {
            console.log('Account created!');
            setUser(userCredential);
            console.log(user)
            navigation.navigate('Main Tab');
          })
          .catch((error) => {
            console.log('Error', error);
            Alert.alert('Error ' + error);
          });
          
      };

      const handleSignup = () => {
        createUserWithEmailAndPassword(authentication, email, password)
          .then((userCredential) => {
            console.log('User logged in successfully:',  userCredential);
            setUser(userCredential);
            console.log(user);
            navigation.navigate('Profile');
          })
          .catch((error) => {
            console.log('Error', error);
            Alert.alert('' + error);
          });
          
      };

    //   const registerUser = async () => {
    //     createUserWithEmailAndPassword(authentication, email, password)
    //     .then((userCredentials) => {
    //         const userUID = userCredentials.user.uid;
    //         const docRef = doc(db, 'users', userUID);
    //         const docSnap = setDoc(docRef, {
    //             avaterUrl: avater ? avater :'https://thumbs.dreamstime.com/b/businessman-avatar-line-icon-vector-illustration-design-79327237.jpg',
    //             name,
    //             gender, 
    //             major, 
    //             year, 
    //             email, 
    //             password,
    //             userUID,
    //             appState: appState, 
    //         })
           
    //     })
    //     .then(() => console.log('succesful'))
    // }

    
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
      }, []);

      if (!isLoggedIn) {
        return (
            <View style={{flex: 1, backgroundColor: '#eef1e1', alignItems: 'center'}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    source={require('../../assets/star-icon.png')} 
                    style={{width: 150, height: 150,}} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Welcome!</Text>

                <View style={{
                    padding: 25
                }}>

                </View>
             
            </View>
            <TextInput 
                value={email} 
                style={styles.input} 
                placeholder='Enter your email'
                onChangeText={text => setEmail(text)}/>
            <TextInput 
                value={password} 
                style={styles.input} 
                placeholder='Enter your password'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}/>
    
            <TouchableOpacity onPress={handleLogin}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Log In</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignup}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </View>
            </TouchableOpacity>
            </View>
        )

      } else {
            return (
                <View style={{flex: 1}}>
                    <MainTab />
                </View>
            )
      }
        
        
            
    }

        
    
    


const styles = StyleSheet.create({
    input: {
        backgroundColor: '#f6f6f6',
        //borderWidth: 0.5,
        //borderColor: '#777',
        padding: 10,
        borderRadius: 10,
        margin: 10,
        //width: 300,
        //marginBottom: 20,
        marginHorizontal: 20,
        width: 320,
        top: -20
    },
    button: {
        borderRadius: 4,
        paddingVertical: 14,
        paddingHorizontal: 15,
        backgroundColor: '#007788',
        //position: 'centre',
        //left: 108,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 20,
        width: 100,
        //height: 50
      },
      buttonText: {
        color: '#f6f6f6',
        fontWeight: 'bold',
        fontFamily: 'RowdiesRegular', 
        fontSize: 18,
        textAlign: 'center',
      },
})
export default Login;