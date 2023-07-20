import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileCard from '../components/dashboard/profileCard';
import Buttons from '../components/dashboard/buttons';
import ProgressBar from '../components/dashboard/progressBar';
import Requests from '../components/dashboard/requests';
import { useEffect } from 'react';

import { db, authentication } from '../../config';

import { doc, getDoc, get, where, Filter, getDocs, query, collection, setDoc, orderBy, limit} from "firebase/firestore";
import { updateAttendeeAsync } from 'expo-calendar';

export default function Dashboard({ navigation }) {

    // rank user and friends for leaderboard
    useEffect(() => {
        const globalRef = collection(db, "users")
        const globalQuery = query(globalRef, orderBy("xp"), limit(20));

        getDocs(globalQuery).then(function(querySnapshot) {
            let rank = 1;
            querySnapshot.forEach(function(doc) {
                setDoc(doc.ref, {
                    rank: rank
                }, { merge: true })
                rank++;
            })
        })

        const friendsRef = collection(db, "friends", authentication.currentUser.email, "userFriends")
        const friendsQuery = query(friendsRef, orderBy("xp"), limit(20));

        getDocs(friendsQuery).then(function(querySnapshot) {
            let rank = 1;
            querySnapshot.forEach(function(doc) {
                setDoc(doc.ref, {
                    rank: rank
                }, { merge: true })
                rank++;
            })
        })
    })

    return (
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#eef1e1',
            paddingTop: 10
        }}>
            <View style={{flex: 1}}>
                <ProfileCard nav={navigation} />
                <Requests />
                <Buttons nav={navigation} />
                
            </View> 
        </SafeAreaView>

        
    );
}

const styles=StyleSheet.create({
    
})


