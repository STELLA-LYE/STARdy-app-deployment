import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, {useState, useEffect} from 'react';

import { MaterialIcons } from '@expo/vector-icons';

import auth from '@react-native-firebase/auth';

import { authentication } from '../../config';
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import MainTab from '../navigation/mainTab';


const Login = ({ navigation }) => {

    const logInUser = () => {
        createUserWithEmailAndPassword(authentication, email, password)
        .then((re)=> {
            console.log(re);
            setIsLoggedIn(true);
        })
        .catch((re)=>{
            console.log(re);
        })
        navigation.navigate('profile');
    }
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const user = authentication.currentUser;

    useEffect(() => {
        const authListener = () => {
            if (user) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        }
        return authListener;
    },[]);


    if (isLoggedIn) {
        return (
            <View style={{flex: 1, backgroundColor: '#eef1e1', alignItems: 'center'}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image 
                    source={require('../../assets/star-icon.png')} 
                    style={{width: 150, height: 150,}} />
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Log In</Text>
                <TextInput value={email} />
                <TextInput value={password} />
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
    
            <TouchableOpacity onPress={logInUser}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Log In</Text>
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
        height: 53
      },
      buttonText: {
        color: '#f6f6f6',
        fontWeight: 'bold',
        fontFamily: 'RowdiesRegular', 
        fontSize: 20,
        textAlign: 'center',
      },
})
export default Login;