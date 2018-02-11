import React, { Component } from 'react'
import {
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native'

import UserInput from './UserInput'

export default class Form extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPass: true,
      press: false
    }
    this.showPass = this.showPass.bind(this)
  }

  showPass () {
    this.state.press === false ? this.setState({ showPass: false, press: true }) : this.setState({ showPass: true, press: false })
  }

  render () {
    return (
      <KeyboardAvoidingView behavior='padding'
        style={styles.container}>
        <UserInput
          placeholder='Username'
          autoCapitalize={'none'}
          returnKeyType={'done'}
          autoCorrect={false} />
        <UserInput
          secureTextEntry={this.state.showPass}
          placeholder='Password'
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false} />
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.btnEye}
          onPress={this.showPass} />
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  btnEye: {
    position: 'absolute',
    top: 55,
    right: 28
  }
})
