import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    StatusBar,
    View,
    TouchableOpacity,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export default class ForgotPassword extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        }
    }

    reset() {
        console.log(this.state.email);
        this.setState({ email: '' });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor='#4a9ede'
                    barStyle='light-content'
                />
                <Text style={styles.text}>Forgot Password</Text>
                <TextInput
                    selectionColor='#fff'
                    style={styles.inputBox}
                    placeholder="Enter your email..."
                    value={this.state.email}
                    onChangeText={(email) => {
                        this.setState({ email });
                    }}
                    placeholderTextColor='#eee'
                />
                <TouchableOpacity style={styles.button} onPress={() => {this.reset()}}>
                    <Text style={{ color: '#eee', paddingHorizontal: '38%' }}>Reset</Text>
                </TouchableOpacity>
                <View style={styles.goBackTextContent}>
                    <Text style={styles.goBackButton} onPress={() => {this.props.navigation.goBack()}}>Click here </Text>
                    <Text style={{ fontSize: 16 }}>to go back to login</Text>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#84c9ff'
    },
    text: {
        marginTop: '40%',
        fontSize: 25,
        marginVertical: 10
    },
    inputBox: {
        borderRadius: 25,
        width: '90%',
        backgroundColor: '#2686cf',
        marginTop: 10,
        marginVertical: 5,
        color: '#eee',
        paddingHorizontal: 16,
    },
    button: {
        borderRadius: 25,
        backgroundColor: '#074473',
        marginTop: 10,
        paddingHorizontal: 16,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '40%'
    },
    goBackTextContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    goBackButton: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#2686cf'
    }
});