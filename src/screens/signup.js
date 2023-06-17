import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, BackHandler, Alert } from 'react-native'
import React, {useState, useEffect} from 'react';

import { MaterialIcons } from '@expo/vector-icons';

//import auth from '@react-native-firebase/auth';


import { authentication } from '../../config';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import MainTab from '../navigation/mainTab';


export default function SignUp({ navigation }) {

    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => {
    //     onAuthStateChanged(authentication, (user) => {
    //       if (user) {
    //         console.log("USER IS STILL LOGGED IN: " , user);
    //         setUser(user);
    //         //navigation.navigate('Main Tab');
    //         //setIsLoggedIn(true);
    //       }
    //     });
    //   }, [user]);



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

      if (!isLoggedIn) {
        return (
            <View style={{flex: 1, backgroundColor: '#eef1e1', alignItems: 'center'}}>
            <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20}}>
                <Image 
                    source={require('../../assets/star-icon.png')} 
                    style={{width: 170, height: 170,marginTop: 20}} />
                <Text style={{fontSize: 30, 
                              fontWeight: 'bold', 
                            }}>Register</Text>

                <View style={{
                    padding: 15
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

            <Text
                style={{color: '#00008B', 
                        right: -29,
                        marginTop: 10}}
                onPress={() => navigation.navigate('Login')}
            
            >
                Already have an account? Log in here
            </Text>

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
    container:{
        flex:1, 
        backgroundColor: '#eef1e1',
        alignItems: 'center'
    },
    // btn:{
    //     marginHorizontal:10,
    //     marginBottom:40
    // }
    input: {
        backgroundColor: '#f6f6f6',
        //borderWidth: 0.2,
        //borderColor: '#777',
        padding: 10,
        borderRadius: 15,
        margin: 8,
        //width: 300,
        //marginBottom: 20,
        marginHorizontal: 20,
        width: 320,
        height: 50
        // top: -20
    },
    button: {
        borderRadius: 15,
        //paddingVertical: 14,
        //paddingHorizontal: 15,
        backgroundColor: '#007788',
        //position: 'centre',
        //left: 108,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: 45,
        width: 320,
        height: 50, 
        marginBottom: 10, 
      },
      buttonText: {
        color: '#f6f6f6',
        fontWeight: 'bold',
        fontFamily: 'RowdiesRegular', 
        fontSize: 18,
        textAlign: 'center',
      },
      regText: {
       
  
      }
  })