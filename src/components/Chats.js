import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
} from 'react-native';
import io from 'socket.io-client';
import { createStackNavigator } from '@react-navigation/stack';
import { TextInput } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default class Chats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chatMessage: '',
            chatMessages: []
        };
    }

    componentDidMount() {
        this.socket = io('https://slabber.herokuapp.com/');
        this.socket.emit('join', {room: '15'});
        this.socket.on('newMessage', (message) => {
            if(message.socketid !== this.socket.id) {
                message['style'] = 'leftMessage';
                this.setState({ chatMessages: [...this.state.chatMessages, message] });
            }
        });
    }

    submitChatMessage() {
        this.socket.emit('createMessage', {
            text: this.state.chatMessage,
            room: '15'
        });
        this.setState({ chatMessages: [...this.state.chatMessages, {text: this.state.chatMessage, style: 'rightMessage'}] });
        this.setState({ chatMessage: '' });
    }

    render() {
        var i = 1;
        const chatMessages = this.state.chatMessages.map((chatMessage) => {
            i += 1;
            if(chatMessage.style === 'rightMessage') return <Text key={i} style={styles.rightMessage}>{chatMessage.text}</Text>
            else return <Text key={i} style={styles.leftMessage}>{chatMessage.text}</Text>
        });

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.container}>
                    {chatMessages}
                    <TextInput
                        style={styles.inputMessage}
                        autoCorrect={false}
                        placeholder='Type Message...'
                        value={this.state.chatMessage}
                        onSubmitEditing={() => this.submitChatMessage()}
                        onChangeText={(chatMessage) => {
                            this.setState({ chatMessage });
                        }}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputMessage: {
        height: 40,
        borderWidth: 0.5,
    },
    leftMessage: {
        color: '#FF5733'
    },
    rightMessage: {
        color: '#110A09'
    },
});