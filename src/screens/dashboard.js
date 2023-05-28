import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ProfileCard from '../components/dashboard/profileCard';
import Buttons from '../components/dashboard/buttons';
import ProgressBar from '../components/dashboard/progressBar';
import Requests from '../components/dashboard/requests';

export default function Dashboard({ navigation }) {



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


