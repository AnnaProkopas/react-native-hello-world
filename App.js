/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

function Header({title}) {
  // {title} - props, сокращенно от properties
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

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
        <Header title="HEAD" />
        <Text style={styles.text}>{this.state.label}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'yellow',
  },
  text: {
    fontSize: 32,
  },
  header: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default App;
