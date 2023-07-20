import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';



import TodoItem from '../components/dashboard/todoItem';
import AddTodo from '../components/dashboard/addTodo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authentication } from '../../config';


export default function Todo() {
  const [todos, setTodos] = useState([]);

  // const pressHandler = async (key) => {
  //   const newTodos = prevTodos => {
  //     return prevTodos.filter(todo => todo.key != key);
  //   }
  //   const updatedToDos = [...todos, newTodos]
  //   setTodos(updatedToDos);
  //   await AsyncStorage.setItem(authentication.currentUser.uid + '/todos', JSON.stringify(updatedToDos));
  // };

  const pressHandler = (key) => {
    setTodos(prevTodos => {
      return prevTodos.filter(todo => todo.key != key);
    });
  };

  const submitHandler = (text) => {
    if(text.length > 3){
      setTodos(prevTodos => {
        return [
          { text, key: Math.random().toString() },
          ...prevTodos
        ];
      });
    } else {
      Alert.alert('OOPS', 'Todo must be over 3 characters long', [
        {text: 'Understood', onPress: () => console.log('alert closed') }
      ]);
    }
  };
  // const updatedNotes = [...notes, note];
  // setNotes(updatedNotes);
  // await AsyncStorage.setItem(authentication.currentUser.uid +'/notes', JSON.stringify(updatedNotes))

  // const submitHandler = async (text) => {
  //   if(text.length > 3){
  //     // setTodos(prevTodos => {
  //     //   return [
  //     //     { text, key: Math.random().toString() },
  //     //     ...prevTodos
  //     //   ];
  //     // });

  //     const updatedTodos = prevTodos => {
  //       return [
  //         { text, key: Math.random().toString() },
  //         ...prevTodos 
  //       ]
  //     }
  //     setTodos(updatedTodos);
  //     await AsyncStorage.setItem(authentication.currentUser.uid + '/todos', JSON.stringify(updatedTodos));
  //   } else {
  //     Alert.alert('OOPS', 'Todo must be over 3 characters long', [
  //       {text: 'Understood', onPress: () => console.log('alert closed') }
  //     ]);
  //   }
  // };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed');
    }}>
      <View style={styles.container}>
        <View style={styles.content}>
          <AddTodo submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={todos}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1e1',
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});