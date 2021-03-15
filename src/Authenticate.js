import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native'
import Auth0 from 'react-native-auth0';
import envs from '../config/env';

const auth0 = new Auth0({
    domain:envs.domain,
    clientId: envs.clientId,
})
console.log(auth0.domain);
console.log(auth0.clientId)

export default class Authenticate extends Component {
    constructor(props) {
        super(props);
        this.state= {
            accessToken:null,
        }
    }

    _onLogout = () => {
        auth0.webAuth.clearSession()
        .then(res => Alert.alert("Notice", "Logged Out!"))
        .catch(error => console.log(error));

    }

    _onLogin = () => {
        auth0.webAuth
            .authorize({scope: 'openid email profile'})
            .then(credentials => {
                Alert.alert("Notice", "Login Success");
                this.setState({accessToken:credentials.accessToken});
            })
            .catch(error => console.log(error));
    }

    render() {
        let loggedIn = this.state.accessToken === null ? false : true;
        return(
            <View style={StyleSheet.container}>
                <Text style={StyleSheet.header}> Demo Auth0- Login </Text>
                <Text style={StyleSheet.content}>
                    You are{loggedIn? ' ' : ' not '}logged in.</Text>
                    <Button onPress={loggedIn ? this._onLogout : this._onLogin}
                    title={loggedIn ? 'Log Out' : 'Log In'} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    header: {
        color: "white",
        fontSize: 19,
    },
    content: {
        color: "white",
        fontSize: 16,
    }
})
