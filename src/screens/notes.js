import { View, Text, StyleSheet, Alert, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Entypo } from '@expo/vector-icons';

// import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import SearchBar from '../components/dashboard/notes/searchBar';
import NotePage from '../components/dashboard/notes/notePage';

import { useNotes } from '../context/noteProvider'
import { authentication } from '../../config';

import AsyncStorage from '@react-native-async-storage/async-storage';
import NoteInputModal from '../components/dashboard/notes/noteInputModal';
import { FlatList } from 'react-native-gesture-handler';



const Notes = ({navigation}) => {

  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  // const {notes, setNotes} = useNotes();
  const [notes, setNotes] = useState([])
  

  const addNotes = () => {
    setModalVisible(true);
  }
  
  const handleOnSubmit = async (title, description) => {
    const note = {id: Date.now(), title, description, time: Date.now() }
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    await AsyncStorage.setItem(authentication.currentUser.uid + '/notes', JSON.stringify(updatedNotes))
  }

  const openNote = (note) => {
    navigation.navigate('NoteDetail', {note})
  }

  const findNotes = async () => {
    const result = await AsyncStorage.getItem(authentication.currentUser.uid + '/notes');
    if(result !== null) setNotes(JSON.parse(result))
  }

  useEffect(() => {
    findNotes()
  }, [])


  return (

    <View style={styles.container}>

      {/* {notes.length 
        ? <SearchBar 
        // backgroundColor='#fbfbfb' 
        // borderRadius='10'
        // placeholder='Search Notes...'
        // value={search}
        // onChangeText={(value) => setSearch(value)}
        // textAlign='center'
       
        />
      : null }
       */}

        <FlatList 
          data={notes} 
          numColumns={2}
          columnWrapperStyle={{ 
            justifyContent: 'space-between',
            flexDirection: 'row',
            //alignContent: 'space-between',
            }}
          keyExtractor={item => item.id.toString()} 
          renderItem={({ item }) => <NotePage onPress={() => openNote(item)} item={item} />}
          />

      {/*!notes.length*/ true ? <View style={styles.emptyHeaderContainer}>
        <Text style={styles.emptyHeader}>Click the + button to add notes!</Text>
      </View> : null}
      

      <TouchableOpacity style={styles.button} onPress={addNotes}>
        <Entypo name="plus" size={42} color="white" />
      </TouchableOpacity>

      <NoteInputModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        onSubmit={handleOnSubmit}
        />
    </View>
    
  )
}

export default Notes;


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    //flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: '#eef1e1',
    flex: 1,
    paddingHorizontal: 20,
    alignContent: 'space-between'

  },
  notes: {
    fontSize: 14,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    minHeight: 70,
    margin: 10,
    width: 365,
    justifyContent: 'center',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    color: '#007788',
    fontSize: 17,
    paddingVertical: 5,
 
  },
  content: {
    color: '#555'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007788',
    borderRadius: 55 /2,
    width: 55,
    height: 55,
    position: 'absolute',
    right: 15,
    bottom: 45
  },
  searchBar: {
    borderWidth: 0.5,
    backgroundColor: '#f6f6f6',
    borderRadius: 10,
    borderColor: '#D3D3D3',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  emptyHeader: {
    fontSize: 20,
    // textTransform: 'uppercase',
    fontWeight: 'bold',
    opacity: 0.2,
  },
  emptyHeaderContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    zIndex: -1
  }
})