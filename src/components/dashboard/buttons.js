import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Alert, TouchableOpacity } from 'react-native'

import { Entypo } from '@expo/vector-icons'

export default function Buttons({ nav }) {

    const toDo = () => {
        nav.navigate('To Do List');
    }
    
    const notes = () => {
        nav.navigate('Notes');
    }
    
    const encouragement = () => {
        nav.navigate('Encouragement Notes!');
    }
    

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toDo}>
                <View style={styles.button}>
                    <Text style={styles.text}>To Do</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={notes}>
                <View style={styles.button}>
                    <Text style={styles.text}>Notes</Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={encouragement}>
                <View style={styles.button}>
                    <Entypo name='heart' size={24} color='#f6cefc' />
                </View>
            </TouchableOpacity>
        
        </View>
    )

}

const styles=StyleSheet.create({
    container: {
        marginHorizontal: 15,
        paddingHorizontal: 6,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        //backgroundColor: 'pink',
        marginTop: -110
    },
    button: {
        backgroundColor: '#007788',
        width: 100,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        //marginBottom: 
    },
    text: {
        color: '#f6f6f6',
        //fontFamily: 'RowdiesRegular',
        fontWeight: 'bold',
        fontSize: 18
    }
})
