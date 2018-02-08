import React, { Component } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const Vitality = require('./Vitality.js');
var vitality = new Vitality();

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    return vitality
      .login({ user: '', password: '' })
      .then(() => {
        return vitality.getWeeklypoints();
      })
      .then(weeklyPoints => {
        this.setState({
          isLoading: false,
          text: 'Weekly Points' + weeklyPoints,
        });
      })
      .catch(err => {
        console.log('Error: ' + err);
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