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

export default class Chatroom extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chatMessage: '',
            chatMessages: []
        };
    }

    componentDidMount() {
        Realm.open({ schema: [messageSchema] }).then((realm) => {
            const messages = realm.objects('Messages').filtered(`chatroom == '${this.props.route.params.room}'`);
            const chatMessages = messages.map((message) => {
                return {content: message.message, sender: message.sender, style: message.style}
            });
            console.log(chatMessages);
            this.setState({ chatMessages });
        });
        this.props.route.params.socket.on('newMessage', (message) => {
            var style = 'rightMessage';
            if(message.socket !== this.props.route.params.socket.id) {
                style = 'leftMessage';
                this.setState({ chatMessages: [...this.state.chatMessages, {content: message.message, sender: 'Katewa', style: 'leftMessage'}] });
            }
            console.log('fuck');
            Realm.open({ schema: [messageSchema] }).then((realm) => {
                realm.write(() => {
                    realm.create('Messages', {
                        message: message.message,
                        sender: 'Katewa',
                        sentAt: 'today',
                        style: style,
                        chatroom: this.props.route.params.room
                    });
                });
            });
        });
    }

    submitChatMessage() {
        this.props.route.params.socket.emit('createMessage', {
            content: this.state.chatMessage,
            room: this.props.route.params.room
        });
        this.setState({ chatMessages: [...this.state.chatMessages, {content: this.state.chatMessage, sender: 'Vinesh', style: 'rightMessage'}] });
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
                        <Text style={styles.sender}>{chatMessage.sender}</Text>
                        <Text>{chatMessage.content}</Text>
                    </View>
                )
            }
        });

        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    style={styles.container}
                    ref={ref => {this.scrollView = ref}}
                    onContentSizeChange={() => this.scrollView.scrollToEnd({animated: true})}>
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
        paddingVertical: 5,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        margin: 2,
        marginLeft: 5,
        maxWidth: '80%'
    },
    rightMessage: {
        color: '#110A09',
        alignSelf: 'flex-end',
        backgroundColor: '#90EE90',
        padding: 10,
        paddingVertical: 5,
        borderRadius: 15,
        borderBottomRightRadius: 0,
        margin: 2,
        marginRight: 5
    },
});