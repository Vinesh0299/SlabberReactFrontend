import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Chats from '../components/Chats.js';
import Profile from '../components/Profile.js';
import AddFriend from '../components/AddFriend.js';

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

export default class Loggedin extends React.Component {
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