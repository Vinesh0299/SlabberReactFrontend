import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import io from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';

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

var rooms = [];

AsyncStorage.getItem('User')
.then(data => JSON.parse(data))
.then((data) => {
    data.chatrooms.forEach((chatroom) => {
        rooms.push({name: chatroom.roomName, id: chatroom.roomId.$id});
        socket.emit('join', { room: chatroom.roomId.$id });
    });
});

socket.on('newMessage', (message) => {
    var style = 'rightMessage';
    if(message.socket !== socket.id) {
        style = 'leftMessage';
    }
    Realm.open({ schema: [messageSchema] }).then((realm) => {
        realm.write(() => {
            realm.create('Messages', {
                message: message.message.message,
                sender: message.message.sender,
                sentAt: message.message.date,
                style: style,
                chatroom: message.room
            });
        });
    });
});

export default class Chats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chatroom: []
        }
    }
    
    render() {
        var i = 0;
        const chatrooms = rooms.map((room) => {
            i += 1;
            return (
                <TouchableOpacity key={i} style={styles.chatroomClickable} onPress={() => this.props.navigation.navigate('Chatroom', { socket: socket, room: room.id })}>
                    <Text style={styles.chatroomHeading}>{room.name}</Text>
                    <Text style={styles.chatroomDescriptoin}>Short description here</Text>
                </TouchableOpacity>
            )
        })
        return (
            <SafeAreaView>
                <ScrollView>
                    {chatrooms}
                </ScrollView>
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