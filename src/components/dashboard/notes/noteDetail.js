import { View, Text, StyleSheet, TouchableOpacity , Alert} from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';

import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNotes } from '../../../context/noteProvider'
import NoteInputModal from './noteInputModal';
import { authentication } from '../../../../config';


const formatDate = (ms) => {
    const date = new Date(ms);
    const day = date.getDate()
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hrs = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const time = date.getUTCDate();

    //return `${day}/${month}/${year} - ${hrs}:${min}:${sec}`
    return `${day}/${min}/${sec} - ${time}`


}

const NoteDetail = (props) => {
    const [note, setNote] = useState(props.route.params.note);
    const {setNotes} = useNotes();
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const deleteNote = async () => {
        const result = await AsyncStorage.getItem(authentication.currentUser.uid + '/notes')
        let notes = []
        if (result != null) notes = JSON.parse(result)

        const newNotes = notes.filter(n => n.id != note.id)
        setNotes(newNotes);
        await AsyncStorage.setItem(authentication.currentUser.uid + '/notes', JSON.stringify(newNotes))
        props.navigation.goBack();
    }

    const deleteNoteAlert = () => {
        Alert.alert('Are You Sure?', 'This action will delete your note permanently!', [
            {
                text: 'Delete',
                onPress : () => deleteNote()
            },
            {
                text: 'No Thanks',
                onPress: () => console.log('no thanks'),
            }
        ])
    }

    const editNote = () => {
        setShowModal(true)
        setIsEdit(true);
    }

    const handleUpdate = async (title, desc, time) => {
        const result = await AsyncStorage.getItem(authentication.currentUser.uid + '/notes')
        let notes = [];
        if (result != null) notes = JSON.parse(result);

        const newNotes = notes.filter(n => {
            if (n.id == note.id) {
                n.title = title
                n.description = desc
                n.isUpdated = true
                n.time = time

                setNote(n)
            }
            return n;
        })
        setNotes(newNotes);
        await AsyncStorage.setItem(authentication.currentUser.uid + '/notes', JSON.stringify(newNotes));
    }

    const handleOnClose = () => setShowModal(false)

   

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.time}>{note.isUpdated ? `Updated At ${formatDate(note.time)}`:`Created At ${formatDate(note.time)}`}</Text>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.description}>{note.description}</Text>

      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={deleteNoteAlert} style={{backgroundColor: '#f94449', ...styles.button}}>
            <FontAwesome name="trash-o" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={editNote} style={{backgroundColor: '#007788', ...styles.button}}>
            <MaterialIcons name="edit" size={24} color="white" />
        </TouchableOpacity>
        

      </View>
      <NoteInputModal isEdit={isEdit} note={note}onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10
    }, 
    title: {
        fontSize: 30,
        color: '#007788',
        fontWeight: 'bold'
    },
    description: {
        fontSize: 20,
        opacity: 0.6,
    },
    time: {
        textAlign: 'right',
        fontSize: 12,
        opacity: 0.5
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        //backgroundColor: '#007788',
        borderRadius: 45 /2,
        width: 45,
        height: 45,
        marginBottom: 12
       
    },
    btnContainer: {
        position: 'absolute',
        right: 20,
        bottom: 50
    }
})

export default NoteDetail