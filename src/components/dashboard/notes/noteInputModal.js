import { View, Text, StyleSheet, Modal, StatusBar, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, {useState} from 'react'
import { TextInput } from 'react-native-gesture-handler'

import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from 'react';


const NoteInputModal = ({ visible, onClose, onSubmit, note, isEdit}) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const closeModal = () => {
        if(!isEdit) {
            setTitle('');
            setDescription('')
        }
        onClose();
    }

    useEffect(() => {
        if(isEdit) {
            setTitle(note.title)
            setDescription(note.description)
        }
    }, [isEdit])

    const handleOnChangeText = (text, valueFor) => {
        if(valueFor === 'title') setTitle(text);
        if(valueFor == 'description') setDescription(text);
    };

    const handleSubmit = () => {
        if(!title.trim() && !description.trim()) return onClose();

        if(isEdit) {
            onSubmit(title, description, Date.now());

        } else {
            onSubmit(title, description);
            setTitle('');
            setDescription('');
        }
       
        onClose();
    };
    
  return (
    <>
        <StatusBar hidden />
        <Modal visible={visible} animationType='fade' presentationStyle='pageSheet'>
            <View style={styles.container}>
                <TextInput 
                    value={title}
                    onChangeText={(text) => handleOnChangeText(text, 'title')} 
                    placeholder='title' 
                    style={[styles.input, styles.title]}/>
                <TextInput 
                    value={description}
                    multiline
                    placeholder='note' 
                    style={[styles.input, styles.description]}
                    onChangeText={(text) => handleOnChangeText(text, 'description')}
                    />
                <View style={styles.btnContainer}>
                    <Feather name="check" size={30} color="#007788" onPress={handleSubmit} />
                    {title.trim() || description.trim() 
                        ?  (<Feather name="x" size={30} color="#007788" onPress={closeModal}/> ) 
                        : null}
                </View>
        

            </View>
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}></View>

            </TouchableWithoutFeedback>
            
        </Modal>
    </>
    
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
        zIndex: 1
    

    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#007788',
        fontSize: 20,
        color: 'black',
        paddingHorizontal: 15,
      
      
    },
    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold'
    },
    description: {
        height: 400,
    },
    modalBG: {
        flex: 1,
        zIndex: -1,

    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15
    }
})

export default NoteInputModal