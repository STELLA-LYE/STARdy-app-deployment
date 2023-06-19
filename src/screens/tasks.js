import { StyleSheet, Text, View, Button, Image, Modal, TouchableWithoutFeedback, FlatList} from 'react-native'
import React, { useState, useCallback, useEffect } from 'react'
import { GiftedChat, Bubble, Send, RenderMessageImageProps } from 'react-native-gifted-chat'
import { addDoc, collection, serverTimestamp , doc, onSnapshot, query, orderBy, setDoc, getDoc} from 'firebase/firestore';
import { db, authentication} from '../../config';
import { Icon } from '@rneui/themed';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { saveMediaToStorage } from '../services/random';
import { saveUserProfileImage, saveUserChatImage } from '../services/user';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Tasks({route, navigation}) {
  const currentUser = authentication?.currentUser?.uid;
  const uid = route.params.uid
  const email = route.params.email

  const items = [
    {
      id: 1,
      name: 'Task 1',
      task: 'Set your goals for the day!',
      details: 'Note down your goals and send it to your accountability partner', 
      Due: 'Deadline: 23:59 today', 

    },
    {
      id: 2,
      name: 'Task 2',
      task: 'Send the evidences!',
      details: 'Send evidences of completion of your goals to your accountability partner via the chat feature. Note: send the evidences in the form of google drive links', 
      Due: 'Deadline: 23:59 today'
    },
    {
      id: 3, 
      name: 'Task 3',
      task: 'Encouragement message!',
      details: '(optional)leave an encouragement message for you accountability partner via the chat feature', 
      Due: 'Deadline: (recommended) 23:59 today'
    },
    {
      id: 4,
      name: 'Task 4',
      task: 'Verification!',
      details: 'verify the evidence sent by your accountability partner', 
      Due: 'Deadline: 23:59 the next day'
    },
    
    
    
  ]
  

  function doTasks(item) {
    if (item.id == 1) {
      return ()=> navigation.navigate('Goals');  
    } else if (item.id == 2) {
      return ()=> navigation.navigate('Evidence', {otherUserID: uid, otherUserEmail: email, currentUser: authentication.currentUser.uid });
    } else if (item.id == 3) {
      return ()=> navigation.navigate('Encouragement Msg'); 
    } else {
      return ()=> navigation.navigate('Verify',{otherUserEmail: email, otherUserID: uid,});  
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.title}>FocusSession Guidelines</Text>
      
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.item}>
              
              <View style={styles.itemContent}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemTask}>{item.task}</Text>
                <Text style={styles.itemDue}>{item.details}</Text>
                <Text style={styles.itemDue}>{item.Due}</Text>
              </View>
            </View>

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button} onPress={doTasks(item)}>
                <Text style={styles.buttonText}> check </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1e1', 
  },
  card: {
    marginHorizontal:20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
    marginTop: 10
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemContent: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007788',  
    // backgroundColor: '#007788', 
    // color: '#fff', 
    // alignItems: 'center'
  },
  itemTask: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10, 
  },
  title: {
    fontSize: 20,
    color: '#007788',
    fontWeight: 'bold',
    alignSelf: 'center', 
    marginBottom: 10, 
    marginTop: 15, 
  },
  itemDue: {
    fontSize: 16,
    color: '#999',
    marginBottom: 10, 
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#007788',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})



// import { StyleSheet, Text, View, Button, Image, Modal, TouchableWithoutFeedback} from 'react-native'
// import React, { useState, useCallback, useEffect } from 'react'
// import { GiftedChat, Bubble, Send, RenderMessageImageProps } from 'react-native-gifted-chat'
// import { addDoc, collection, serverTimestamp , doc, onSnapshot, query, orderBy, setDoc, getDoc} from 'firebase/firestore';
// import { db, authentication} from '../../config';
// import { Icon } from '@rneui/themed';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { saveMediaToStorage } from '../services/random';
// import { saveUserProfileImage, saveUserChatImage } from '../services/user';
// import { TouchableOpacity } from 'react-native-gesture-handler';



// import * as ImagePicker from 'expo-image-picker';
// import { setAutoServerRegistrationEnabledAsync } from 'expo-notifications';

// export default function Chat({route, navigation}) {
//   console.log('route ' + route);
//   const uid = route.params.uid
//   const userAvatar = route.params.userAvatar
//   const [messages, setMessages] = useState([]);
//   const currentUser = authentication?.currentUser?.uid;
//   const [currImage, setCurrImage] = useState(null);

//   console.log(userAvatar)

//   const [imageURL, setImageURL] = useState('');

//   const [lastPhotoUpdatedAt, setLastPhotoUpdatedAt] = useState(null);

//   const renderSend = (props) => {
//     return (
//         <View style={{flexDirection: 'row'}}>
//           <TouchableOpacity onPress={chooseImage}>
//             <Icon
//               type="font-awesome"
//               name="paperclip"
//               style={{
//                 marginTop: 8,
//                 marginRight: 10,
//                 transform: [{rotateY: '180deg'}],
//               }}
//               size={25}
//               color='blue'
//               tvParallaxProperties={undefined}
//             />
//           </TouchableOpacity>
//           <Send {...props}>
//             <Icon
//               type="font-awesome"
//               name="send"
//               style={{marginBottom: 10, marginRight: 15}}
//               size={23}
//               color='orange'
//               tvParallaxProperties={undefined}
//             />
//           </Send>  
//         </View>
      
//     );
//   };

//   const renderBubble = (props) => {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: '#007788',
//           },
//         }}
//         textStyle={{
//           right: {
//             color: '#fff',
//           },
//         }}
//       />
//     );
//   };

//   const [modalVisible, setModalVisible] = useState(false);

//   const viewImage = () => {
//     setModalVisible(true);
//   }

//   const renderMessageImage= (props) => {
//     setCurrImage(props.currentMessage.image)
//     return (
//       <View style={{ borderRadius: 15, padding: 2 }}>
//         <TouchableOpacity onPress={viewImage}>
//           <Image
//             //resizeMode="contain"
//             style={{
//               width: 200,
//               height: 200,
//               padding: 6,
//               borderRadius: 15,
//               resizeMode: "cover"
//             }}
//             source={{ uri : props.currentMessage.image }} />
//         </TouchableOpacity>
//       </View>
//     )
//   }


//   const scrollToBottomComponent = () => {
//     return <FontAwesome name="angle-double-down" size={22} color="#333" />;
//   };

//   // // choose image
//   // const [isAttachImage, setIsAttachImage] = useState(false);
//   // const [isAttachFile, setIsAttachFile] = useState(false);
//   // const [imagePath, setImagePath] = useState('');
//   // const [filePath, setFilePath] = useState('');

//   // // add a function attach file using DocumentPicker.pick

//   // const _pickDocument = async () => {
//   //   try {
//   //     const result = await DocumentPicker.pick({
//   //       type: [DocumentPicker.types.allFiles],
//   //       copyTo: 'documentDirectory',
//   //       mode: 'import',
//   //       allowMultiSelection: true,
//   //     });
//   //     const fileUri = result[0].fileCopyUri;
//   //     if (!fileUri) {
//   //       console.log('File URI is undefined or null');
//   //       return;
//   //     }
//   //     if (fileUri.indexOf('.png') !== -1 || fileUri.indexOf('.jpg') !== -1) {
//   //       setImagePath(fileUri);
//   //       setIsAttachImage(true);
//   //     } else {
//   //       setFilePath(fileUri);
//   //       setIsAttachFile(true);
//   //     }
//   //   } catch (err) {
//   //     if (DocumentPicker.isCancel(err)) {
//   //       console.log('User cancelled file picker');
//   //     } else {
//   //       console.log('DocumentPicker err => ', err);
//   //       throw err;
//   //     }
//   //   }
//   // };

//   const [sendingImage, setSendingImage] = useState(false);

//   // upload profile image
//   const chooseImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1
//     })

//     // console.log(result);
//     console.log(result.assets[0].uri);

//     if (!result.canceled) {
//       saveUserChatImage(result.assets[0].uri, uid)
//         .then(setLastPhotoUpdatedAt(Date.now()))
     
//     }

//     // const docRef = doc(db, "users", authentication.currentUser.email);
//     // getDoc(docRef)
//     // .then((doc) => {
//     //     setPhotoURL(doc.get('photoURL'))  
//     //     console.log(photoURL)
//     // }) 


//   }

//   //update photoURL
//   useEffect(() => {
//     const docRef = doc(db, "evidence", authentication.currentUser.uid, "partner", uid);
//     getDoc(docRef)
//     .then((doc) => {
//         setImageURL(doc.get('imageURL'))  
//         console.log("image " + imageURL)
//     }) 

//   }, [lastPhotoUpdatedAt])

  

//   useEffect(() => {
//     const chatId = uid > currentUser ? `${uid + '-' + currentUser}` : `${currentUser + '-' + uid}`;
//     const docref = doc(db, 'chatrooms', chatId);
//     const colRef = collection(docref, 'messages');
//     const q = query(colRef, orderBy('createdAt',"desc"));
//     const unsubcribe = onSnapshot(q, (onSnap) => {
//       const allMsg = onSnap.docs.map(mes => {
//         if(mes.data().createdAt){
//           return{
//             ...mes.data(),
//             createdAt:mes.data().createdAt.toDate()
//           }
//         }else{
//           return{
//             ...mes.data(),
//             createdAt:new Date()
//           }
//         }
//       })
//       setMessages(allMsg)

//     })

//       return () => {
//         unsubcribe()
//       }
//   },[])

//   const [sent, setSent] = useState(null);

//   const onSend = useCallback((messagesArray) => {
//     setSent(Date.now())
//     let myMsg = null;
//     const msg = messagesArray[0];
//     console.log('image ' + imageURL)
//     myMsg = {
//      ...msg,
//      sentBy:currentUser,
//      sentTo:uid,
//      image: imageURL
//     }
//     setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg))

//     const chatId = uid > currentUser ? `${uid + '-' + currentUser}` : `${currentUser + '-' + uid}`;
//     const docref = doc(db, 'chatrooms', chatId);
//     const colRef = collection(docref, 'messages');
//     const chatSnap = addDoc(colRef, {
//       ...myMsg,
//       createdAt:serverTimestamp(),
//     })
//   }, [])

//   // useEffect(() => {
//   //   setImageURL(null)
//   // }, [sent])

 

//   // async function sendImage(url) {

//   // }
//   return (
//     <View style={styles.container}>

//       <Button
//         onPress={() => navigation.navigate('Home')}
//         title='back'
//         />

//     <GiftedChat
//       messages={messages}
//       onSend={text => onSend(text)}
//       showAvatarForEveryMessage={true}
//       showUserAvatar={true}
//       renderBubble={renderBubble}
//       alwaysShowSend
//       scrollToBottom
//       renderSend={renderSend}
//       scrollToBottomComponent={scrollToBottomComponent}
//       renderMessageImage={renderMessageImage}
//       user={{
//         _id: currentUser,
//         avatar: route.params.userAvatar 
//       }}
//     />

    // <View>
    //   <Modal
    //     animationType='slide'
    //     transparent={true}
    //     visible={modalVisible}
    //     onRequestClose={() => {
    //       Alert.alert('Modal has been closed.');
    //       setModalVisible(!modalVisible);
    //     }}>

    //       <View style={{
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         backgroundColor: 'rgba(0, 119, 136, 0.5)',
    //         opacity: '5',
    //         flex: 1
    //       }}>
    //         <Image
    //           //resizeMode="contain"
    //           style={{
    //             width: 350,
    //             height: 350
    //             //padding: 6,
    //             //borderRadius: 15,
    //             //resizeMode: "cover"
    //           }}
    //           source={{ uri : currImage }} />
    //       </View>

    //       <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
    //             <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}></View>

    //         </TouchableWithoutFeedback>
    //     </Modal>
      
    // </View>
    

//     </View>
//   )

// }


// const styles = StyleSheet.create({
//   container:{
//       flex:1
//   },
//   btn:{
//       marginTop:10
//   },
//   modalContainer: {
//     backgroundColor: '#007788',
//     flex: 1
//   }
// })