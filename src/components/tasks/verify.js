import React, {useEffect, useState} from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, StyleSheet, Dimensions, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Animated } from 'react-native';
import { storage } from '../../../config';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { db, authentication } from '../../../config';
import { doc, getDoc, get, where, Filter, getDocs, query, collection, setDoc, deleteDoc} from "firebase/firestore";


const Verify = ({route, navigation}) => {

    const { otherUserEmail, otherUserID } = route.params;

    const [evidence, setEvidence] = useState([]);
    const currUserRef = doc(db, "users", authentication.currentUser.email);
    const partnerRef = doc(db, "users", otherUserEmail);

    const [startDate, setStartDate] = useState(0);
    const [viewedImage, setViewedImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    
    const viewImage = (imagePressed) => {
        setViewedImage(imagePressed)
        console.log(`view  + ${viewedImage}`);
        setModalVisible(true);
    }


    const verifyYes = async () => {

      const currentDate = new Date().getDate();
      const expectedSubmissionDate = startDate + 2;

      if (currentDate <= expectedSubmissionDate) {
        // current user gets 150 xp 
        getDoc(currUserRef)
        .then((doc) => {
          const prevXP = doc.get('xp');
          console.log(doc.get('xp'))
          console.log('prevXP: '+ prevXP)
          const newXP = prevXP + 150;
          console.log('curr newXP: ' + newXP)
          setDoc(currUserRef, {
            xp: newXP
          }, {merge: true}).then(() => {
            // data saved successfully
            console.log('data submitted');
          }).catch((error) => {
            //the write failed
            console.log(error)
          });

        })

        // partner gets 200 xp
        getDoc(partnerRef)
          .then((doc) => {
            const prevXP = doc.get('xp');
            const newXP = prevXP + 200;
            setDoc(partnerRef, {
              xp: newXP
            }, {merge: true})
          })

        // end focus session and return to main page
        Alert.alert("Thanks for verifying!", 
        "This marks the end of your focus session. Check your XP accumulation under dashboard!",
        [{
          text: 'OK',
          onPress: () => navigation.navigate('Main Tab')
        }])
        
      } else { // missed deadline
        // partner gets 200 XP
        getDoc(partnerRef)
        .then((doc) => {
          const prevXP = doc.get('xp');
          const newXP = prevXP + 200;
          setDoc(partnerRef, {
            xp: newXP
          }, {merge: true})
        })

        Alert.alert("You've missed the deadline for verification :(", 
        "Unfortunately you will not be getting any XP for verification. Don't miss the deadline next time!"
        [{
          text: 'OK',
          onPress: () => navigation.navigate('Main Tab')
        }])
      }

      // set active to false
      const docRef = doc(db, "focusSession", authentication.currentUser.email, "partners", otherUserEmail);
      await setDoc(docRef, {
        active: false
      }, { merge: true });
      
    }


    const verifyNo = async () => {

      const currentDate = new Date().getDate();
      const expectedSubmissionDate = startDate + 1;

      await deleteDoc(doc(db, "focusSession", authentication.currentUser.email, "partners", otherUserEmail));

      if (currentDate <= expectedSubmissionDate) {
        // current user gets 150 xp
        getDoc(currUserRef)
        .then((doc) => {
          const prevXP = doc.get('xp');
          const newXP = prevXP + 150;
          setDoc(currUserRef, {
            xp: newXP
          }, {merge: true})
        })
      
        // partner loses 200 xp
        getDoc(partnerRef)
        .then((doc) => {
          const prevXP = doc.get('xp');
          const newXP = prevXP - 200;
          setDoc(partnerRef, {
            xp: newXP
          }, {merge: true})
        })

        Alert.alert("Thanks for verifying!", 
        "This marks the end of your focus session. Check your XP accumulation under dashboard!",
        [{
          text: 'OK',
          onPress: () => navigation.navigate('Main Tab')
        }])

      } else {
        // partner loses 200 XP
        getDoc(partnerRef)
        .then((doc) => {
          const prevXP = doc.get('xp');
          const newXP = prevXP + 200;
          setDoc(partnerRef, {
            xp: newXP
          }, {merge: true})
        })

        Alert.alert("You've missed the deadline for verification XP :(", 
        "Unfortunately you will not be getting any XP for verification. Don't miss the deadline next time!"
        [{
          text: 'OK',
          onPress: () => navigation.navigate('Main Tab')
        }])

      }

      // set active to false
      const docRef = doc(db, "focusSession", authentication.currentUser.email, "partners", otherUserEmail);
      await setDoc(docRef, {
        active: false
      }, { merge: true });
      

      
    
    }

    // fetch user evidence data
    useEffect(() => {
        const q = query(collection(db, "evidence", otherUserEmail, "images"), where("partner", "==", authentication.currentUser.uid));
        getDocs(q)
            .then((snapshot) => {
              let evidence = snapshot.docs.map(doc => {
                  const data = doc.data(); 
                  const id = doc.id; 
                  return { id, ...data }
              }); 
              setEvidence(evidence);
              //console.log(evidence);
            })

        const docRef = doc(db, "focusSession", authentication.currentUser.email, "partners", otherUserEmail);

        getDoc(docRef)
            .then((doc) => {
                const s = doc.get('start')
                console.log(doc.get('start'))
                setStartDate(s)
                console.log('start: ' + startDate)
              
              }) 

    },[])

    const closeModal = () => {
        setModalVisible(false);
        console.log(modalVisible)
    }


  // front end
  return (
    <View style={styles.container}>
        
        <FlatList 
            data={evidence}
            extraData={evidence}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => {
                const imagePressed = item.imageURL;
                return (
                    <View style={styles.card}>

                        <Text style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            marginTop: 10
                        }}>{item.taskName}</Text>

                        <TouchableOpacity onPress={() => viewImage(imagePressed)}>
                            <Image source={{uri : item.imageURL}} style={styles.image}/>
                        </TouchableOpacity>
                  
                    </View>
                )

            }}
        />


    <View style={styles.section}>
        <Text style={styles.taskText}>
            Verify if your accountability partner has completed all his/her goals for the FocusSession.
            Please click on the corresponding button below!
        </Text>
    </View>

    <View style={styles.section}>
        <TouchableOpacity style={styles.yesbutton} onPress={verifyYes}>
            <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.section}>
      <TouchableOpacity style={styles.nobutton} onPress={verifyNo} >
            <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
    </View>

    <View>
       <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>

          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 119, 136, 0.5)',
            opacity: '5',
            flex: 1
          }}>
            <Image
              //resizeMode="contain"
              style={{
                width: '100%',
                height: '100%',
                flex: 1,
                resizeMode: 'contain'
                //padding: 6,
                //borderRadius: 15,
                //resizeMode: "cover"
              }}
              source={{ uri : viewedImage }} />
          </View>

            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}></View>
            </TouchableWithoutFeedback>
 
        </Modal>
      
    </View>

  </View>  
  );
};

const styles = {
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
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
    
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  taskText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10
  },
  Container: {
    alignItems: 'center',
    justifyContent: 'center', 
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center', 
  },
  tittleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  taskText: {
    fontSize: 16,
    textAlign:'center',
    //color:'#A9A9A9', 
    color: 'black'
  },
  section: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    width:'100%',
    marginVertical:5,
    paddingHorizontal:30,
    marginTop: 30, 
    //marginBottom: 50
  },
  yesbutton: {
    backgroundColor: '#007788',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 20,
    width: 250, 
  },
  nobutton: {
    backgroundColor: '#D2686E',
    borderRadius: 20,
    padding: 10,
    marginHorizontal: 20,
    width: 250, 
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  },
};

export default Verify;