import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import { useFocusEffect } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import { authentication } from '../../../config';

import { doc, getDocs, collection, updateDoc, getDoc, setDoc} from 'firebase/firestore';
import { db } from '../../../config';

const Requests = () => {

   const [requests, setRequests] = useState([]);
   const [accepted, setAccepted] = useState(false);
   
    useEffect(() => {
        const docRef = doc(db, "requests", authentication.currentUser.email)
        getDocs(collection(docRef, "userRequests"))
            .then((snapshot) => {
              let requests = snapshot.docs.map(doc => {
                  const data = doc.data(); 
                  const id = doc.id; 
                  return { id, ...data }
              }); 
              setRequests(requests);
              console.log(requests);
            })
      }, [])

    const acceptRequest = async (item) => {
        const docRef = doc(db, "requests", authentication.currentUser.email, "userRequests", item.id);
        console.log(docRef)
        await updateDoc(docRef, {
            accepted: true,
        })
        const matchedRef = doc(db, "users", authentication.currentUser.email)
        await setDoc(matchedRef, {
            matched: true
        }, { merge: true })

        console.log(docRef)
    }
     

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
                    
                    const docRef = doc(db, "requests", authentication.currentUser.email, "userRequests", item.id);

                    getDoc(docRef)
                        .then((doc) => {
                            setAccepted(doc.get('accepted'))
                            console.log(photoURL)
                    })
                    
                    // if a request is already accepted, that request will disappear from all users' request list
                    if (!accepted) {
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
                                        
                                        {/* <FontAwesome 
                                            name='user-circle-o' 
                                            size={40} 
                                            color={'#007788'}
                                        /> */}

                                        <Image 
                                            source={{uri: item.photoURL}}
                                            style={{
                                                height: 55,
                                                width: 55,
                                                borderRadius: 55 / 2

                                            }}
                                        />


                                        <Text style={{
                                            marginHorizontal: 10,
                                            fontSize: 17
                                        }}>{item.name + ', ' + item.gender}</Text>

                                        {/* if curr user is already matched, curr user cannot accept requests from other users */}
                                        
                                             <TouchableOpacity
                                                onPress={() => acceptRequest(item)}
                                                style={[styles.button, styles.profile]}
                                                >
                                                    <Text style={styles.buttonText}>Accept</Text>
                                                </TouchableOpacity>

                                    
                                    
                                        
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
                    }
                })
                }

            </ScrollView>

            </View> 

        </View>
    )
}

const styles=StyleSheet.create({
    profile: {
        backgroundColor: '#007788',
    },
    buttonText: {
        color: '#f6f6f6',
        fontWeight: 'bold',
        textAlign: 'center',
        alignItems: 'center',
        marginLeft: 11, 
        marginTop: 8,
        fontSize: 15
    },
    button: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'centre',
        alignItems: 'centre',
        borderRadius: 10,
        width: 75,
        marginLeft: 115,
    }
})

export default Requests;