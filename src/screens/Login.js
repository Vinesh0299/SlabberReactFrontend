import React from 'react';
import {
    StyleSheet,
    Text,
    SafeAreaView,
    StatusBar,
    View,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('User').then((data) => {
            const user = {
                token: JSON.parse(data).token
            }
            fetch('https://slabber.herokuapp.com/login/', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            }).then((response) => {
                if(response.status === 200) {
                    response.json().then((newData) => {
                        const saveData = {
                            message: JSON.parse(data).message,
                            token: JSON.parse(data).token,
                            name: JSON.parse(data).name,
                            email: JSON.parse(data).email,
                            chatrooms: newData.chatrooms,
                            friends: newData.friends
                        }
                        AsyncStorage.setItem('User', JSON.stringify(saveData)).then((data) => {
                            this.props.navigation.reset({
                                index: 0,
                                routes: [{ name: 'Home' }]
                            });
                        });
                    });
                }
            });
        });
    }

    submitDetail() {
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        fetch('https://slabber.herokuapp.com/login/', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((response) => {
            if(response.status === 404) Alert.alert('Incorrect Email', 'No user has registrated with this email. Try a different email or create a new account');
            else if(response.status === 406) Alert.alert('Incorrect Password');
            else if(response.status === 401) Alert.alert('Email not verified', 'This user account is not verified yet. Please verify it first before logging in. Check your email for verification link');
            else if(response.status === 200) {
                response.json().then((data) => {
                    AsyncStorage.setItem('User', JSON.stringify(data)).then((data) => {
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'Home' }]
                        });
                    });
                });
            }
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor='#4a9ede'
                    barStyle='light-content'
                />
                <Text style={styles.text}>Log In</Text>
                <TextInput
                    selectionColor='#fff'
                    style={styles.inputBox}
                    placeholder="Enter your email..."
                    placeholderTextColor='#eee'
                    value={this.state.email}
                    onChangeText={(email) => {
                        this.setState({ email });
                    }}
                />
                <TextInput
                    selectionColor='#fff'
                    style={styles.inputBox}
                    placeholder="Enter your password..."
                    placeholderTextColor='#eee'
                    value={this.state.password}
                    onChangeText={(password) => {
                        this.setState({ password });
                    }}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={() => {this.submitDetail()}}>
                    <Text style={{ color: '#eee', paddingHorizontal: '37%' }}>Log In</Text>
                </TouchableOpacity>
                <View style={styles.resetPassword}>
                    <Text style={{ fontSize: 16 }}>Forgot Password? Click here to </Text>
                    <Text style={styles.signupButton} onPress={() => {this.props.navigation.navigate('ForgotPassword')}}>Reset</Text>
                </View>
                <View style={styles.signupTextContent}>
                    <Text style={{ fontSize: 16 }}>Don't have an account yet? </Text>
                    <Text style={styles.signupButton} onPress={() => {this.props.navigation.navigate('Signup')}}>Sign Up</Text>
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
        justifyContent: 'center'
    },
    signupTextContent: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    signupButton: {
        fontSize: 16,
        fontWeight: "bold",
        color: '#2686cf'
    },
    resetPassword: {
        marginTop: 5,
        flexDirection: 'row',
        marginBottom: '40%'
    }
});