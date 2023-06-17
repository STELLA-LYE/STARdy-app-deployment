import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, onSnapshot, where, query } from 'firebase/firestore'
import { authentication, db } from '../../config'
import { ListItem } from '../components/tasks/listItem'

export default function Home({navigation}) {
  const [users, setUsers] = useState([]);

  const logoutUser = async () => {
    authentication.signOut()
    .then(() => {
      navigation.replace('Login')
    })
  }
 
  const getUsers =  () => {
    const docsRef = collection(db, 'focusSession', authentication.currentUser.email, 'partners');
    const q =  query(docsRef, where('active', '==', true));
    const docsSnap = onSnapshot(q, (onSnap) => {
      let data = [];
      onSnap.docs.forEach(async user => {
        data.push({...user.data()})
        setUsers(data)      
      })
    })
  }

  useEffect(() => {
    getUsers();
    console.log(users);
  },[])


  return (
    <View style={styles.container}>
    <>
      <TouchableOpacity onPress={logoutUser}>
          <View style={styles.button}>
              <Text style={styles.buttonText}>Logout</Text>
          </View>
      </TouchableOpacity>

      {/* <View style={styles.empty}>
        <Text style={styles.emptyText}>Send your evidence here!</Text>
      </View> */}

      <FlatList
      data={users}
      key={user => user.email}
      renderItem={({item}) => 
          {
            // console.log(item.matched)
            //console.log(item.userID)
            
            // console.log(authentication.currentUser.uid)
            // only display chats of users that are matched with the current user
              return (
                <ListItem 
                  onPress={() => navigation.navigate('Task', {name:item.name, uid:item.userID, userAvatar:item.photoURL, email: item.email})}
                  title={item.name}
                  image={item.photoURL}
                  />
              )
          }}
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
    marginTop: 45,
    marginLeft: 20
  },
  buttonText: {
    color: '#f6f6f6',
    fontWeight: 'bold',
    fontFamily: 'RowdiesRegular', 
    fontSize: 14,
    textAlign: 'center',
  },
  empty: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'center'
  }, 
  emptyText: {
    fontSize: 24,
    opacity: 0.5
  }
})