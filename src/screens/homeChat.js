import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, where, query } from 'firebase/firestore'
import { authentication, db } from '../../config'
import { ListItem } from '../components/chat/listItem'

export default function HomeChat({navigation}) {
  const [users, setUsers] = useState([]);

  const logoutUser = async () => {
    authentication.signOut()
    .then(() => {
      navigation.replace('Login')
    })
  }
 
  const getUsers =  () => {
    const docsRef = collection(db, 'users');
    const q =  query(docsRef, where('userUID', '!=', authentication?.currentUser?.uid ));
    const docsSnap = onSnapshot(q, (onSnap) => {
      let data = [];
      onSnap.docs.forEach(user => {
        data.push({...user.data()})
        setUsers(data)
        console.log(user.data())
        
      })
    })
  }
  useEffect(() => {
    getUsers();
  },[])


  return (
    <View style={styles.container}>
    <>
      <TouchableOpacity onPress={logoutUser}>
          <View style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
          </View>
      </TouchableOpacity>

      <FlatList
      data={users}
      key={user => user.email}
      renderItem={({item}) => 
      <ListItem 
      onPress={() => navigation.navigate('Chat', {name:item.name, uid:item.userUID, userAvatar:item.avaterUrl})}
      title={item.name}
      subTitle={item.email}
      image={item.avaterUrl}
      />
    }
      />

  </>
  </View>
    
  )
}

const styles = StyleSheet.create({
  container:{
      flex:1, 
      backgroundColor: '#eef1e1',
  },
  button: {
    borderRadius: 100,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#007788',
    flexDirection: 'column',
    justifyContent: 'center',
    width: 100,
    marginBottom: 10, 
  },
  buttonText: {
    color: '#f6f6f6',
    fontWeight: 'bold',
    fontFamily: 'RowdiesRegular', 
    fontSize: 14,
    textAlign: 'center',
  },
})