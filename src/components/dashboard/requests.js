import React, { useState, useCallback, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import { useFocusEffect } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { authentication } from '../../../config';

import { doc, getDocs, collection, updateDoc, getDoc, setDoc, deleteDoc} from 'firebase/firestore';
import { db } from '../../../config';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import { acceptRequest } from '../../api/firestore';


{/* //notification portion  */}
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { fetchUserRequests } from '../../api/firestore';
      
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
        }),
    });

const Requests = () => {
    
    //notification 
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
  
    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);
   //notification 

   const [requests, setRequests] = useState([]);
   const [accepted, setAccepted] = useState(false);
   const [currUserMatched, setCurrUserMatched] = useState(null);
   const [startDate, setStartDate] = useState(null);
   const [currUserName, setCurrUserName] = useState('');
   const [currUserPhotoURL, setCurrUserPhotoURL] = useState('');
   const [currUserID, setCurrUserID] = useState('');
   const [currUserEmail, setCurrUserEmail] = useState('');

   const navigation = useNavigation();

   
   
    useEffect(() => {
        const usersRef = doc(db, "users", authentication.currentUser.uid)
        getDoc(usersRef)
            .then((doc) => {
                setCurrUserMatched(doc.get('matched'));
                console.log(doc.get('name'));
                setCurrUserName(doc.get('name'));
                setCurrUserPhotoURL(doc.get('photoURL'));
                setCurrUserID(doc.get('userID'));
                setCurrUserEmail(doc.get('email'));
                setCurrUserMatched(doc.get('matched'))
            })
    }, [])

    useFocusEffect(
        useCallback(() => {
            fetchUserRequests()
            .then(setRequests)

        }, [accepted])
    )

    const onAcceptRequest = async (item, currUserName, currUserEmail, currUserID, currUserPhotoURL, currUserMatched) => {
        await acceptRequest(item, currUserName, currUserEmail, currUserID, currUserPhotoURL, currUserMatched);
        setAccepted(item.id);
        Alert.alert(`Your Focus Session with ${item.name} has started`, 
        "Complete all of your tasks before the deadline!")

    }

    const sendAlert = () => {
        Alert.alert("Cannot join a new focus session", "Submit evidence before joining a new focus session")
    }

    return (
        <View style={{
            //backgroundColor: 'white',
            //flex: 1,
            height: 430,
            marginHorizontal: 15,
            paddingHorizontal: 6,
            //paddingVertical: 18,
            
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
                borderRadius: 20,
                //justifyContent: 'space-between',
                overflow: 'scroll',
                height: 380,
                marginTop: 10,
                //borderWidth: 0.2

                //alignItems: 'center'
            }}>
            {/*             
            // if there are no requests or curr user is matched, requests wont be displayed */}
            
            { requests.length != 0
                ?  <FlatList
                    horizontal= {false}
                    data={requests}
                    //extraData={users}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        console.log('curr User email: ' + currUserEmail)
                        console.log(item.id);
                        console.log(item.email);
                        console.log(item)
                        return (
                            <View style={styles.tag}>
                            
                                <View style={{marginRight: 20}}>
                                    <Image 
                                        source={{uri: item.photoURL}} 
                                        style={{ height: 45,
                                                width: 45,
                                                borderRadius: 45 / 2,
                                                marginLeft: 2
                                            }}
                                    />
                                    
                                </View>

                                <View style={{
                                        //backgroundColor: 'white',
                                        // flex: 1,
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        alignContent: 'center',
                                    }}>
                                        <Text style={styles.item}>{item.name}</Text>
                                        <View>
                                            <Text style={styles.caption}>{`${item.major}, Year ${item.year}, ${item.gender}`}</Text>
                                        </View>
                                        
                                </View>

                                <View style={{marginLeft: 50}}>
                                    {currUserMatched == null
                                    ? <TouchableOpacity onPress={() => onAcceptRequest(item, currUserName, currUserEmail, currUserID, currUserPhotoURL, currUserMatched)}>
                                        <Text style={{
                                            textAlign: 'right', 
                                            fontWeight: 'bold',
                                            color: 'white',
                                            backgroundColor: '#007788', 
                                            padding: 8, 
                                            borderRadius: 8}}>Accept</Text>
                                    </TouchableOpacity>
                                    :<TouchableOpacity onPress={sendAlert}>
                                        <Text style={{
                                            textAlign: 'right', 
                                            fontWeight: 'bold',
                                            color: 'white',
                                            backgroundColor: 'grey', 
                                            padding: 8, 
                                            borderRadius: 8}}>Accept</Text>
                                    </TouchableOpacity>
                                    }
                                    
                                </View> 

                            </View>
                            
                        )

                    }}
                    />
                : <View style={styles.empty}>
                    <Text style={styles.emptyText}>Requests other people have made will appear here!</Text>
                  </View> 
               
            }
            </View> 
        </View>
    )
}


async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "STARdy ⭐ You are matched",
        body: '🌟 Your focus session today starts now and will end at 23:59✨',
        data: { data: 'goes here' },
      },
      trigger: { seconds: 10 },
    });
  }
  
  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
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
        //justifyContent: 'centre',
        alignItems: 'centre',
        borderRadius: 10,
        width: 75,
        marginLeft: 115,
    },
    emptyText: {
        fontSize: 20,
        opacity: 0.5,
        textAlign: 'center'
    },
    empty: {
        flex: 1,
        //justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        
    }, 
    container: {
        backgroundColor: '#eef1e1',
        flex: 1,
        marginTop: 5,
        paddingHorizontal: 20,
        //flexDirection: 'row',
        //justifyContent: 'space-between'

    }, 
    item: {
        fontSize: 20,
        fontWeight: '700'
        //backgroundColor: 'white',
        //marginTop: 24,
        //marginLeft: 10
    },
    tag: {
        flexDirection: 'row',
        //backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        marginVertical: 8,
        //borderWidth: 0.15,
        borderColor: '#007788',
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    
    },
    rank: {
        fontWeight: 'bold',
        fontSize: 20,
        paddingHorizontal: 5
    
    },
    caption: {
        fontSize: 15,
        fontWeight: '400'
    }
 
})


export default Requests;
