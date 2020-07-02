import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Chats from './src/screens/Chats.js';
import Profile from './src/screens/Profile.js';
import AddFriend from './src/screens/AddFriend.js';

const Tab = createMaterialTopTabNavigator();

function chats() {
  return (
    <Chats />
  );
}

function profile() {
  return (
    <Profile />
  );
}

function addFriend() {
  return (
    <AddFriend />
  );
}

export default class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="Chats">
          <Tab.Screen name="Profile" component={profile} />
          <Tab.Screen name="Chats" component={chats} />
          <Tab.Screen name="Add friend" component={addFriend} />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}