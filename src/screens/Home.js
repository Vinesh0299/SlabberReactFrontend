import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import Chats from './Chats.js';
import Profile from '../components/Profile.js';
import AddFriend from '../components/AddFriend.js';

const Tab = createMaterialTopTabNavigator();

export default class Home extends React.Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Tab.Navigator initialRouteName="Chats" props={this.props}>
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Add friend" component={AddFriend} />
      </Tab.Navigator>
    );
  }
}