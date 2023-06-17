import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity} from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { GiftedChat, Bubble, Send} from 'react-native-gifted-chat'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { addDoc, collection, serverTimestamp , doc, onSnapshot, query, orderBy, getDoc} from 'firebase/firestore';
import { db, authentication} from '../../config';

export default function Chat({route, navigation}) {
  console.log('route ' + route);
  const uid = route.params.uid
  console.log('user id ' + uid);
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

  //userAvatar 
  const [photoURL, setPhotoURL] = useState(null);

  const docRef = doc(db, "users", authentication.currentUser.email);
  useFocusEffect(
    useCallback(() => {
        getDoc(docRef)
            .then((doc) => {
              setPhotoURL(doc.get('photoURL'))
                console.log(Date.now())
            })    
     }, [])
)

//chat backend 
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
  }, [])


  //Chat UI 

  const scrollToBottomComponent = () => {
    return(
      <FontAwesome name='angle-double-down' size={22} color='#333' />
    );
  }

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#007788"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#007788',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };



  return (
    <View style={styles.container}>

      {/* <Button
        onPress={() => navigation.navigate('Home')}
        title='back'
        /> */}

    <GiftedChat
      messages={messages}
      onSend={text => onSend(text)}
      showAvatarForEveryMessage={true}
      showUserAvatar={true}
      user={{
        _id: currentUser,
        avatar: photoURL, 
      }}

      renderSend={renderSend}
      renderBubble={renderBubble}
      alwaysShowSend
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />

    </View>
  )
}


const styles = StyleSheet.create({
  container:{
      flex:1, 
      backgroundColor: '#eef1e1', 
      marginBottom: 20, 
  },
  btn:{
      marginTop:10
  }
})