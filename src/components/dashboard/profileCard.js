import {React, useState, useEffect} from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'; 

import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import ProgressBar from './progressBar';

import { db } from '../../../config';
import { doc, getDoc, get, connectFirestoreEmulator} from "firebase/firestore";

const ProfileCard = ({ nav }) => {

    const editProfile = () => {
        nav.navigate('Edit Profile');
    }

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0
        });

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        } 
    };

    const[name, setName] = useState('Ariella Callista')
    const[major, setMajor] = useState('Computer Science')
    const[year, setYear] = useState('Year 2')
    const[gender, setGender] = useState('F')

    const docRef = doc(db, "users", "user");

    getDoc(docRef)
        .then((doc) => {
            setName(doc.get('name'))
            setMajor(doc.get('major'))
            setYear(doc.get('year'))
            setGender(doc.get('gender'))
            // console.log(doc.get('name'));
            // console.log(doc.data(), doc.id)
        })   

    return (
        
        <View style={{
            height: 190,
            marginHorizontal: 15,
            paddingHorizontal: 6,
            paddingVertical: 18,
            backgroundColor: '#eef1e1',
            borderWidth: 1,
            borderColor: '#007788',
            //borderRadius: 10,
            //backgroundColor: '#',
        }}>
            
            <View style={{
                //backgroundColor: 'pink',
                // flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: 70,
                marginRight: 5
            }}>
                <View style={{
                    //flex:1,
                    //backgroundColor: 'pink',
                    width: 90,
                    height: 90,
                    borderRadius: 90 /2,
                   
                }}>
                    <TouchableOpacity onPress={pickImage}>
                        <FontAwesome name='user-circle-o' size={75} color='#007788' />
                        <Image source={{uri: image}} style={{
                            width: 75,
                            height: 75,
                            borderRadius: 75 /2,
                            position: 'absolute'
                        }} />
                    </TouchableOpacity>
                </View>
                    
                
                
                <View style={{
                    //backgroundColor: '#f6f6f6',
                    flexDirection: 'column',
                    flex: 1,
                    marginLeft: -10
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={{flexDirection: 'column'}}>
                            <Text style={{
                                fontWeight: 'bold',
                                fontSize: 22,
                                marginLeft: 12,
                                //color: '#007788'
                            }}>{ name }</Text>
                        </View>

                        <View style={{
                            marginRight: 12
                        }}>
                            <TouchableOpacity onPress={editProfile}>
                                <Feather name='edit' size={20} color={'#007788'} />
                            </TouchableOpacity>
                            
                        </View>
                    
                    </View>

                    

                </View>
            </View>

            <View style={{
                height: 50,
                //backgroundColor: 'coral',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <View style={{
                    width: 200,
                    //backgroundColor: 'green',
                    flexDirection: 'row'
                }}>
                    <View style={{
                    //backgroundColor: '#FFF9E8',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingRight: 15,
                    left: 9 }}>
                        <Text style={styles.caption}>{major}</Text> 
                    </View>

                    <View style={{
                        //backgroundColor: '#FFF9E8',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                    }}>
                        <Text style={styles.caption}>{year}</Text> 
                    </View>

                    <View style={{
                        //backgroundColor: '#FFF9E8',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        
                    }}>
                        <Text style={styles.caption}>{gender}</Text> 
                    </View>

                </View>

                

                
            </View>

            <View style={{
                //backgroundColor: 'white',
                flex: 1,
                marginTop: -6
            }}>
                <ProgressBar />

            </View>

        </View>
    )
}

const styles=StyleSheet.create({
    caption: {
        fontSize: 16,
        //color: '#007788'
    }
})

export default ProfileCard;

