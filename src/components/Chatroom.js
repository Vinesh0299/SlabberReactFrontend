import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    YellowBox,
    ScrollView,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
]);

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
        this.setState({ chatMessages: [...this.state.chatMessages, {content: { message: this.state.chatMessage, sender: 'Vinesh', sentAt: new Date() }, style: 'rightMessage'}] });
        this.setState({ chatMessage: '' });
    }

    render() {
        var i = 1;
        const chatMessages = this.state.chatMessages.map((chatMessage) => {
            i += 1;
            if(chatMessage.style === 'rightMessage') {
                return (
                    <View key={i} style={styles.rightMessage}>
                        <Text>{chatMessage.content.message}</Text>
                    </View>
                )
            } else {
                return (
                    <View key={i} style={styles.leftMessage}>
                        <Text style={styles.sender}>{chatMessage.content.sender}</Text>
                        <Text>{chatMessage.content.message}</Text>
                    </View>
                )
            }
        });

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={styles.container}>
                    {chatMessages}
                </ScrollView>
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
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#84c9ff',
        marginBottom: 41
    },
    sender: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    inputMessage: {
        height: 40,
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#fff'
    },
    leftMessage: {
        alignSelf: 'flex-start',
        color: '#FF5733',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        margin: 5,
        maxWidth: '80%'
    },
    rightMessage: {
        color: '#110A09',
        alignSelf: 'flex-end',
        backgroundColor: '#84c9aa',
        padding: 10,
        borderRadius: 15,
        borderBottomRightRadius: 0,
        margin: 5
    },
});