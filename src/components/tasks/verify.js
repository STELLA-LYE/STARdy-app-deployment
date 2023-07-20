import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Modal, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { db, authentication } from '../../../config';
import { doc, getDoc } from "firebase/firestore";
import { fetchUserEvidence, verifyNo, verifyYes } from '../../api/firestore';

const Verify = ({route, navigation}) => {

    const { otherUserID } = route.params;

    const [evidence, setEvidence] = useState([]);
    const [startDate, setStartDate] = useState(0);
    const [viewedImage, setViewedImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    
    const viewImage = (imagePressed) => {
        setViewedImage(imagePressed)
        console.log(`view  + ${viewedImage}`);
        setModalVisible(true);
    }

    const closeModal = () => {
      setModalVisible(false);
      console.log(modalVisible)
    } 

    const onYesPressed = () => {
      verifyYes(startDate, otherUserID)
      navigation.navigate('Main Tab')
    }

    const onNoPressed = () => {
      verifyNo(startDate, otherUserID)
      navigation.navigate('Main Tab')
    }

    // fetch user evidence data
    useEffect(() => {
        fetchUserEvidence(otherUserID)
          .then(setEvidence);

        // get start date
        const docRef = doc(db, "focusSession", authentication.currentUser.uid, "partners", otherUserID);
        getDoc(docRef)
            .then((doc) => {
                const s = doc.get('start')
                console.log(doc.get('start'))
                setStartDate(s)
                console.log('start: ' + startDate)
              
              }) 
    },[])

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
        <TouchableOpacity style={styles.yesbutton} onPress={onYesPressed}>
            <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
    </View>

    <View style={styles.section}>
      <TouchableOpacity style={styles.nobutton} onPress={onNoPressed} >
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
            //opacity: '5',
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