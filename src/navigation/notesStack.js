import { View, Text, } from 'react-native'
import React from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const notesStack = () => {
    const Stack = createNativeStackNavigator();

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Notes' component={Notes} options={{ headerShown: false }}/>
        <Stack.Screen name='Form' component={Form} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
}

export default notesStack