/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet, View, ScrollView, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import {readString} from 'react-papaparse';
// import {SideMenu, ListItem, List} from 'react-native-elements';
// import Tracker from './Tracker';
// import csv from 'csvtojson';
import Detail from './Detail';
import Tracker from './Tracker';
import Global from './Global';

const Tab = createBottomTabNavigator();
const Home = createStackNavigator();
// const SideMenu = require('react-native-side-menu');

class AppNavigator extends Component {
  getJsonFromUrl(name) {
    if (name == 'Primorsky krai') {
      fetch(Global.urlPrimorye).then(res => {
        AsyncStorage.setItem('@json-data', JSON.stringify(res.json().days));
      });
    } else {
      var json = [];
      fetch(Global.urlWordConfirmed)
        .then(res => res.text())
        .then(text => {
          var result = readString(text).data;
          var n_column = result[0].length;
          for (var i = 4; i < n_column; i++) {
            json.push({
              date_value: result[0][i] + '20',
              confirmed: 0,
              sick: 0,
              mortality: 0,
              recovered: 0,
            });
          }
          for (var pos = 0; pos < Global.confirmedToIndex[name].length; pos++) {
            for (var i = 4; i < n_column; i++) {
              json[i - 4].confirmed += Number(
                result[Global.confirmedToIndex[name][pos]][i],
              );
            }
          }
        });
      fetch(Global.urlWordMortality)
        .then(res => res.text())
        .then(text => {
          var result = readString(text).data;
          var n_column = result[0].length;
          for (var pos = 0; pos < Global.mortalityToIndex[name].length; pos++) {
            for (var i = 4; i < n_column; i++) {
              json[i - 4].mortality += Number(
                result[Global.mortalityToIndex[name][pos]][i],
              );
            }
          }
        });
      fetch(Global.urlWordRecovered)
        .then(res => res.text())
        .then(text => {
          var result = readString(text).data;
          var n_column = result[0].length;
          for (var pos = 0; pos < Global.recoveredToIndex[name].length; pos++) {
            for (var i = 4; i < n_column; i++) {
              json[i - 4].recovered += Number(
                result[Global.recoveredToIndex[name][pos]][i],
              );
              json[i - 4].sick =
                json[i - 4].confirmed -
                json[i - 4].mortality -
                json[i - 4].recovered;
            }
          }
          console.log(json);
        });
    }
  }
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
    this.getJsonFromUrl('Russia');
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
      <Home.Navigator>
        <Home.Screen name="COVID TRACKER" component={AppNavigator} />
      </Home.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
