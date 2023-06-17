import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { setStatusBarBackgroundColor } from 'expo-status-bar'

const SearchBar = () => {
  return (
    <View style={styles.container}>
        <TextInput style={styles.bar} />
     
    </View>
  )
}

const styles = StyleSheet.create({
    bar: {
        borderWidth: 0.3,
        borderColor: '#D3D3D3',
        height: 40,
        borderRadius: 40,
        backgroundColor: '#f6f6f6',
        
        


    },
    container: {
        marginTop: 10,
        // shadowColor: '#171717',
        // shadowOffset: {width: 0, height: 0},
        // shadowOpacity: 0.1,
        // shadowRadius: 2,
        // justifyContent: 'space-between',
        // alignContent: 'space-evenly',
        // backgroundColor: 'pink'
        
        
        

    }
})
export default SearchBar;