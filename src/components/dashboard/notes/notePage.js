import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'


const NotePage = ({ item, onPress }) => {
    const {title, description} = item;
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text style={styles.desc} numberOfLines={5}>{description}</Text>
    </TouchableOpacity>
  )
}

const width = Dimensions.get('window').width - 40;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: width / 2 - 10,
        padding: 8,
        borderRadius: 10,
        marginTop: 20,
        //borderColor: '#D3D3D3',
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 3,
       // alignContent: 'space-between'

    },
    title: {
        color: '#007788',
        fontWeight: 'bold',
        fontSize: 17
    },
    desc: {
        color: '#007788'
    }
})

export default NotePage