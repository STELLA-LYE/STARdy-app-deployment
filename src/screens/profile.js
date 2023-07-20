// 
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image, TouchableOpacity, Alert, AppState, ActivityIndicator} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Feather } from '@expo/vector-icons';
import { saveUserProfileImage } from '../services/user';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, addDoc, collection, getDoc } from "firebase/firestore"; 
import { db } from '../../config';
import { authentication } from '../../config';
import { submitUserData } from '../api/firestore'

export default function Profile({navigation}) {

  const [name, setName] = useState(''); 
  const [gender, setGender] = useState(''); 
  const [major, setMajor] = useState(''); 
  const [year, setYear] = useState(''); 
  const [photoURL, setPhotoURL] = useState(null);
  const [lastPhotoUpdatedAt, setLastPhotoUpdatedAt] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  //online portion 
  const [appState, setAppState] = useState(AppState.currentState);

  // // useEffect(() => {
  // //   AppState.addEventListener('change', handleAppStateChange);
  // //   return () => {
  // //     AppState.removeEventListener('change', handleAppStateChange);
  // //   };
  // // }, []);

  const handleAppStateChange = (nextAppState) => {
    console.log('App State: ' + nextAppState);
    if (appState != nextAppState) {
      if (appState.match(/inactive|background/) 
            && nextAppState === 'active') {
        console.log(
          'App State: ' +
          'App has come to the foreground!'
        );
        alert(
          'App State: ' +
          'App has come to the foreground!'
        );
      }
      alert('App State: ' + nextAppState);
      setAppState(nextAppState);
    }
  };

  // // initialize user data
  // const pressHandler = () => {
  //   setDoc(doc(db, "users", authentication.currentUser.email), {
  //     name: name,
  //     gender: gender,
  //     major: major,
  //     year: year,
  //     userID: authentication.currentUser.uid,
  //     matched: false,
  //     email: authentication.currentUser.email,
  //     start: null,
  //     xp: 200,
  //     appState: appState, 
  //   }, {merge: true}).then(() => {
  //     // data saved successfully
  //     console.log('data submitted');
  //   }).catch((error) => {
  //     //the write failed
  //     console.log(error)
  //   });
  //   navigation.navigate('Main Tab');
  // }

  const onSubmitPressed = () => {
    submitUserData(navigation, name, gender, major, year, appState)
  }

  // upload profile image
  const chooseImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    //console.log(result.assets[0].uri);

    if (!result.canceled) {
      setIsLoading(true);
      // save photo to storage and generate downloadURL to be saved in firestore
     saveUserProfileImage(result.assets[0].uri)
      .then((date) => {
        setLastPhotoUpdatedAt(date);
        setIsLoading(false);
      })
    }
  }

    // update photoURL
    useEffect(() => {
      onAuthStateChanged(authentication, (user) => {
        if (user) {
          const docRef = doc(db, "users", authentication.currentUser.uid);
          getDoc(docRef)
          .then((doc) => {
              setPhotoURL(doc.get('photoURL'))  
              console.log(photoURL)
          }) 
          //console.log('auth ' + authentication.currentUser)
        } else {
          console.log('not signed in')
        }
      })
    }, [lastPhotoUpdatedAt])

return (

  <View style={styles.container}>

    <View style={styles.parent}>
      <View style={styles.child}>
          <TouchableOpacity 
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: -10,}}
          onPress={chooseImage}  
        >
          {/* <View style={{
            flexDirection: 'column',
            justifyContent: 'center',
            ...styles.logo
          }}> */}
          { photoURL != null ? 
            <Image
            style={{
              //flexDirection: 'column',
              //justifyContent: 'center',
              position: 'absolute',
              ...styles.logo}}  
            source={{ uri: photoURL }} />
            : <View style={{...styles.logo, position: 'absolute'}}>
              </View>}
          
            {/* <Text style={{
              color: 'white',
              fontSize: 15
            }}>Upload Image</Text> */}
            <View style={styles.imageOverlay} />

            {isLoading
            ? <ActivityIndicator color='#007788'/> 
            : <Feather name='camera' size={26} color='white' />
            }
            
          {/* </View> */}
          {/* <FontAwesome name='user-circle-o' size={90} color='#007788' />   */}
        </TouchableOpacity>

      </View>
    </View>

    {/* <View style={{
      height: 
    }}>

    </View> */}

    

  

    <View style={{
      top: "0%"
    }}>
      <Text style={{
        position: 'relative',
        left: 20,
        top: 10
      }}>Name</Text>
      <TextInput 
        placeholder='e.g. John Doe' 
        value={name}
        style={styles.input}
        onChangeText={(value) => setName(value)} />

     
      

      <Text style={{
        position: 'relative',
        left: 20,
        top: 10
      }}>Gender</Text>

      <TextInput 
        placeholder='e.g. F/M/NIL' 
        value={gender}
        style={styles.input}
        onChangeText={(value) => setGender(value)} />

      {/* <RNPickerSelect
      useNativeAndroidPickerStyle={false}
      placeholder={{ label: "Select your gender", value: null}}
              onValueChange={(value) => setGender(value)}
              items={[
            { label: "F", value: "F" },
            { label: "M", value: "M" },
            { label: "NIL", value: "NIL" },
             ]}
         style={pickerSelectStyles}
      />  */}


      <Text style={{
        position: 'relative',
        left: 20,
        top: 10
      }}>Major</Text>
      <TextInput 
        placeholder='e.g. Science (no short form)' 
        value={major}
        style={styles.input}
        onChangeText={(value) => setMajor(value)} />

      <Text style={{
        position: 'relative',
        left: 20,
        top: 10
      }}>Year</Text> 
       <TextInput 
        placeholder='e.g. 1' 
        value={year}
        style={styles.input}
        onChangeText={(value) => setYear(value)} />


      {/* <RNPickerSelect
      useNativeAndroidPickerStyle={false}
      placeholder={{ label: "Select your year of study", value: null}}
                onValueChange={(value) => setYear(value)}
                items={[
                    { label: "1", value: "1" },
                    { label: "2", value: "2" },
                    { label: "3", value: "3" },
                    { label: "4", value: "4" },
                    { label: "5", value: "5" },
                    { label: "6 and above", value: "6 and above" },
                ]}
        style={pickerSelectStyles}
      /> */}

      <TouchableOpacity onPress={onSubmitPressed}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1e1ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#f6f6f6',
    borderWidth: 0.2,
    borderColor: '#777',
    padding: 15,
    margin: 15,
    width: 280,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.1,
  }, 
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#007788', 
    alignItems: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 5,
   
  },
  button: {
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#007788',
    //position: 'centre',
    left: 15,
    marginTop: 10,
    //bottom: -70,
    width: 280,
    //height: 50
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#f6f6f6',
    fontWeight: 'bold',
    fontFamily: 'RowdiesRegular', 
    fontSize: 15,
    textAlign: 'center',
  },
  parent : {
    height : '40%',
    width : '100%',
    transform : [ { scaleX : 2 } ],
    borderBottomStartRadius : 500,
    borderBottomEndRadius : 200,
    overflow : 'hidden',
    marginTop: -80
  },
  child : {
    flex : 1,
    transform : [ { scaleX : 0.5 } ],
    backgroundColor : '#007788',
    alignItems : 'center',
    justifyContent : 'center'
  },
  imageOverlay: {
   
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    backgroundColor: '#eef1e1',
    //position: 'absolute'
  },

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    // //fontSize: 14,
    // padding: 8,
    // //borderWidth: 0.5,
    // borderColor: '#777',
    // //borderRadius: 8,
    // backgroundColor: '#f6f6f6',
    // //paddingRight: 10,
    // marginBottom: 20,
    // margin: 10,
    backgroundColor: '#f6f6f6',
    borderWidth: 0.2,
    borderColor: '#777',
    padding: 15,
    margin: 15,
    width: 280,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 0.5},
    shadowOpacity: 0.1,
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  }
});
