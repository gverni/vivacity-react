import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Dimensions from 'Dimensions'
import { StyleSheet, View, TextInput } from 'react-native'

export default class UserInput extends Component {
  render () {
    return (
      <View style={styles.inputWrapper}>
        <TextInput style={styles.input}
          placeholder={this.props.placeholder}
          secureTextEntry={this.props.secureTextEntry}
          autoCorrect={this.props.autoCorrect}
          autoCapitalize={this.props.autoCapitalize}
          returnKeyType={this.props.returnKeyType}
          placeholderTextColor='rgba(240, 53, 224, 0.2)'
          underlineColorAndroid='transparent' />
      </View>
    )
  }
}

UserInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  secureTextEntry: PropTypes.bool,
  autoCorrect: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  returnKeyType: PropTypes.string
}

const DEVICE_WIDTH = Dimensions.get('window').width

const styles = StyleSheet.create({
  input: {
    width: DEVICE_WIDTH - 40,
    height: 40,
    marginHorizontal: 20,
    paddingLeft: 10,
    borderRadius: 20,
    borderColor: '#F035E0',
    borderWidth: 1
  },
  inputWrapper: {
    flex: 1
  }
})
