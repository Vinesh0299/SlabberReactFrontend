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

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
    }

    login() {
        console.log('login');
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor='#4a9ede'
                    barStyle='light-content'
                />
                <Text style={styles.text}>Sign Up</Text>
                <TextInput
                    selectionColor='#fff'
                    style={styles.inputBox}
                    placeholder="Enter your email..."
                    placeholderTextColor='#eee'
                />
                <TextInput
                    selectionColor='#fff'
                    style={styles.inputBox}
                    placeholder="Enter your password..."
                    placeholderTextColor='#eee'
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={{ color: '#eee', paddingHorizontal: '36%' }}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.loginTextContent}>
                    <Text style={{ fontSize: 16 }}>Already have an account? </Text>
                    <Text style={styles.loginButton} onPress={() => {this.props.navigation.navigate('Login')}}>Log In</Text>
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
    loginTextContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    loginButton: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#2686cf'
    }
});