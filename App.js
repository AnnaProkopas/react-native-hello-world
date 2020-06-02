/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Text, Button} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {readString} from 'react-papaparse';
import Detail from './Detail';
import Tracker from './Tracker';
import Global from './Global';
import ListCountries from './ListCountries';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class MainNavigator extends Component {
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
    AsyncStorage.getItem('@json-name').then(value => {
      if (value == null) {
        value = 'Primorsky krai';
      }
      this.setState({name: value});
      Global.setJsonFromUrl(value);
    });
  }

  render() {
    AsyncStorage.getItem('@json-name').then(value => {
      if (value != this.state.name) {
        this.setState({name: value});
        this.setJsonFromUrl(value);
      }
    });
    return (
      <Tab.Navigator>
        <Tab.Screen name="Tracker" component={Tracker} />
        <Tab.Screen name="Detail" component={Detail} />
      </Tab.Navigator>
    );
  }
}

function MainToList(props) {
  return (
    <>
      <Button
        title="Choose another region"
        onPress={() => props.navigation.navigate('choose region')}
      />
      <MainNavigator />
    </>
  );
}

function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="covid tracker" component={MainToList} />
        <Stack.Screen name="choose region" component={ListCountries} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
