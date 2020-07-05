import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import io from 'socket.io-client';

const socket = io('https://slabber.herokuapp.com/')
const Realm = require('realm');

socket.emit('join', { room: '15' });
socket.emit('join', { room: '16' });
socket.emit('join', { room: '17' });
socket.emit('join', { room: '18' });
socket.emit('join', { room: '19' });

export default class Chats extends React.Component {
    constructor(props) {
        super(props);
        this.state = { realm: null }
    }
    
    render() {
        return (
            <SafeAreaView>
                <TouchableOpacity style={styles.chatroomClickable} onPress={() => this.props.navigation.navigate('Chatroom 15', { socket: socket, room: '15' })}>
                    <Text style={styles.chatroomHeading}>Chatroom 15</Text>
                    <Text style={styles.chatroomDescriptoin}>Short description here</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatroomClickable} onPress={() => this.props.navigation.navigate('Chatroom 16', { socket: socket, room: '16' })}>
                    <Text style={styles.chatroomHeading}>Chatroom 16</Text>
                    <Text style={styles.chatroomDescriptoin}>Short description here</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatroomClickable} onPress={() => this.props.navigation.navigate('Chatroom 17', { socket: socket, room: '15' })}>
                    <Text style={styles.chatroomHeading}>Chatroom 17</Text>
                    <Text style={styles.chatroomDescriptoin}>Short description here</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatroomClickable} onPress={() => this.props.navigation.navigate('Chatroom 18', { socket: socket, room: '15' })}>
                    <Text style={styles.chatroomHeading}>Chatroom 18</Text>
                    <Text style={styles.chatroomDescriptoin}>Short description here</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatroomClickable} onPress={() => this.props.navigation.navigate('Chatroom 19', { socket: socket, room: '15' })}>
                    <Text style={styles.chatroomHeading}>Chatroom 19</Text>
                    <Text style={styles.chatroomDescriptoin}>Short description here</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    chatroomClickable: {
        height: 60,
        borderBottomWidth: 0.3,
        borderBottomColor: '#808080'
    },
    chatroomHeading: {
        fontSize: 16,
        padding: 7,
        paddingBottom: 0
    },
    chatroomDescriptoin: {
        paddingLeft: 7,
        color: '#808080'
    }
});