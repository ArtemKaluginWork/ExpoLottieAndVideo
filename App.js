import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';


export default class App extends Component {
    render() {
      return (
        <View style={styles.main}>
          <AppNavigator />
        </View>
      );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
