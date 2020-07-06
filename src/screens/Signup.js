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
import DropDownPicker from 'react-native-dropdown-picker';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
            username: '',
            country: '',
            gender: '',
            password: '',
            rePassword: ''
        }
    }

    signup() {
        const user = {
            username: this.state.username,
            fullname: this.state.name,
            gender: this.state.gender.value,
            email: this.state.email,
            country: this.state.country,
            password: this.state.password
        }
        if(this.state.password !== this.state.rePassword) {
            Alert.alert('Different Password', 'Your entered password do not match. Please try again');
        } else {
            fetch('https://slabber.herokuapp.com/signup/',{
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then((json) => {
                if(json.error === 0) Alert.alert('User added successfully', 'Check your mail to verfiy your account');
                else if(json.error === 1) Alert.alert('Username already taken', 'Try using another username');
                else if(json.error === 2) Alert.alert('Email already registered', 'This email is already registered with us');
            });
        }
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
                    placeholder="Enter your Name..."
                    placeholderTextColor='#eee'
                    value={this.state.name}
                    onChangeText={(name) => {
                        this.setState({ name });
                    }}
                />
                <TextInput
                    selectionColor='#fff'
                    style={styles.inputBox}
                    placeholder="Create your Username..."
                    placeholderTextColor='#eee'
                    value={this.state.username}
                    onChangeText={(username) => {
                        this.setState({ username });
                    }}
                />
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
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        selectionColor='#fff'
                        style={styles.inputBoxShort}
                        placeholder="Country"
                        placeholderTextColor='#eee'
                        value={this.state.country}
                        onChangeText={(country) => {
                            this.setState({ country });
                        }}
                    />
                    <DropDownPicker
                        items={[
                            {label: 'Male', value: 'Male'},
                            {label: 'Female', value: 'Female'},
                            {label: 'Other', value: 'Other'},
                        ]}
                        placeholder="Gender"
                        placeholderStyle={{color: '#fff'}}
                        showArrow={false}
                        style={styles.inputBoxShort}
                        containerStyle={{height: '100%', width: '100%', marginRight: '-55%'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        onChangeItem={gender => this.setState({ gender })}
                    />
                </View>
                <TextInput
                    selectionColor='#fff'
                    style={styles.inputBox}
                    placeholder="Create a Password..."
                    placeholderTextColor='#eee'
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={(password) => {
                        this.setState({ password });
                    }}
                />
                <TextInput
                    selectionColor='#fff'
                    style={styles.inputBox}
                    placeholder="Re-enter Password..."
                    placeholderTextColor='#eee'
                    secureTextEntry={true}
                    value={this.state.rePassword}
                    onChangeText={(rePassword) => {
                        this.setState({ rePassword });
                    }}
                />
                <TouchableOpacity style={styles.button} onPress={() => {this.signup()}}>
                    <Text style={{ color: '#eee', paddingHorizontal: '36%' }}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.loginTextContent}>
                    <Text style={{ fontSize: 16 }}>Already have an account? </Text>
                    <Text style={styles.loginButton} onPress={() => {this.props.navigation.goBack()}}>Log In</Text>
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
        marginTop: '5%',
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
    inputBoxShort: {
        borderRadius: 25,
        width: '45%',
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
        marginBottom: '3%'
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