import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, BackHandler, Alert } from 'react-native'
import React, {useState, useEffect} from 'react';
import { signup } from '../api/auth';


export default function SignUp({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSignUpPressed = async () => {
        await signup(navigation, email, password)
    }

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
                onPress={() => navigation.navigate('Login')}>
                Already have an account? Log in here
            </Text>

            <TouchableOpacity onPress={onSignUpPressed}>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Sign Up</Text>
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
    input: {
        backgroundColor: '#f6f6f6',
        padding: 10,
        borderRadius: 15,
        margin: 8,
        marginHorizontal: 20,
        width: 280,
        height: 50
    },
    button: {
        borderRadius: 15,
        backgroundColor: '#007788',
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
})