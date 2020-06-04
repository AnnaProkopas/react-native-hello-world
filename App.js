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
import setJsonFromUrl from './getData';
import ListCountries from './ListCountries';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

class MainNavigator extends Component {
  state = {
    json: null,
  };

  componentDidMount() {
    if (this.props.json_data === null) {
      AsyncStorage.getItem('@json-name').then(value => {
        if (value == null) {
          value = 'Primorsky krai';
        }
        this.state.name = value;
        setJsonFromUrl(value).then(jsn => this.setState({json: jsn}));
      });
    } else {
      this.state.json = this.props.json_data;
    }
  }

  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen
          name="Tracker"
          component={Tracker}
          initialParams={{json: this.props.json_data}}
        />
        <Tab.Screen name="Detail" component={Detail} />
      </Tab.Navigator>
    );
  }
}

class MainToList extends Component {
  state = {
    json: null,
  };
  updateData = jsn => {
    console.log('i catch it!!');
    this.setState({json: jsn});
    this.props.navigation.navigate('Tracker', {json: jsn});
  };
  render() {
    return (
      <>
        <Button
          title="Choose another region"
          onPress={() =>
            this.props.navigation.navigate('choose region', {
              updateData: this.updateData,
            })
          }
        />
        <MainNavigator json_data={this.state.json} />
      </>
    );
  }
}

function App() {
  // constructor() {

  // }

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
