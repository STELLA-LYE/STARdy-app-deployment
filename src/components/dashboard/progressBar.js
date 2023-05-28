import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';


const goToLeaderboard = () => {
    Alert.alert('Leaderboard WIP')
}

const ProgressBar = () => {

    const [width, setWidth] = useState('90%');

    return (
        <SafeAreaView style={{
            //backgroundColor: 'pink',
            paddingHorizontal: 8,
            marginTop: -20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'space-between',
            top: 10,
            height: 60
        }}>
            

            <Text style={{
                position: 'absolute',
                //fontFamily: 'PressStart',
                fontSize: 16,
                //color: '#007788',
                //marginTop: -15,
                left: 9,
                top: 10,
            }}>Level 2</Text>

        
            
                <TouchableOpacity onPress={() => goToLeaderboard()}>
                    <View style={styles.progress}>
                        <View style={{
                            display: 'flex',
                            height: 10,
                            backgroundColor: '#007788',
                            borderRadius: 20,
                            width: width,
                            //top: -15,
                           // position: 'absolute'
                           
                        }}></View>
                    </View>
                </TouchableOpacity>

                <View style={{
                width: 50,
                height: 50,
                //backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                top: -40,
                //left:0

            }}>
                <TouchableOpacity onPress={goToLeaderboard}>
                <Image source={require('../../../assets/star-icon.png')} 
                        style={{
                            width: 50,
                            height: 50,
                            top: 40
                           

                        }} />

                </TouchableOpacity>
                
            </View>

            
            

            
            
        </SafeAreaView>
    )

}

const styles=StyleSheet.create({
    progress: {
        height: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 20,
        //position: 'absolute',
        top: -15,
        width: 250
        
    },
})

export default ProgressBar;