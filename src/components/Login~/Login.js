import React, { Component } from 'react';
import { View, Image, StyleSheet, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm.js'

export default class Login extends Component {
  render() {
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <View style={styles.logoContainer}>
                    <Image resizeMode="contain" style={styles.logo} source={require('./128x128white.png')} />
         </View>

            <View style={styles.formContainer}>
                <LoginForm />
            </View>
       </KeyboardAvoidingView>
    );
  }

}

//define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    logoContainer:{
        alignItems: 'center',
        flex: 2,
        justifyContent: 'center'
    },
    formContainer: {
        flex: 1
    },
    logo: {
        position: 'absolute'
    }
})

