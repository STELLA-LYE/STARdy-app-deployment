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
  const [matched, setMatched] = useState(false);

  const docRef = doc(db, "users", authentication.currentUser.email);

  

  // filter 
  useEffect(() => {
    const q = query(collection(db, "users"), where("major", ">=", major), where("year", "==", year));
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
      accepted: false,
      name: name,
      gender: gender,
      year: year,
      major: major,
      photoURL: photoURL      
    })
  }

  noRequest = (item) => Alert.alert('Already Requested!', `Wait for ${item.name} to accept your request.`)
  
  //Frontend for Random 

  return (

    <View style={styles.container}>

      {/* <TextInput 
          placeholder='Type Here...'
  onChange={(search)=> fetchUsers(search)}/> */}

      {/* <TouchableOpacity
          style={[styles.startbutton]}
          onPress={fetchUsers()}>
          <Text style={styles.buttonText}> Start Search </Text>
      </TouchableOpacity> */}

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
            // const docRef = doc(db, "users", item.id);
            // getDoc(docRef)
            // .then((doc) => {
            //     setMatched(doc.get('matched'))
            // })
            
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
                <Text style={styles.about}> {item.gender} </Text>
                {/* display matched/unmatched status */}
                {item.matched
                  ? <Text style={styles.about}> matched </Text>
                  : <Text style={styles.about}> unmatched </Text>}
                 
                <Text style={styles.about}> online </Text>
                </View>

                { (isRequesting == item.id) ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'light gray',
                      ...styles.button,
                      
                    }}
                    onPress={() => noRequest(item)}>
                    <Text style={styles.buttonText}>Requesting</Text>
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
    height: null,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth: 40,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  cardSection: {
    flexDirection: 'row',
    marginLeft: 60,
    marginTop: 5, 
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
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  about: {
    fontSize: 16,
    //fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
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
    borderRadius: 10,
    width: 100,
    marginRight: 20,
    marginLeft: 250,
    marginTop: 5,
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
    backgroundColor: '#007788',
  },
  buttonText: {
    color: '#f6f6f6',
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 11, 
    marginTop: 8,
    
  },
})

                  