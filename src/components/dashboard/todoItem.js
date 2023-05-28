import React from 'react'
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function TodoItem({ pressHandler, item }) {
  return (
    <TouchableOpacity onPress={() => pressHandler(item.key)}>
     <View style={styles.item}>
        <AntDesign name='star' size={18} color='#007788' />
        <Text style={styles.itemText}>{item.text}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
item: {
  padding: 16,
  marginTop: 16,
  borderColor: '#bbb',
  borderWidth: 1,
  borderStyle: "solid",
  borderRadius: 1,
  borderRadius: 10,
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#f6f6f6', 
  },
  itemText: {
    marginLeft: 10,
  }
});