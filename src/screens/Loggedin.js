import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Chats from './Chats.js';
import Chatroom from '../components/Chatroom.js';
import Profile from '../components/Profile.js';
import AddFriend from '../components/AddFriend.js';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

function AllChats() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name='AllChats' component={Chats} />
      <Stack.Screen name='Chatroom 15' component={Chatroom} />
      <Stack.Screen name='Chatroom 16' component={Chatroom} />
      <Stack.Screen name='Chatroom 17' component={Chatroom} />
      <Stack.Screen name='Chatroom 18' component={Chatroom} />
      <Stack.Screen name='Chatroom 19' component={Chatroom} />
    </Stack.Navigator>
  )
}

export default class Loggedin extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Chats">
          <Tab.Screen name="Profile" component={Profile} />
          <Tab.Screen name="Chats" component={AllChats} />
          <Tab.Screen name="Add friend" component={AddFriend} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}