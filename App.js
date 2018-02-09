import React, { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { Vitality } from './Vitality-react.js';


export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    var vitality = new Vitality();
    return vitality
      .login({username: '', password: ''})
      .then(() => {
        console.log('Getting weekly point');
        return vitality.getWeeklypoints();
      })
      .then(weeklyPoints => {
        this.setState(
          {
            isLoading: false,
            text: 'Weekly points ' + weeklyPoints,
          },
          function() {
            // do something with new state
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, paddingTop: 20 }}>
        <Text>{this.state.text}</Text>
      </View>
    );
  }
}
