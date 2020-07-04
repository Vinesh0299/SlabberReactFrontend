import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class Chatroom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chatMessage: '',
            chatMessages: []
        };
    }

    componentDidMount() {
        this.props.route.params.socket.on('newMessage', (message) => {
            if(message.socket !== this.props.route.params.socket.id) {
                this.setState({ chatMessages: [...this.state.chatMessages, {content: message.message, style: 'leftMessage'}] });
            }
        });
    }

    submitChatMessage() {
        this.props.route.params.socket.emit('createMessage', {
            content: this.state.chatMessage,
            room: this.props.route.params.room
        });
        this.setState({ chatMessages: [...this.state.chatMessages, {content: this.state.chatMessage, style: 'rightMessage'}] });
        this.setState({ chatMessage: '' });
    }

    render() {
        var i = 1;
        const chatMessages = this.state.chatMessages.map((chatMessage) => {
            i += 1;
            if(chatMessage.style === 'rightMessage') {
                return (
                    <View key={i} style={styles.rightMessage}>
                        <Text>{chatMessage.content}</Text>
                    </View>
                )
            } else {
                return (
                    <View key={i} style={styles.leftMessage}>
                        <Text>{chatMessage.content}</Text>
                    </View>
                )
            }
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
        backgroundColor: '#D3D3D3',
    },
    inputMessage: {
        height: 40,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff'
    },
    leftMessage: {
        color: '#FF5733',
    },
    rightMessage: {
        color: '#110A09',
    },
});