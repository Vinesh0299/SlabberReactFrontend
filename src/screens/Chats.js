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
const messageSchema = {
    name: 'Messages',
    properties: {
        message: 'string',
        sender: 'string',
        sentAt: 'string',
        style: 'string',
        chatroom: 'string'
    }
}

socket.emit('join', { room: '15' });
socket.emit('join', { room: '16' });
socket.emit('join', { room: '17' });
socket.emit('join', { room: '18' });
socket.emit('join', { room: '19' });

socket.on('newMessage', (message) => {
    var style = 'rightMessage';
    if(message.socket !== socket.id) {
        style = 'leftMessage';
        //this.setState({ chatMessages: [...this.state.chatMessages, {content: message.message, sender: 'Katewa', style: 'leftMessage'}] });
    }
    Realm.open({ schema: [messageSchema] }).then((realm) => {
        realm.write(() => {
            realm.create('Messages', {
                message: message.message,
                sender: 'Katewa',
                sentAt: 'today',
                style: style,
                chatroom: '15'
            });
        });
    });
});

export default class Chats extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <SafeAreaView>
                <TouchableOpacity style={styles.chatroomClickable} onPress={() => this.props.navigation.navigate('Chatroom', { socket: socket, room: '15' })}>
                    <Text style={styles.chatroomHeading}>Chatroom 15</Text>
                    <Text style={styles.chatroomDescriptoin}>Short description here</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatroomClickable} onPress={() => this.props.navigation.navigate('Chatroom', { socket: socket, room: '16' })}>
                    <Text style={styles.chatroomHeading}>Chatroom 16</Text>
                    <Text style={styles.chatroomDescriptoin}>Short description here</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatroomClickable} onPress={() => this.props.navigation.navigate('Chatroom', { socket: socket, room: '17' })}>
                    <Text style={styles.chatroomHeading}>Chatroom 17</Text>
                    <Text style={styles.chatroomDescriptoin}>Short description here</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatroomClickable} onPress={() => this.props.navigation.navigate('Chatroom', { socket: socket, room: '18' })}>
                    <Text style={styles.chatroomHeading}>Chatroom 18</Text>
                    <Text style={styles.chatroomDescriptoin}>Short description here</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.chatroomClickable} onPress={() => this.props.navigation.navigate('Chatroom', { socket: socket, room: '19' })}>
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