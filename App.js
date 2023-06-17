import { Alert, StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

import Welcome from './src/screens/welcome';
import Profile from './src/screens/profile';
import MainTab from './src/navigation/mainTab';
import Todo from './src/screens/todo';
import Notes from './src/screens/notes';
import Encouragement from './src/screens/encouragement';
import EditProfile from './src/screens/editProfile';
import Login from './src/screens/login';
import SignUp from './src/screens/signup';
import Verify from './src/components/tasks/verify';
import Evidence from './src/components/tasks/evidence';
import Leaderboard from './src/screens/leaderboard';
import Tasks from './src/screens/tasks';
import EncourageMessage from './src/components/tasks/encourageMsg';
import Goals from './src/components/tasks/goals';
import Chat from './src/screens/chat';
import NoteDetail from './src/components/dashboard/notes/noteDetail';
import { Feather } from '@expo/vector-icons';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/home';

export default function App() {

  const Stack = createNativeStackNavigator();

  const[fontsLoaded] = useFonts({
    PressStart: require('./assets/fonts/PressStart2P-Regular.ttf'),
    RowdiesBold: require('./assets/fonts/Rowdies-Bold.ttf'),
    RowdiesRegular: require('./assets/fonts/Rowdies-Regular.ttf'),
    UbuntuBold: require('./assets/fonts/Ubuntu-Bold.ttf'),
    UbuntuMedium: require('./assets/fonts/Ubuntu-Medium.ttf')
  });

  if (!fontsLoaded) {
    return null;
  } else {
    return (

      <NavigationContainer>
        <Stack.Navigator screenOptions={({ navigation }) => ({
          headerTitleStyle: {
            color: '#f6f6f6'
          },
          headerStyle: {
            backgroundColor: '#007788'
          },
          headerTitleAlign: 'center',
          headerLeft: () => (
            <Feather
              name='arrow-left' 
              size={22} 
              onPress={() => navigation.goBack()}
              color='#f6f6f6' />
          )
        })}>
          <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }}/>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name='Sign Up' component={SignUp} options={{ headerShown: false }}/>
          <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }}/>
          <Stack.Screen name='Main Tab' component={MainTab} options={{ headerShown: false }}/>
          <Stack.Screen name='Notes' component={Notes} />
          <Stack.Screen name='NoteDetail' component={NoteDetail} />
          <Stack.Screen name='To Do List' component={Todo} />
          <Stack.Screen name='Encouragement Notes!' component={Encouragement} /> 
          <Stack.Screen name='Leaderboard' component={Leaderboard} /> 
          <Stack.Screen name='Edit Profile' component={EditProfile} 
            options={({ navigation }) => ({
              headerTitleStyle: {
                color: '#f6f6f6'
              },
              headerStyle: {
                backgroundColor: '#007788'
              },
              headerTitleAlign: 'center',
              headerLeft: () => (
                <Feather
                  name='arrow-left' 
                  size={22} 
                  onPress={() => {
                    Alert.alert(
                      "Discard changes", 
                      "Are you sure you want to discard all changes",
                      [ 
                        {text: 'Yes', onPress: () => navigation.goBack()},
                        {text: 'No', onPress: () => console.log('canceled'), style: 'cancel' },
                        
                      ],
                      {cancelable: false} )
                  } }
                  color='#f6f6f6' />
              )
            })} /> 
          {/* <Stack.Screen
               name='Tasks'
               component={Tasks}
               options={({route}) => ({
                headerBackVisible:false,
                title:route.params.name,
                headerTitleStyle:{fontWeight:'bold'},
                headerTitleAlign:'center'
               })}
               /> */}

          <Stack.Screen 
              name='Task' 
              component={Tasks} /> 

            <Stack.Screen 
              name='Chatroom' 
              component={Chat} /> 
          


          <Stack.Screen name='Evidence' component={Evidence} /> 
          <Stack.Screen name='Verify' component={Verify} /> 
          <Stack.Screen name='Goals' component={Goals} /> 
          <Stack.Screen name='Encouragement Msg' component={EncourageMessage} /> 
          <Stack.Screen name='Home' component={Home} /> 
          
        </Stack.Navigator>
      </NavigationContainer>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
