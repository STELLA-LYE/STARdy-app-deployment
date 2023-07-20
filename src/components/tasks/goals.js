import {React, useState, useEffect, useCallback} from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Alert} from 'react-native';
import { Octicons } from '@expo/vector-icons'; 

import { authentication } from '../../../config';
import { doc, setDoc, addDoc, collection} from "firebase/firestore"; 
import { db } from '../../../config';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Goals = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [goalscheck, setGoalscheck] = useState(false); 
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
    const date = await AsyncStorage.getItem('DATE');
  }

  // useEffect(() => {
  //   setCurrentDate(
  //     new Date().getDate() +
  //       '/' +
  //       (new Date().getMonth() + 1) +
  //       '/' +
  //       new Date().getFullYear(),
  //   );

  //   getSavedDate();
  // }, []);

  // const saveDate = async () => {
  //   await AsyncStorage.setItem(
  //     'DATE',
  //     new Date().getDate() +
  //       '/' +
  //       (new Date().getMonth() + 1) +
  //       '/' +
  //       new Date().getFullYear(),
  //   );
  // };

  // const getSavedDate = async () => {
  //   const date = await AsyncStorage.getItem('DATE');
  // }


  // useEffect(() => {
  //   setCurrentTime(
  //     new Date().getHours() + ':' + new Date().getMinutes()
  //   );
  // }, []);

  // useEffect(() => {
  //   setGoalscheck(true)
  // }, []);


  const uploadCheckIn = () => {

    // let currentime = new Date().getHours() + ':' + new Date().getMinutes();
    // setCurrentTime(currentime); 
    // setGoalscheck(true); 

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

    setGoalscheck(true)
   
    setDoc(doc(db, "Goals check", authentication.currentUser.email), {
      goalscheck: goalscheck, 
      currentDate: currentDate, 
      currentTime: currentTime,  
    }).then(() => {
      // data saved successfully
      console.log('goals completed' + Date.now());
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
        }}>
        {'Date: ' + date}
      </Text>

      <Octicons name="checklist" size={120} color="#007788" marginTop={60} marginBottom={50} />
      <Text
        style={{
          fontSize: 16,
          color: 'black',
          marginTop: 20,
          textAlign: 'center'
        }}>
        Only 'COMPLETE' this task once per focus session  
      </Text>

      <Text
        style={{
          fontSize: 16,
          color: '#007788',
          marginTop: 20,
          textAlign: 'center'
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
            height: 70,
            backgroundColor: '#007788',
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: 70,
            borderRadius: 10,
          }}
          onPress={() => {
            setGoalscheck(true); 
            uploadCheckIn(); 
          }}>
          <Text style={{color: '#fff', fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Double tap to COMPLETE</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default Goals;

const styles = StyleSheet.create({
image: {
  width: 150,
  height: 150,
  position: 'absolute',
  top: '18%'
}
}); 
