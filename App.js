/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Hello world!</Text>
        <View style={styles.white}></View>
        <View style={styles.blue}></View>
        <View style={styles.red}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  white: {
    flex: 1,
    backgroundColor: 'white',
  },
  blue: {
    flex: 1,
    backgroundColor: 'blue',
  },
  red: {
    flex: 1,
    backgroundColor: 'red',
  },
  text: {
    fontSize: 32,
  },
});

export default App;
