import React from 'react';
import { StyleSheet, View, Text, Platform } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import Analytics from '../screens/analytics';
import Dashboard from '../screens/dashboard';
import FocusTimer from '../screens/focusTimer';
import SessionUsers from '../screens/sessionUsers';
import HomeChat from '../screens/homeChat';


import { FontAwesome } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';

import Home from '../screens/home';


export default function MainTab() {

    const MainTab = createMaterialBottomTabNavigator();

    return <MainTab.Navigator 
              initialRouteName='Users'
              //labeled={false}
              barStyle={{ 
                backgroundColor: '#007788',
                height: 80,
                }}
              activeColor='#f6cefc'
              inactiveColor='#f6f6f6'
              tabBarOptions={{
                tabBarLabelStyle: {
                  fontSize: 10
                }
              }}
            >

      <MainTab.Screen 
        name='Chat' 
        component={HomeChat} 
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{
              // flexDirection: 'column',
              // alignItems: 'center',
              // justifyContent: 'center',
              // position: 'absolute',
              // top: -9
            }}>
              <Ionicons name="chatbox-ellipses" size={27} color={focused ? '#007788' : '#f6f6f6'} />
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: 'bold'
          }
        }} 
      />

      <MainTab.Screen 
        name='Users' 
        component={SessionUsers} 
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesome5 name='user-friends' size={27} color={focused ? '#007788' : '#f6f6f6'} />
            </View>
          ),
        }} 
      />

      <MainTab.Screen 
        name='Timer' 
        component={FocusTimer}  
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesome5 name='clock' size={27} color={focused ? '#007788' : '#f6f6f6'} />
            </View>
          ),
        }}
      />

    <MainTab.Screen 
        name='Tasks' 
        component={Home} 
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesome5 name='clipboard-list' size={27} color={focused ? '#007788' : '#f6f6f6'} />
            </View>
          ),
        }} 
      />

      <MainTab.Screen 
        name='Dashboard' 
        component={Dashboard}  
        options={{
          tabBarIcon: ({focused}) => (
            <View>
              <FontAwesome name='user-circle-o' size={27} color={focused ? '#007788' : '#f6f6f6'} />
            </View>
          )
        }}
      />
    </MainTab.Navigator>
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#eef1e1',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 2,
      elevation: 2,
    },
    mainTab: {
      position: 'absolute',
      backgroundColor: '#eef1e1',
    },
    icon: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }, 
    shadow: {
      shadowColor: '#007788',
      shadowOffset: {
        width: 0,
        height: 10,
      },
      shadowOpacity: 1,
      shadowRadius: 3.5,
      elevation: 5,
      zIndex: 999 
    },
    iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
  