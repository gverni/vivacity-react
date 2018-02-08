import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      text: 'Hello'
    }
  }

  componentDidMount () {
    this.setState((previousState) => {
      return {text: 'Log-in....'}
    })

    loginVitality()
     .then(response => response.text())
     .then(responseBody => {
       this.setState({text: 'login succesful!' + responseBody})
     })
     .catch((err) => (
       this.setState({text: 'Error login' + err})
     ))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
