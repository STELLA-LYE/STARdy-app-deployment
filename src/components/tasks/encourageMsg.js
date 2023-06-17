import { FontAwesome5 } from '@expo/vector-icons'; 
import {React, useState, useEffect, useCallback} from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import { Octicons } from '@expo/vector-icons'; 

import { authentication } from '../../../config';
import { doc, setDoc, addDoc, collection, getDoc} from "firebase/firestore"; 
import { db } from '../../../config';

import { useFocusEffect } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const EncourageMessage = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [msgcheck, setMsgcheck] = useState(false); 
  const [currentTime, setCurrentTime] = useState('');
  const [date, setDate] = useState('');
  // const [check, setCheck] = useState(''); 

  useEffect(() => {
    setDate(
      new Date().getDate() +
        '/' +
        (new Date().getMonth() + 1) +
        '/' +
        new Date().getFullYear(),
    );

    getSavedDate();
  }, []);

  const getSavedDate = async () => {
    const date = await AsyncStorage.getItem(authentication.currentUser.uid, 'DATE');
  }


  // useEffect(() => {
  //   setCurrentTime(
  //     new Date().getHours() + ':' + new Date().getMinutes()
  //   );
  // }, []);

  // useEffect(() => {
  //   setMsgcheck(true)
  // }, []);

  const uploadCheckIn = () => {

    setCurrentDate(
      new Date().getDate() +
        '/' +
        (new Date().getMonth() + 1) +
        '/' +
        new Date().getFullYear(),
    );

    setCurrentTime(
      new Date().getHours() + ':' + new Date().getMinutes()
    );

    setMsgcheck(true)
   
    setDoc(doc(db, "Encouragemsg check", authentication.currentUser.email), {
      msgcheck: msgcheck, 
      currentDate: currentDate, 
      currentTime: currentTime, 
    }).then(() => {
      // data saved successfully
      console.log('Encouragement message completed' + Date.now());
    }).catch((error) => {
      //the write failed
      console.log(error)
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#eef1e1', alignItems: 'center', justifyContent: 'center', marginTop: -200}}>
  
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#007788',
          marginTop: 20,
          marginLeft: 20,
        }}>
        {'Date: ' + date}
      </Text>

      <FontAwesome5 name="hands-helping" size={150} color="#007788" marginTop={60} marginBottom={50}/>
      <Image source={require('../../../assets/star-icon.png')} style={styles.image} />
      <Text
        style={{
          fontSize: 16,
          color: 'black',
          marginTop: 20,
          marginLeft: 20,
        }}>
        Do only 'COMPLETE' this task once per focus session  
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: '#007788',
          marginTop: 20,
          marginLeft: 20,
        }}>
        Completed your recent task on {currentDate}, {currentTime} 
      </Text>

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
            width: '60%',
            height: 50,
            backgroundColor: '#007788',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 50,
            borderRadius: 10,
          }}
          onPress={() => {
            uploadCheckIn();
          }}
          >
          <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold' }}> double tap to COMPLETE </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default EncourageMessage;

const styles = StyleSheet.create({
image: {
  width: 150,
  height: 150,
  position: 'absolute',
  top: '18%'
}
}); 
