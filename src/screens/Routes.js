import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login.js';
import Signup from './Signup.js';
import ForgotPassword from './ForgotPassword.js';
import Home from './Home.js';
import Chatroom from '../components/Chatroom.js';

const Stack = createStackNavigator();

export default class Routes extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen options={{headerShown: false}} name='Login' component={Login} />
                    <Stack.Screen options={{headerShown: false}} name='Signup' component={Signup} />
                    <Stack.Screen options={{headerShown: false}} name='ForgotPassword' component={ForgotPassword} />
                    <Stack.Screen options={{headerShown: false}} name='Home' component={Home} />
                    <Stack.Screen name='Chatroom' component={Chatroom} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}