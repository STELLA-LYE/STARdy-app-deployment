import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Modal,
  ScrollView,
  TextInput, 
  Alert, 
} from 'react-native'

//firebase 
import { storage } from '../../../config';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { db, authentication } from '../../../config';

import { queryUsersByName } from '../../services/random';

import { doc, getDoc, get, where, Filter, collection, getDocs, query, serverTimestamp, setDoc} from "firebase/firestore";

//each user display: profile picture, name, gender, major, year of study

export default function All() {

    const [users, setUsers] = useState([])
    const [searchParam, setSearchParam] = useState(null);
    const [isAdded, setIsAdded] = useState(false);

  // search users by name
   useEffect(() => {
    queryUsersByName(searchParam)
      .then(setUsers)

   }, [searchParam])

  //adding friends 
  addFriend = (item) => {
    console.log('test')
    const docRef = doc(db, "friends", authentication.currentUser.email, "userFriends", item.id);
    setDoc(docRef, {
      friends: true,
      name: item.name,
      gender: item.gender,
      year: item.year,
      major: item.major,
      photoURL: item.photoURL      
    })
  }


  showAlert = () => Alert.alert('Friend added', 'View your new friend under "Friends"', [
        {text: 'Understood'}]); 


  const cardClickEventListener = item => {
    Alert.alert(item.name)
  }

    //Frontend for All

  return (

    <View style={styles.container}>

      {/* Search icon and feature  */}

      <View style={styles.formContent}>
        <View style={styles.inputContainer}>
          <Image
            style={[styles.icon, styles.inputIcon]}
            source={{ uri: 'https://img.icons8.com/color/70/000000/search.png' }}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Search..."
            underlineColorAndroid="transparent"
            onChangeText={(event) => setSearchParam(event)}
          />

        </View>

        {/* {fetchUsers()} */}
        
      </View>


      <FlatList
        numColumns={1}
        horizontal= {false}
        data={users}
        renderItem={({ item }) => {

        {if (searchParam) {
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
                  <Text style={styles.about}> {item.major} </Text>
                  <Text style={styles.about}> {item.year} </Text>
                </View>

                <TouchableOpacity
                    style={styles.followButton}
                    onPress={() => addFriend(item)}>
                    <Text style={styles.followButtonText}>Add Friend</Text>
                  </TouchableOpacity>
              </TouchableOpacity>
            )
          } 
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
    followButton: {
        height: 35,
        width: 100,
        marginLeft: 250, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        backgroundColor: '#007788',
      },
      followButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold', 
      },
    
  })