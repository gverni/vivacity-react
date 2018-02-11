import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import LoginScreen from './components/Login/LoginScreen';
import SecondScreen from './components/Login/SecondScreen';

// function fetchVitalityPoints() {
//   var vitality = new Vitality();
//   // await AsyncStorage.setItem('credentials', '{"username": "gverni", "password": "Viuseppe=30"}')
//   const credentials = await AsyncStorage.getItem('credentials')
//   return vitality
//     .login(JSON.parse(credentials))
//     .then(() => {
//       console.log('Getting weekly point');
//       return vitality.getWeeklypoints();
//     })
//     .then(weeklyPoints => {
//       this.setState(
//         {
//           isLoading: false,
//           text: 'Weekly points ' + weeklyPoints,
//         },
//         function() {
//           // do something with new state
//         }
//       );
//     })
//     .catch(error => {
//       console.error(error);
//     });
// }

export default class Vivacity extends Component {
  render() {
    return (
      <Router>
      <Scene key="root">
        <Scene key="loginScreen"
          component={LoginScreen}
          animation='fade'
          hideNavBar={true}
          initial={true}
        />
        <Scene key="secondScreen"
          component={SecondScreen}
          animation='fade'
          hideNavBar={true}
        />
      </Scene>
    </Router>
    );
  }
}
