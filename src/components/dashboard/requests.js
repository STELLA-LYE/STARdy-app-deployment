// import React, { useState, useCallback, useEffect, useRef } from 'react'
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

// import { useFocusEffect } from '@react-navigation/native';

// import { FontAwesome } from '@expo/vector-icons';
// import { FlatList, ScrollView } from 'react-native-gesture-handler';
// import { authentication } from '../../../config';

// import { doc, getDocs, collection, updateDoc, getDoc, setDoc, deleteDoc} from 'firebase/firestore';
// import { db } from '../../../config';


// {/* //notification portion  */}
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
      
// Notifications.setNotificationHandler({
// handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//  }),
// });

// const Requests = () => {

//    const [requests, setRequests] = useState([]);
//    const [accepted, setAccepted] = useState(false);
//    const [currUserMatched, setCurrUserMatched] = useState(null);
//    const [startDate, setStartDate] = useState(null);
//    const [currUserName, setCurrUserName] = useState('');
//    const [currUserPhotoURL, setCurrUserPhotoURL] = useState('');
//    const [currUserID, setCurrUserID] = useState('');
//    const [currUserEmail, setCurrUserEmail] = useState('');


//    const [expoPushToken, setExpoPushToken] = useState('');
//     const [notification, setNotification] = useState(false);
//     const notificationListener = useRef();
//     const responseListener = useRef();
  
//     useEffect(() => {
//       registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
//       notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//         setNotification(notification);
//       });
  
//       responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//         console.log(response);
//       });
  
//       return () => {
//         Notifications.removeNotificationSubscription(notificationListener.current);
//         Notifications.removeNotificationSubscription(responseListener.current);
//       };
//     }, []);

   
   
//     useEffect(() => {
//         const docRef = doc(db, "requests", authentication.currentUser.email)
//         getDocs(collection(docRef, "userRequests"))
//             .then((snapshot) => {
//               let requests = snapshot.docs.map(doc => {
//                   const data = doc.data(); 
//                   const id = doc.id; 
//                   return { id, ...data }
//               }); 
//               setRequests(requests);
//               //console.log(requests);
//             })
        
//         const usersRef = doc(db, "users", authentication.currentUser.email)
//         getDoc(usersRef)
//             .then((doc) => {
//                 setCurrUserMatched(doc.get('matched'));
//                 console.log(doc.get('name'));
//                 setCurrUserName(doc.get('name'));
//                 setCurrUserPhotoURL(doc.get('photoURL'));
//                 setCurrUserID(doc.get('userID'));
//                 setCurrUserEmail(doc.get('email'));
//             })
//       }, [])

//     const acceptRequest = async (item) => {
//         await schedulePushNotification();

//         const startDay = new Date().getDate();
//         setStartDate(startDay);
//         console.log("statrt " + startDay)
        
//         // delete request once accepted
//         await deleteDoc(doc(db, "requests", authentication.currentUser.email, "userRequests", item.id));
//         // console.log(docRef)
//         // await updateDoc(docRef, {
//         //     accepted: true,
//         // })
        
//         // console.log("accept " +item);
//         const matchedRef = doc(db, "users", item.id)
//         await setDoc(matchedRef, {
//             matched: true,
//         }, { merge: true })
        
//         const matchedRef2 = doc(db, "users", authentication.currentUser.email)
//         console.log("matched ref2" + matchedRef2)
//         console.log("id " + item.userID)
//         await setDoc(matchedRef2, {
//             matched: true,
//         }, { merge: true })

//         // if current user is in a focus session, should not be able to accept the request

//         const docRef = doc(db, "focusSession", authentication.currentUser.email, "partners", item.id)
//         await setDoc(docRef, {
//             name: item.name,
//             active: true,
//             userID: item.userID,
//             photoURL: item.photoURL,
//             email: item.email,
//             start: startDay,

//         }, { merge: true }).then(() => {
//             console.log('submitted!')
//         }).then((error) => {
//             console.log(error)
//         })

//         // need current user data!
//         const docRef2 = doc(db, "focusSession", item.id, "partners", authentication.currentUser.email)
//         await setDoc(docRef2, {
//             name: currUserName,
//             active: true,
//             userID: currUserID,
//             photoURL: currUserPhotoURL,
//             email: currUserEmail,
//             start: startDay,
//         }, { merge: true }).then(() => {
//             console.log('submitted!')
//         }).then((error) => {
//             console.log(error)
//         })

       
      
//     }

//     return (
//         <View style={{
//             //backgroundColor: 'white',
//             //flex: 1,
//             height: 430,
//             marginHorizontal: 15,
//             paddingHorizontal: 6,
//             //paddingVertical: 18,
            
//         }}>
//             <View style={{
//                 //backgroundColor: 'pink',
//                 // flex: 1,
//                 // marginTop: -18
//             }}>
//                 <Text style={{
//                     fontWeight: '500',
//                     fontSize: 20,
//                     //marginTop: -5
//                 }}>Requests</Text>
                
//             </View>

//             <View style={{
//                 backgroundColor: '#007788',
//                 height: 1,
//                 marginTop: 5
//             }}></View>

//             <View style={{
//                 //backgroundColor: 'white',
//                 borderRadius: 20,
//                 justifyContent: 'space-between',
//                 overflow: 'scroll',
//                 height: 380,
//                 marginTop: 10,
//                 //borderWidth: 0.2

//                 //alignItems: 'center'
//             }}>
            

//             { requests.length != 0 && !currUserMatched   
//                 ?  <FlatList
//                     horizontal= {false}
//                     data={requests}
//                     //extraData={users}
//                     keyExtractor={(item) => item.id}
//                     renderItem={({ item }) => {
//                         console.log(item.matched);
//                         return (
//                             <View key={item.key}>
//                                 <View style={{
//                                     //backgroundColor: 'green',
//                                     padding: 10,
//                                     //paddingBottom: -10,
//                                     //paddingTop: -10,
//                                     //height: 100
//                                 }}>
//                                     <View style={{
//                                        //backgroundColor: 'blue',
//                                        flexDirection: 'row',
//                                        justifyContent: 'space-around',
//                                         alignItems: 'center',
//                                         height: 50, 
//                                         //borderColor: '#333',
//                                         //borderBottomWidth: 0.5,
                                                            
//                                     }}>
                                                        
            
//                                                             <Image 
//                                                                 source={{uri: item.photoURL}}
//                                                                 style={{
//                                                                     height: 55,
//                                                                     width: 55,
//                                                                     borderRadius: 55 / 2
            
//                                                                 }}
//                                                             />
            
            
//                                                             <Text style={{
//                                                                 marginHorizontal: 10,
//                                                                 fontSize: 17
//                                                             }}>{item.name + ', ' + item.gender}</Text>
            
//                                                                     <TouchableOpacity
//                                                                         onPress={() => acceptRequest(item)}
//                                                                         style={[styles.button, styles.profile]}
//                                                                         >
//                                                                         <Text style={styles.buttonText}>Accept</Text>
//                                                                     </TouchableOpacity>                                    
                                                            
//                                                         </View>
            
//                                                         <View style={{
//                                                                 marginVertical: 10,
//                                                                 marginTop: 25,
//                                                                 marginLeft: -10,
//                                                                 width: 400,
//                                                                 height: 0.5,
//                                                                 backgroundColor: '#007788',
//                                                                 flex: 1
//                                                             }}>
            
//                                                         </View>
                                                        
//                                                     </View>
                                                    
//                                                 </View>
//                                             )

//                     }}
//                     />
//                 : <View style={styles.empty}>
//                     <Text style={styles.emptyText}>Requests other people have made will appear here!</Text>
//                   </View> 
                
                
//             }
                
           

            
//             </View> 
//         </View>
//     )
// }

// const styles=StyleSheet.create({
//     profile: {
//         backgroundColor: '#007788',
//     },
//     buttonText: {
//         color: '#f6f6f6',
//         fontWeight: 'bold',
//         textAlign: 'center',
//         alignItems: 'center',
//         marginLeft: 11, 
//         marginTop: 8,
//         fontSize: 15
//     },
//     button: {
//         height: 35,
//         flexDirection: 'row',
//         justifyContent: 'centre',
//         alignItems: 'centre',
//         borderRadius: 10,
//         width: 75,
//         marginLeft: 115,
//     },
//     emptyText: {
//         fontSize: 20,
//         opacity: 0.5,
//         textAlign: 'center'
//     },
//     empty: {
//         flex: 1,
//         justifyContent: 'center',
//         alignContent: 'center',
//         alignItems: 'center',
        
//     }, 
    
// })

// export default Requests;

import React, { useState, useCallback, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import { useFocusEffect } from '@react-navigation/native';

import { FontAwesome } from '@expo/vector-icons';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { authentication } from '../../../config';

import { doc, getDocs, collection, updateDoc, getDoc, setDoc, deleteDoc} from 'firebase/firestore';
import { db } from '../../../config';


{/* //notification portion  */}
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
      
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
              //console.log(requests);
            })
        
        const usersRef = doc(db, "users", authentication.currentUser.email)
        getDoc(usersRef)
            .then((doc) => {
                setCurrUserMatched(doc.get('matched'));
                console.log(doc.get('name'));
                setCurrUserName(doc.get('name'));
                setCurrUserPhotoURL(doc.get('photoURL'));
                setCurrUserID(doc.get('userID'));
                setCurrUserEmail(doc.get('email'));
            })
      }, [])

    const acceptRequest = async (item) => {

        await schedulePushNotification();

        const startDay = new Date().getDate();
        setStartDate(startDay);
        console.log("statrt " + startDay)
        
        // delete request once accepted
        await deleteDoc(doc(db, "requests", authentication.currentUser.email, "userRequests", item.id));
        // console.log(docRef)
        // await updateDoc(docRef, {
        //     accepted: true,
        // })
        
        // console.log("accept " +item);
        const matchedRef = doc(db, "users", item.id)
        await setDoc(matchedRef, {
            matched: true,
        }, { merge: true })
        
        const matchedRef2 = doc(db, "users", authentication.currentUser.email)
        console.log("matched ref2" + matchedRef2)
        console.log("id " + item.userID)
        await setDoc(matchedRef2, {
            matched: true,
        }, { merge: true })

        // if current user is in a focus session, should not be able to accept the request

        const docRef = doc(db, "focusSession", authentication.currentUser.email, "partners", item.id)
        await setDoc(docRef, {
            name: item.name,
            active: true,
            userID: item.userID,
            photoURL: item.photoURL,
            email: item.email,
            start: startDay,

        }, { merge: true }).then(() => {
            console.log('submitted!')
        }).then((error) => {
            console.log(error)
        })

        // need current user data!
        const docRef2 = doc(db, "focusSession", item.id, "partners", authentication.currentUser.email)
        await setDoc(docRef2, {
            name: currUserName,
            active: true,
            userID: currUserID,
            photoURL: currUserPhotoURL,
            email: currUserEmail,
            start: startDay,
        }, { merge: true }).then(() => {
            console.log('submitted!')
        }).then((error) => {
            console.log(error)
        })
      
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
                justifyContent: 'space-between',
                overflow: 'scroll',
                height: 380,
                marginTop: 10,
                //borderWidth: 0.2

                //alignItems: 'center'
            }}>
            

            { requests.length != 0 && !currUserMatched   
                ?  <FlatList
                    horizontal= {false}
                    data={requests}
                    //extraData={users}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => {
                        console.log(item.matched);
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
                                       justifyContent: 'space-around',
                                        alignItems: 'center',
                                        height: 50, 
                                        //borderColor: '#333',
                                        //borderBottomWidth: 0.5,
                                                            
                                    }}>
                                                        
            
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
            
                                                                    <TouchableOpacity
                                                                        onPress={() => acceptRequest(item)}
                                                                        style={[styles.button, styles.profile]}
                                                                        >
                                                                        <Text style={styles.buttonText}>Accept</Text>
                                                                    </TouchableOpacity>                                    
                                                            
                                                        </View>
            
                                                        <View style={{
                                                                marginVertical: 10,
                                                                marginTop: 25,
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
        justifyContent: 'centre',
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
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        
    }, 
    
})

export default Requests;
