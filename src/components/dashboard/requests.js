import React, { useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';

const Requests = () => {

    const [requests, setRequests] = useState([
        { name: 'Melissa Jane', gender: 'F', key: '1' },
        { name: 'Jennifer', gender: 'F', key: '2' },
        { name: 'Minho Lee', gender: 'M', key: '3' },
        { name: 'Chris Evans', gender: 'M', key: '4' },
        { name: 'Chris Evans', gender: 'M', key: '5' },
        { name: 'Chris Evans', gender: 'M', key: '6' },
        { name: 'Chris Evans', gender: 'M', key: '7' },
        { name: 'Chris Evans', gender: 'M', key: '8' },
        { name: 'Chris Evans', gender: 'M', key: '9' },
        { name: 'Chris Evans', gender: 'M', key: '10' },
    ])

    // const [requests, setRequests] = useState([
    //     { name: 'No Requests', gender: '', key: '1'}
    // ])


    return (
        <View style={{
            //backgroundColor: 'white',
            //flex: 1,
            height: 430,
            marginHorizontal: 15,
            paddingHorizontal: 6,
            //paddingVertical: 18,
            marginTop: 17
        }}>
            <View style={{
                //backgroundColor: 'pink',
                // flex: 1,
                // marginTop: -18
            }}>
                <Text style={{
                    fontWeight: '500',
                    fontSize: 20,
                    //marginTop: -5
                }}>Requests</Text>
                
            </View>

            <View style={{
                backgroundColor: '#007788',
                height: 1,
                marginTop: 5
            }}></View>

            <View style={{
                //backgroundColor: 'white', 
                justifyContent: 'space-between',
                overflow: 'scroll',
                height: 280

                //alignItems: 'center'
            }}>

            <ScrollView>
            

                { requests.map((item) => {
                    return (
                        <View key={item.key}>
                            <View style={{
                                //backgroundColor: 'green',
                                padding: 10,
                                //paddingBottom: -10,
                                //paddingTop: -10,
                                //height: 100
                            }}>
                                <View style={{
                                    //backgroundColor: 'blue',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    height: 50, 
                                    //borderColor: '#333',
                                    //borderBottomWidth: 0.5,
                                    
                                }}>
                                    
                                    <FontAwesome 
                                        name='user-circle-o' 
                                        size={40} 
                                        color={'#007788'}
                                    />

                                    <Text style={{
                                        marginHorizontal: 10,
                                        fontSize: 17
                                    }}>{item.name + ', ' + item.gender}</Text>

                                    

                                </View>

                                <View style={{
                                        marginVertical: 12,
                                        marginLeft: -10,
                                        width: 400,
                                        height: 0.5,
                                        backgroundColor: '#007788',
                                        flex: 1
                                    }}>

                                </View>
                                
                            </View>
                            
                        </View>
                    )
                })
                }

            </ScrollView>

            </View> 

        </View>
    )
}

const styles=StyleSheet.create({

})

export default Requests;