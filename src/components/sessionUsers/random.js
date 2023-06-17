import React, { Component, useEffect, useState, useCallback } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  FlatList,
  AppState,
} from 'react-native'

import { useFocusEffect } from '@react-navigation/native';

//firebase 
import { storage } from '../../../config';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { db, authentication } from '../../../config';

import { doc, getDoc, get, where, Filter, getDocs, query, collection, setDoc} from "firebase/firestore";

export default function Random(props) {

  const [users, setUsers] = useState([])


  const[name, setName] = useState('')
  const[major, setMajor] = useState('')
  const[year, setYear] = useState('')
  const[gender, setGender] = useState('')
  const[photoURL, setPhotoURL] = useState(null);
  const [userID, setUserID] = useState(authentication.currentUser.uid);
  const [isRequesting, setIsRequesting] = useState(null);
  const [matched, setMatched] = useState(null);

  const docRef = doc(db, "users", authentication.currentUser.email);

  

  // filter 
  useEffect(() => {
    // const q = query(collection(db, "users"), where("major", "==", major), where("year", "==", year));
    const q = query(collection(db, "users"), where("major", ">=", major), where("year", "==", year),  where("appState", "==", "active"));
    getDocs(q)
        .then((snapshot) => {
          let users = snapshot.docs.map(doc => {
              const data = doc.data(); 
              const id = doc.id; 
              return { id, ...data }
          }); 
          setUsers(users);
          console.log(users);
        })
  },[major, year])

  // retrieve and update
  useFocusEffect(
    useCallback(() => {
      getDoc(docRef)
      .then((doc) => {
          setName(doc.get('name'))
          setMajor(doc.get('major'))
          setYear(doc.get('year'))
          setGender(doc.get('gender'))
          setPhotoURL(doc.get('photoURL'))
      })
     }, [])
  )

  const cardClickEventListener = item => {
    Alert.alert(item.name)
  }

  // getDoc(docRef)
  //               .then((doc) => {
  //                   setName(doc.get('name'))
  //                   setMajor(doc.get('major'))
  //                   setYear(doc.get('year'))
  //                   setGender(doc.get('gender'))
  //                   setPhotoURL(doc.get('photoURL'))  
  //                   //console.log(photoURL)
  //               })

  // send request (i.e. data of current user requesting)
  handleRequest = (item) => {
    setIsRequesting(item.id);
    const docRef = doc(db, "requests", item.id, "userRequests", authentication.currentUser.email);
    setDoc(docRef, {
      name: name,
      gender: gender,
      year: year,
      major: major,
      photoURL: photoURL,
      userID: authentication.currentUser.uid,
      email: authentication.currentUser.email
    })
    Alert.alert("Request sent!", `Please wait for ${item.name} to accept your request.`)
  }

  noRequest = (item) => Alert.alert('Already Requested!', `Wait for ${item.name} to accept your request.`)
  
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
          if (item.id != authentication.currentUser.email && !item.matched) {

            
            return (
              <TouchableOpacity
                style={[styles.card, { borderColor:'#007788' }]}
                onPress={() => {
                  cardClickEventListener(item)
                }}>
               
                <View style={styles.cardContent}>
                  <Image style={[styles.image, styles.imageContent]} source={{ uri: item.photoURL }} />
                  <Text style={styles.name}> {item.name} </Text>
                  {/* <Text style={styles.about}> {item.gender} </Text> */}
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

                    <View style={styles.aboutContainer}>
                      <Text style={styles.about}> online </Text>
                    </View>


                </View>

                { (isRequesting == item.id) ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#d3d3d3',
                      ...styles.button,
                      justifyContent: 'center',
                      alignItems: 'center',

                      
                    }}
                    onPress={() => noRequest(item)}>
                    <Text style={{color: 'grey', fontWeight: 'bold'}}>Requesting</Text>
                  </TouchableOpacity>)
                  :
                  ( <TouchableOpacity
                      style={[styles.button, styles.profile]}
                      onPress={() => handleRequest(item)}>
                      <Text style={styles.buttonText}>Request</Text>
                    </TouchableOpacity>
                  )}
                
              </TouchableOpacity> 
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
    height: 160,
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

                  