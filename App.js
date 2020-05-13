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
  state = {
    label: 'Initialized',
  };

  constructor(params) {
    super();
    console.log('Hello from Constructor');
  }

  componentDidMount() {
    console.log('Hello from ComponentDidMount');
    this.setState({label: 'Changed'});
  }

  render() {
    console.log('Hello from Render');
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.label}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
  text: {
    fontSize: 32,
  },
});

export default App;
