import { MaterialIcons } from '@expo/vector-icons'; 
import {React, useState, useEffect, useCallback} from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator} from 'react-native';
import { Octicons } from '@expo/vector-icons'; 

import { authentication } from '../../../config';
import { doc, setDoc, addDoc, collection, getDoc} from "firebase/firestore"; 
import { db } from '../../../config';
import { saveUserEvidence } from '../../services/user';

import * as ImagePicker from 'expo-image-picker';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

const Evidence = ({route, navigation}) => {

    const { otherUserID, otherUser } = route.params;
    const currentUser = authentication.currentUser.uid
    const [taskName, setTaskName] = useState('');
    const [startDate, setStartDate] = useState(0);
    const { otherUserEmail } = route.params;
    const [evidenceUploaded, setEvidenceUploaded] = useState(true);

  const [currentDate, setCurrentDate] = useState('');
  const [evicheck, setEvicheck] = useState(false); 
  const [currentTime, setCurrentTime] = useState('');

 

  // everytime user opens the evidence page, it will store the user start date
  useEffect(() => {
    const docRef = doc(db, "users", authentication.currentUser.email);
      
    getDoc(docRef)
      .then((doc) => {
          const s = doc.get('start')
          console.log(doc.get('start'))
          setStartDate(s)
          console.log('start: ' + startDate)
        
        }) 
  }, []);



  const uploadEvidence = async () => {
    
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        })
    
        //console.log(result.assets[0].uri);

        //get current date when user is uploading
        const currentDate = new Date().getDate();
        const expectedSubmissionDate = startDate + 1;
    
        if (!result.canceled) {
          setEvidenceUploaded(false);
          if (currentDate <= expectedSubmissionDate) {
            console.log("starttt " + startDate)
            console.log("on time")
            //setOnTime(true);
            await saveUserEvidence(result.assets[0].uri, otherUserID, taskName)
            .then(() => setEvidenceUploaded(true))
          } else {
            //setOnTime(false)
            Alert.alert("You've missed the deadline!", 
              [{
                text: 'OK',
                onPress: () => {
                  console.log('missed')
                  navigation.navigate('Main Tab')
                } 
              }])
          }
        }
  }

  const finalize = async () => {

      const usersRef = doc(db, "users", authentication.currentUser.email);
      await setDoc(usersRef, {
        matched: false,
      }, { merge: true})

      Alert.alert("Another successful day!", 
        "Wait patiently for your XP as your partner verifies your evidence, in the meantime, feel free to start another focus session!",
        [{
            text: 'OK',
            onPress: () => {
                console.log('ok pres')
                navigation.navigate('Main Tab')
            }
        }] )
    
    
  }

//   useEffect(() => {
//     Alert.alert('Uploaded!')
//     setEvidenceUploaded(null);
//   }, [evidenceUploaded])

  return (
    <View style={{flex: 1, backgroundColor: '#eef1e1', alignItems: 'center', justifyContent: 'center', marginTop: -200}}>
  
      
      

      <View style={{
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginTop: 100
      }}>
        <Image source={require('../../../assets/star-icon.png')} style={styles.image} />
        <Text
            style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#007788',
            }}>
            {'Due 23:59'}
        </Text>

      </View>

      <View style={{
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: 'white'
      }}>

      <Text style={{fontSize: 20}}>Enter name of task:</Text>
      <TextInput 
        style={styles.input}
        onChangeText={(value) => setTaskName(value)} />
      <TouchableOpacity onPress={uploadEvidence}>



        <Text style={{
            fontSize: 20
        }}>Click to Upload Your Evidence!</Text>

        {evidenceUploaded
            ? <MaterialIcons name="send-to-mobile" size={150} color="#007788" marginLeft={55} marginTop={10}/> 
            : 
            <View style={{
                marginTop: 40,
                justifyContent: 'center',
            }}>
                <ActivityIndicator color='#007788'/>   
            </View>
            }

      </TouchableOpacity>

      </View>
      

     
      

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          height: 60,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: '40%',
            height: 50,
            backgroundColor: evicheck ? 'gray': '#007788',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 50,
            borderRadius: 10,
          }}
          onPress={finalize}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Submit</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Evidence;

const styles = StyleSheet.create({
image: {
  width: 150,
  height: 150,
  position: 'absolute',
  top: -150
},
input: {
    backgroundColor: '#f6f6f6',
    //borderWidth: 0.5,
    borderColor: '#777',
    padding: 8,
    margin: 10,
    width: 300,
    marginBottom: 20,
    //borderRadius: 8
  },
}); 