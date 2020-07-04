import React from 'react';
import {
    StyleSheet,
    View,
    Button,
    SafeAreaView,
} from 'react-native';
import io from 'socket.io-client';

const socket = io('https://slabber.herokuapp.com/')

export default class Chats extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <SafeAreaView>
                <Button
                    title='Chatroom 15'
                    onPress={() => this.props.navigation.navigate('Chatroom 15', { socket: socket, room: '15' })}
                />
                <Button
                    title='Chatroom 16'
                    onPress={() => this.props.navigation.navigate('Chatroom 16', { socket: socket, room: '16' })}
                />
                <Button
                    title='Chatroom 17'
                    onPress={() => this.props.navigation.navigate('Chatroom 17', { socket: socket, room: '17' })}
                />
                <Button
                    title='Chatroom 18'
                    onPress={() => this.props.navigation.navigate('Chatroom 18', { socket: socket, room: '18' })}
                />
                <Button
                    title='Chatroom 19'
                    onPress={() => this.props.navigation.navigate('Chatroom 19', { socket: socket, room: '19' })}
                />
            </SafeAreaView>
        );
    }
}