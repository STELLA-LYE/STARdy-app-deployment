import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, BackHandler, Alert } from 'react-native'
import React, {useState, useEffect} from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { login } from '../api/auth';
import { authentication } from '../../config';
import MainTab from '../navigation/mainTab';

import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

const Login = ({ navigation }) => {
    
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onLoginPressed = async () => {
      await login(navigation, email, password)
    }
   
    useEffect(() => {
        onAuthStateChanged(authentication, (user) => {
          if (user) {
            console.log("USER IS STILL LOGGED IN: " , user);
            setUser(user);
            navigation.navigate('Main Tab');
          }
        });
      }, [user]);


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

      return (
        <View style={{flex: 1, backgroundColor: '#eef1e1', alignItems: 'center'}}>
        <View style={{justifyContent: 'center', 
                      alignItems: 'center', 
                      marginTop: 20}}>
            <Image 
                source={require('../../assets/star-icon.png')} 
                style={{width: 170, height: 170,marginTop: 20}} />
            <Text style={{fontSize: 30, 
                          fontWeight: 'bold', 
                        }}>Welcome Back!</Text>
            {/* <Text style={{marginTop: 15}}>Login to your account</Text> */}

            <View style={{
                padding: 15
            }}>

            </View>
         
        </View>
        <TextInput 
            value={email} 
            style={styles.input} 
            placeholder='Email'
            onChangeText={text => setEmail(text)}
            leftIcon={{type:'material', name:'email', color: '#007788'}}
        />
        <TextInput 
            value={password} 
            style={styles.input} 
            placeholder='Password'
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            leftIcon={{type:'material', name:'lock', color: '#007788'}}
        />

        <Text 
          style={{color: '#00008B',
                  right: -29,
                  marginTop: 10}}
          onPress={() => navigation.navigate('Sign Up')}
        >Don't have an account? Register here!</Text>

        <TouchableOpacity onPress={onLoginPressed}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>Log In</Text>
            </View>
        </TouchableOpacity>

        </View>
    )   
            
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
      marginHorizontal: 30,
      width: 280,
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
      width: 280,
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

export default Login;