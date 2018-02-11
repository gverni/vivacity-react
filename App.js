import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Vivacity from './src/VivacityMain'

global.vivacity = new Vivacity()

export default class VivacityApp extends Component {
  render() {
    return (
     <Vivacity />
    );
  }
}

AppRegistry.registerComponent('VivacityApp', () => VivacityApp);