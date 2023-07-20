import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import { db, authentication } from '../../config';
import { doc, getDoc, get, where, Filter, getDocs, query, collection, setDoc, orderBy, limit} from "firebase/firestore";

import { FontAwesome } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';


const Global = () => {

    const [top10, setTop10] = useState([
        { name: 'Melissa Jane', level: 10, xp: 20000, id: '1' },
        { name: 'Alexis Bernie', level: 9, xp: 10000, id: '2'  },
        { name: 'Christopher J', level: 8, xp: 9000, id: '3'  },
        { name: 'Rachel Julies', level: 7, xp: 8000, id: '4'  },
        { name: 'Jennifer Jessie', level: 6, xp: 7000, id: '5'  },
        { name: 'Alexandra Mia', level: 5, xp: 6000, id: '6'  },
        { name: 'Audrey Denice', level: 4, xp: 5000, id: '7'  },
        { name: 'January June', level: 3, xp: 4000, id: '8'  },
        { name: 'Joanna Jaden', level: 2, xp: 3000, id: '9'  },
        { name: 'Jonathan Go', level: 1, xp: 2000, id: '10'  },

    ]);

    const globalRef = collection(db, "users");
    const [global, setGlobal] = useState([]);
    const globalQuery = query(globalRef, orderBy("xp"), limit(20));

    useEffect(() => {
            getDocs(globalQuery)
            .then((snapshot) => {
              let users = snapshot.docs.map(doc => {
                  const data = doc.data(); 
                  const id = doc.id; 
                  return { id, ...data }
              }); 
              setGlobal(users);
              //console.log(users);
            })
        
    },[global])

  return (
    <View style={styles.container}>
        <FlatList 
            keyExtractor={(item) => item.id}
            data={global}
            renderItem={({ item }) => (
                
                // rank yet to be implemented
                <View style={styles.tag}>
                    <View style={{padding: 20}}>
                        { item.rank == 1 
                            ? <MaterialCommunityIcons name="medal" size={24} color="#fcc201" /> 
                            : item.rank == 2
                            ? <MaterialCommunityIcons name="medal" size={24} color="#c0c0c0" />
                            : item.rank == 3
                            ? <MaterialCommunityIcons name="medal" size={24} color="#cd7f32" />
                            : <Text style={styles.rank}>{item.rank}</Text> }
                        

                    </View>

                    <View style={{marginRight: 20}}>
                        <FontAwesome name="user-circle-o" size={40} color="black" />
                        {/* <Image style={[styles.image, styles.imageContent]} source={{ uri: item.photoURL }} /> */}
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

// const styles=StyleSheet.create({
//     container: {
//         backgroundColor: '#eef1e1',
//         flex: 1,
//         marginTop: 5,
//         paddingHorizontal: 20,
//         //flexDirection: 'row',
//         //justifyContent: 'space-between'

//     }, 
//     item: {
//         fontSize: 20,
//         backgroundColor: 'white',
//         //marginTop: 24,
//         //marginLeft: 10
//     },
//     tag: {
//         flexDirection: 'row',
//         backgroundColor: 'white',
//         alignContent: 'center',
//         alignItems: 'center',
//         marginVertical: 8,
//         //borderWidth: 0.15,
//         borderColor: '#007788',
//         borderRadius: 10,
//         shadowColor: '#171717',
//         shadowOffset: {width: 2, height: 2},
//         shadowOpacity: 0.2,
//         shadowRadius: 3,
//         padding: 5
        


//     },
//     rank: {
//         fontWeight: 'bold',
//         fontSize: 20,
//         paddingHorizontal: 5
//     },
//     level: {
//         fontSize: 15
//     },
//     image: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//       },

// })

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

export default Global;