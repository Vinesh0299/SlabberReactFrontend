import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './Login.js';
import Signup from './Signup.js';
import ForgotPassword from './ForgotPassword.js';

const Stack = createStackNavigator();

export default class Routes extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                    <Stack.Screen name='Login' component={Login}/>
                    <Stack.Screen name='Signup' component={Signup}/>
                    <Stack.Screen name='ForgotPassword' component={ForgotPassword}/>
                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}