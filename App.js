/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
// import Tracker from './Tracker';
import Detail from './Detail';
import Tracker from './Tracker';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

class AppNavigator extends Component {
  url =
    'https://raw.githubusercontent.com/Barrowland/covid-19-statistics-Primorsky-Krai/master/stat-covid-19-prim.json';

  state = {
    json_version: 0,
  };

  constructor(params) {
    super();
    AsyncStorage.getItem('@json-version').then(ver => {
      if (ver != null) {
        this.state.json_version = ver;
      }
    });
  }

  componentDidMount() {
    fetch(this.url)
      .then(res => res.json())
      .then(json => {
        if (json.days.length != this.state.json_version) {
          AsyncStorage.setItem('@json-data', JSON.stringify(json));
          AsyncStorage.setItem('@json-version', json.days.length.toString());
        }
      });
  }

  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Tracker" component={Tracker} />
        <Tab.Screen name="Detail" component={Detail} />
      </Tab.Navigator>
    );
  }
}

function App() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator>
        <HomeStack.Screen name="COVID TRACKER" component={AppNavigator} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
