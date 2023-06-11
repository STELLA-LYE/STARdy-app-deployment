import React, { Component, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  FlatList,
} from 'react-native'


export default Friends = () => {

   showAlert = () => Alert.alert('Request', 'Sending your request!' )

  const optionList = [
    {
      id: 1,
      color: '#007788',
      icon: 'https://bootdey.com/img/Content/avatar/avatar5.png',
      name: 'Friend 1',
      tags: ['M', 'unmatched'],
    },
    {
      id: 2,
      color: '#007788',
      icon: 'https://bootdey.com/img/Content/avatar/avatar2.png',
      name: 'Friend 2',
      tags: ['M', 'unmatched'],
    },
    {
      id: 3,
      color: '#007788',
      icon: 'https://bootdey.com/img/Content/avatar/avatar3.png',
      name: 'Friend 3',
      tags: ['F', 'unmatched'],
    },
    {
      id: 4,
      color: '#007788',
      icon: 'https://bootdey.com/img/Content/avatar/avatar7.png',
      name: 'Friend 4',
      tags: ['M', 'unmatched'],
    },
  ]

  const [options, setOptions] = useState(optionList)
  const [query, setQuery] = useState()

  const cardClickEventListener = item => {
    Alert.alert(item.name)
  }

  const tagClickEventListener = tagName => {
    if (tagName == 'matched') {
      Alert.alert('User is already matched, unable to send request!')
    } else {
      Alert.alert(tagName)
    }
  }


  const renderTags = item => {
    return item.tags.map((tag, key) => {
      return (
        <TouchableOpacity
          key={key}
          style={styles.btnColor}
          onPress={() => tagClickEventListener(tag)}>
          <Text>{tag}</Text>
        </TouchableOpacity>
      )
    })
  }

  return (
    <View style={styles.container}>
    
      <FlatList
        style={styles.notificationList}
        data={options}
        keyExtractor={item => {
          return item.id
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={[styles.card, { borderColor: item.color }]}
              onPress={() => {
                cardClickEventListener(item)
              }}>
              <View style={styles.cardContent}>
                <Image style={[styles.image, styles.imageContent]} source={{ uri: item.icon }} />
                <Text style={styles.name}>{item.name}</Text>

                <TouchableOpacity
                  style={[styles.button, styles.profile]}
                  onPress={showAlert}>
                  <Text style={styles.buttonText}>Request</Text>
                </TouchableOpacity>

              </View>
              
              <View style={[styles.cardContent, styles.tagsContent]}>{renderTags(item)}</View>
            </TouchableOpacity>
          )
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1e1',
    //marginBottom: 100, 
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  card: {
    height: null,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth: 40,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  tagsContent: {
    marginTop: 10,
    flexWrap: 'wrap',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: '#eee',
    marginTop: 5,
  },
   button: {
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 80,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 5,
    color: '#f6f6f6', 
  },
   profile: {
    backgroundColor: '#007788',
  },
  buttonText: {
    color: '#f6f6f6',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

                  