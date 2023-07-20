import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'


import { db, authentication } from '../../config';

import { doc, getDoc, get, where, Filter, getDocs, query, collection, setDoc, orderBy, limit} from "firebase/firestore";

import { FontAwesome } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';


const Friends = () => {

    const friendsRef = collection(db, "friends", authentication.currentUser.email, "userFriends")
    const friendsQuery = query(friendsRef, orderBy("xp"), limit(20));

    const [friends, setFriends] = useState([])

    useEffect(() => {
        getDocs(friendsQuery)
            .then((snapshot) => {
              let users = snapshot.docs.map(doc => {
                  const data = doc.data(); 
                  const id = doc.id; 
                  return { id, ...data }
              }); 
              setFriends(users);
              console.log(users);
            })
      },[])

    const [top10, setTop10] = useState([
        { name: 'Melissa Jane', level: 10, xp: 20000, id: '1' },
        { name: 'Alexis Bernie', level: 9, xp: 10000, id: '2'  },
        { name: 'Christopher J', level: 8, xp: 9000, id: '3'  },
    ]);

  return (
    <View style={styles.container}>
        <FlatList 
            keyExtractor={(item) => item.id}
            data={top10}
            renderItem={({ item }) => (
                
                <View style={styles.tag}>
                    <View style={{padding: 20}}>
                        { item.id == 1 
                            ? <MaterialCommunityIcons name="medal" size={24} color="#fcc201" /> 
                            : item.id== 2
                            ? <MaterialCommunityIcons name="medal" size={24} color="#c0c0c0" />
                            : item.id == 3
                            ? <MaterialCommunityIcons name="medal" size={24} color="#cd7f32" />
                            : <Text style={styles.rank}>{item.id}</Text> }
                        

                    </View>

                    <View style={{marginRight: 20}}>
                        <FontAwesome name="user-circle-o" size={40} color="black" />
                    </View>

                    <View style={{
                            backgroundColor: 'white',
                            // flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignContent: 'center',
                        }}>
                            <Text style={styles.item}>{item.name}</Text>
                            <View>
                                <Text style={styles.level}>{'Level ' + item.level}</Text>
                            </View>
                            
                    </View>

                    <View style={{marginLeft: 50}}>
                        <Text style={{textAlign: 'right'}}>{item.xp}</Text>
                    </View>

                </View>
                
            )}
        />
    </View>
  )
}

const styles=StyleSheet.create({
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
        backgroundColor: 'white',
        //marginTop: 24,
        //marginLeft: 10
    },
    tag: {
        flexDirection: 'row',
        backgroundColor: 'white',
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
    level: {
        fontSize: 15
    }
})

export default Friends;