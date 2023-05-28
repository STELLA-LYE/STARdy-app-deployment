import { StyleSheet, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

import Welcome from './src/screens/welcome';
import Profile from './src/screens/profile';
import MainTab from './src/navigation/mainTab';
import Todo from './src/screens/todo';
import Notes from './src/screens/notes';
import Encouragement from './src/screens/encouragement';
import EditProfile from './src/screens/editProfile';
import Login from './src/screens/login';

import { Feather } from '@expo/vector-icons';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
              onPress={() => navigation.goBack() }
              color='#f6f6f6' />
          )
        })}>
          <Stack.Screen name='Welcome' component={Welcome} options={{ headerShown: false }}/>
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name='profile' component={Profile} options={{ headerShown: false }}/>
          <Stack.Screen name='Main Tab' component={MainTab} options={{ headerShown: false }}/>
          <Stack.Screen name='Notes' component={Notes} />
          <Stack.Screen name='To Do List' component={Todo} />
          <Stack.Screen name='Encouragement Notes!' component={Encouragement} /> 
          <Stack.Screen name='Edit Profile' component={EditProfile} /> 
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
