import { StyleSheet, Text, View, Button} from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import { addDoc, collection, serverTimestamp , doc, onSnapshot, query, orderBy, setDoc} from 'firebase/firestore';
import { db, authentication} from '../../config';

export default function Chat({route, navigation}) {
  console.log('route ' + route);
  const uid = route.params.uid
  const userAvatar = route.params.userAvatar
  const [messages, setMessages] = useState([]);
  const currentUser = authentication?.currentUser?.uid;

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: 'Hello developer',
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: 'React Native',
  //         avatar: 'https://placeimg.com/140/140/any', https://bootdey.com/img/Content/avatar/avatar1.png
  //       },
  //     },
  //   ])
  // }, [])

  useEffect(() => {
    const chatId = uid > currentUser ? `${uid + '-' + currentUser}` : `${currentUser + '-' + uid}`;
    const docref = doc(db, 'chatrooms', chatId);
    const colRef = collection(docref, 'messages');
    const q = query(colRef, orderBy('createdAt',"desc"));
    const unsubcribe = onSnapshot(q, (onSnap) => {
      const allMsg = onSnap.docs.map(mes => {
        if(mes.data().createdAt){
          return{
            ...mes.data(),
            createdAt:mes.data().createdAt.toDate()
          }
        }else{
          return{
            ...mes.data(),
            createdAt:new Date()
          }
        }
        

      })
      setMessages(allMsg)

    })

      return () => {
        unsubcribe()
      }
  },[])

  const onSend = useCallback((messagesArray) => {
    const msg = messagesArray[0];
    // console.log(myMsg)
    const myMsg = {
      ...msg,
      sentBy:currentUser,
      sentTo:uid
//chatrooms/1233438485/messages/123/msg, createdat
    }
    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))
    const chatId = uid > currentUser ? `${uid + '-' + currentUser}` : `${currentUser + '-' + uid}`;


    const docref = doc(db, 'chatrooms', chatId);
    const colRef = collection(docref, 'messages');
    const chatSnap = addDoc(colRef, {
      ...myMsg,
      createdAt:serverTimestamp(),
    })

    // handleRequest = (item) => {
    //   setIsRequesting(item.id);
    //   const docRef = doc(db, "requests", item.id, "userRequests", authentication.currentUser.email);
    //   setDoc(docRef, {
    //     accepted: false,
    //     name: name,
    //     gender: gender,
    //     year: year,
    //     major: major,
    //     photoURL: photoURL      
    //   })
    // }

  }, [])
  return (
    <View style={styles.container}>

      <Button
        onPress={() => navigation.navigate('Home')}
        title='back'
        />

    <GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      user={{
        _id: currentUser,
        //avatar: userAvatar, 
      }}
    />

    </View>
  )
}


const styles = StyleSheet.create({
  container:{
      flex:1
  },
  btn:{
      marginTop:10
  }
})