/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

function A(props) {
  return (
    <View style={styles.A}>
      <Text>A</Text>
      <Button title="Go to B" onPress={() => props.navigation.navigate('B')} />
    </View>
  );
}

function B(props) {
  return (
    <View style={styles.B}>
      <Text>B</Text>
      <Button title="Go to A" onPress={() => props.navigation.navigate('A')} />
      <Button title="Go to B" onPress={() => props.navigation.push('B')} />
      <Button title="Go back" onPress={() => props.navigation.goBack()} />
      <Button title="Go back" onPress={() => props.navigation.pop()} />
    </View>
  );
}

class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="A" component={A} />
          <Stack.Screen name="B" component={B} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  A: {
    flex: 1,
    backgroundColor: 'pink',
  },
  B: {
    flex: 1,
    backgroundColor: 'blue',
  },
});

export default App;
