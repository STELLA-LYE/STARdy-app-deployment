import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import React from 'react'


import Friends from './friends';

import Global from './global';



import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'; 
import { useEffect } from 'react';

const Leaderboard = () => {

    // const [global, setGlobal] = useState([]);
    // const [friends, setFriends] = useState([]);


    // const friendsQuery = query(friendsRef, orderBy("XP"), limit(20));

    // const globalQuery = query(globalRef, orderBy("XP"), limit(20));

    // useEffect(() => {
    //     getDocs(friendsQuery)
    //         .then((snapshot) => {
    //           let users = snapshot.docs.map(doc => {
    //               const data = doc.data(); 
    //               const id = doc.id; 
    //               return { id, ...data }
    //           }); 
    //           setFriends(users);
    //           console.log(users);
    //         })

    //     getDocs(globalQuery)
    //         .then((snapshot) => {
    //           let users = snapshot.docs.map(doc => {
    //               const data = doc.data(); 
    //               const id = doc.id; 
    //               return { id, ...data }
    //           }); 
    //           setGlobal(users);
    //           console.log(users);
    //         })
    //   },[])


    const TopBar = createMaterialTopTabNavigator();

    return (

        <TopBar.Navigator
            screenOptions={{
                tabBarLabelStyle: { fontSize: 14 },
                tabBarStyle: { backgroundColor: '#007788'},
                tabBarActiveTintColor: 'white'
            }}>

            
            <TopBar.Screen
                name='Global'
                component={Global} />

            <TopBar.Screen
                name='Friends'
                component={Friends} />
        

        </TopBar.Navigator>
    )
    }

    const styles = StyleSheet.create({
        container: {
            backgroundColor: '#eef1e1',
            flex: 1
        },
        user: {
            backgroundColor: '#007788',
            height: '25%'
        },
        btn: {
            backgroundColor: 'white',
            width: '40%',
            //borderWidth: 1,
            borderRadius: 0,
            // position: 'absolute',
            // bottom: 20,
            // marginLeft: 90
            flexDirection: 'column',
            justifyContent: 'center',
            height: 40

            
        },
        btnText: {
            fontSize: 20,
            textAlign: 'center',

            

        }
    })

export default Leaderboard;