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

// import { doc, getDoc, get, where, Filter, collection, getDocs, query, serverTimestamp, setDoc} from "firebase/firestore";
import { setDoc, doc, getDocs, query, collection, where, getDoc } from "firebase/firestore";
import { addFriend, fetchUserFriends } from '../../api/firestore';

import { queryUsersByName } from '../../services/random';
//each user display: profile picture, name, gender, major, year of study

export default function Add() {

    const [users, setUsers] = useState([])
    const [searchParam, setSearchParam] = useState(null);
    const [isAdded, setIsAdded] = useState(false);
    const [userFriends, setUserFriends] = useState([]);
    const [lastFriendAdded, setLastFriendAdded] = useState(null);

  // search users by name
   useEffect(() => {
    queryUsersByName(searchParam)
      .then(setUsers)

      console.log('users add: ' + users);
    
   }, [searchParam])

   useEffect(() => {
    const q = query(collection(db, "friends", authentication.currentUser.uid, "userFriends"));
    getDocs(q)
        .then((snapshot) => {
          let users = snapshot.docs.map(doc => {
              const id = doc.id 
              return id; 
          }); 
          setUserFriends(users);
          console.log(users);
        })
   }, [lastFriendAdded])


  const onAddPressed = (item) => {
    addFriend(item)
    setLastFriendAdded(item.userID)
  }

  const onAddedPressed = (item) => {
    Alert.alert(item.name + ' is already added')
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



  
        {if (searchParam && item.email != authentication.currentUser.email) {         

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

                  <View style={styles.aboutContainer}>
                    <Text style={styles.about}> {item.major} </Text>
                  </View>

                  <View style={styles.aboutContainer}>
                    <Text style={styles.about}> {item.year} </Text>
                  </View>
              
                </View>

                { (userFriends.indexOf(item.userID) > -1) ? 
                  (
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#d3d3d3',
                        ...styles.button,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                      onPress={() => onAddedPressed(item)}>
                      <Text style={{color: 'grey', fontWeight: 'bold'}}>Added</Text>
                    </TouchableOpacity>
                  )
                    :
                  ( 
                    <TouchableOpacity
                        style={[styles.button, styles.profile]}
                        onPress={() => onAddPressed(item)}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                  )
                }
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


                  