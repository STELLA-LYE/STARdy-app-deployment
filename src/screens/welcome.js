import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Image } from 'react-native';



export default function Welcome({ navigation }) {

    const pressHandler = () => {
        navigation.navigate('Login');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>STARdy</Text>
                <TouchableOpacity style={styles.button} onPress={pressHandler} activeOpacity={0.5}>
                    <Text style={styles.buttonText}>Start Today</Text>
                </TouchableOpacity>
            <Image source={require('../../assets/star-icon.png')} style={styles.image} />
        </View>
    );
}

const styles=StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#eef1e1',
        alignItems: 'center',
    },
    titleText: {
        color: '#007788',
        fontFamily: 'PressStart',
        fontSize: 52,
        position: 'absolute',
        top: '25%'        
    }, 
    button: {
        padding: 19,
        backgroundColor: '#007788',
        //position: 'absolute', // absolute causes touchable opacity to not work in android!!
        marginTop: 520,
        borderRadius: 15
    },
    buttonText: {
        fontSize: 32,
        fontFamily: 'RowdiesRegular',
        color: '#f6f6f6'
    }, 
    image: {
        width: 250,
        height: 250,
        position: 'absolute',
        top: '34%'
    }
})
    



