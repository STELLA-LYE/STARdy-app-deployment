import React, { Component, useEffect, useState, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList,
} from 'react-native'

import { useFocusEffect } from '@react-navigation/native';

//firebase 
import { db, authentication } from '../../../config';
import { doc, getDoc, getDocs, query, collection, setDoc} from "firebase/firestore";
import { queryUsersByMajorAndYear, request } from '../../api/firestore';

export default function Random() {

  const [users, setUsers] = useState([])
  const[major, setMajor] = useState('')
  const[year, setYear] = useState('')
  const [userRequesting, setUserRequesting] = useState([]);
  const [requested, setRequested] = useState(null);
  const [currUserName, setCurrUserName] = useState(null);
  const [currUserGender, setCurrUserGender] = useState(null);
  const [currUserYear, setCurrUserYear] = useState(null);
  const [currUserMajor, setCurrUserMajor] = useState(null);
  const [currUserUID, setCurrUserUID] = useState(null);
  const [currUserPhotoURL, setCurrUserPhotoURL] = useState(null);

  // filter 
  useEffect(() => {
    queryUsersByMajorAndYear(major, year)
      .then(setUsers)
  
  },[])

  // useEffect(() => {
  //   const q = query(collection(db, "requesting", authentication.currentUser.uid, "requestingUsers"));
  //   getDocs(q)
  //     .then((snapshot) => {
  //       let users = snapshot.docs.map(doc => {
  //         console.log('id: ' + doc.id);
  //         const id = doc.id 
  //         return id; 
  //       }); 
  //     setUserRequesting(users);
      
  //   })
  // }, [requested])
  useFocusEffect(
    useCallback(() => {
      const docRef = doc(db, "users", authentication.currentUser.uid);
      getDoc(docRef)
        .then((doc) => {
          setCurrUserName(doc.get('name'))
          setCurrUserGender(doc.get('gender'))
          setCurrUserMajor(doc.get('major'))
          setCurrUserYear(doc.get('year'))
          setCurrUserUID(doc.get('userID'))
          setCurrUserPhotoURL(doc.get('photoURL'))
        })

    }, [])
  )

  useFocusEffect(
    useCallback(() => {
      const q = query(collection(db, "requesting", authentication.currentUser.uid, "requestingUsers"));
      getDocs(q)
      .then((snapshot) => {
        let users = snapshot.docs.map(doc => {
          const id = doc.id 
          return id; 
        }); 
      setUserRequesting(users);
      
    })
     }, [requested])
  )

  // retrieve and update
  useFocusEffect(
    useCallback(() => {
      const docRef = doc(db, "users", authentication.currentUser.uid);
      getDoc(docRef)
      .then((doc) => {
          setMajor(doc.get('major'))
          setYear(doc.get('year'))
      })
     }, [])
  )

  const onRequestPressed = (item, currUserName, currUserGender, currUserYear, currUserMajor, currUserPhotoURL, currUserUID) => {
    request(item, currUserName, currUserGender, currUserYear, currUserMajor, currUserPhotoURL, currUserUID);
    setRequested(item.id);
  }
  
  //Frontend for Random 

  return (

    <View style={styles.container}>

      <FlatList
        numColumns={1}
        horizontal= {false}
        data={users}
        extraData={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          console.log(item.name + ' ' + item.matched)
          // if user is noti the current user and user isn't already matched, flat list
          if (item.id != authentication.currentUser.uid) {

            
            return (
              <View style={[styles.card, { borderColor:'#007788' }]}>
               
                <View style={styles.cardContent}>
                  <Image style={[styles.image, styles.imageContent]} source={{ uri: item.photoURL }} />
                  <Text style={styles.name}> {item.name} </Text>
                </View>
  
                <View style={styles.cardSection}>

                    <View style={styles.aboutContainer}>
                      <Text style={styles.about}> {item.gender} </Text>
                    </View>

                    {/* display matched/unmatched status */}
                    {!item.matched

                      ? 
                      
                      <View style={styles.aboutContainer}>
                        <Text style={styles.about}> unmatched </Text>
                      </View>
                      
                      : 

                      <View style={styles.aboutContainer}>
                        <Text style={styles.about}> matched </Text>
                      </View>}
                    
                    {item.AppState == 'active' 
                      ? <View style={styles.aboutContainer}>
                          <Text style={styles.about}> online </Text>
                        </View>
                      : <View style={styles.aboutContainer}>
                          <Text style={styles.about}> offline </Text>
                        </View> }
                    


                </View>

                { (userRequesting.indexOf(item.id) > -1) ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#d3d3d3',
                      ...styles.button,
                      justifyContent: 'center',
                      alignItems: 'center',

                      
                    }}
                    >
                    <Text style={{color: 'grey', fontWeight: 'bold'}}>Requesting</Text>
                  </TouchableOpacity>)
                  :
                  ( <TouchableOpacity
                      style={[styles.button, styles.profile]}
                      onPress={() => onRequestPressed(item, currUserName, currUserGender, currUserYear, currUserMajor, currUserPhotoURL, currUserUID)}>
                      <Text style={styles.buttonText}>Request</Text>
                    </TouchableOpacity>
                  )}
                
                </View> 
            )
          }
        }}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1e1',
    //marginBottom: 100, 
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  card: {
    //height: 160,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth: 40,
    marginBottom: 20,
    marginHorizontal: 10
  },
  cardContent: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  cardSection: {
    flexDirection: 'row',
    marginLeft: 60,
    //marginTop: 5, 
  },
  imageContent: {
    marginTop: -40,
  },
  tagsContent: {
    marginTop: 10,
    flexWrap: 'wrap',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
    top: 3
  },
  about: {
    fontSize: 16,
    //fontWeight: 'bold',
    //marginLeft: 10,
    alignSelf: 'center',
    //padding: 12,
    borderRadius: 100
  },
  aboutContainer: {
    left: -50,
    top: 27,
    backgroundColor: '#ECECEC',
    margin: 3,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 20
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: '#eee',
    marginTop: 5,
  },
   button: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'centre',
    alignItems: 'centre',
    alignContent: 'center',
    borderRadius: 10,
    width: 100,
    //marginRight: 20,
    marginLeft: 250,
    bottom: 70
    //marginTop: 5,
    //backgroundColor: '#007788'
  },
  startbutton: {
    height: 35,
    borderRadius: 100,
    width: 130,
    marginTop: 5,
    marginLeft: 10, 
    backgroundColor: '#007788',
    
  },
   profile: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007788',
  },
  buttonText: {
    color: '#f6f6f6',
    fontWeight: 'bold',
    textAlign: 'center',
    //marginLeft: 11, 
    //marginTop: 8,
    
  },
})

                  