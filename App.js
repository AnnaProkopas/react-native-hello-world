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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
      <Tab.Navigator>
        <Tab.Screen name="C" component={C} />
        <Tab.Screen name="D" component={D} />
      </Tab.Navigator>
    </View>
  );
}

function C(props) {
  return (
    <View style={styles.yellow}>
      <Text>C</Text>
    </View>
  );
}

function D(props) {
  return (
    <View style={styles.red}>
      <Text>D</Text>
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
  yellow: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  red: {
    flex: 1,
    backgroundColor: 'red',
  },
});

export default App;
