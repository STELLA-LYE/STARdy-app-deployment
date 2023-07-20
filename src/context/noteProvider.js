import { View, Text } from 'react-native'
import React, { Children, useEffect, useContext, useState, createContext } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { authentication } from '../../config';

const NoteContext = createContext();
const NoteProvider = ({children}) => {
    const [notes, setNotes] = useState([]);

    const findNotes = async () => {
        const result = await AsyncStorage.getItem(authentication.currentUser.uid + '/notes');
        if(result != null) setNotes(JSON.parse(result))
      }

    useEffect(() => {
        findNotes();
      }, [])
    
    
      
  return (
    <NoteContext.Provider value={{notes, setNotes, findNotes}}> 
        {children}
    </NoteContext.Provider>
  )
}

export const useNotes = () => useContext(NoteContext);
export default NoteProvider