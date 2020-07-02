import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class Chats extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>All your chats here</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
});