/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Detail from './Detail';
import Tracker from './Tracker';
import Global from './constants/global';
import ListCountries from './ListCountries';

const Stack = createStackNavigator();

async function updateDb() {
  fetch(Global.urlPrimorye)
    .then(res => res.json())
    .then(json => AsyncStorage.setItem('@json-prim', JSON.stringify(json)));
  fetch(Global.urlWordConfirmed)
    .then(res => res.text())
    .then(text => AsyncStorage.setItem('@json-confirm', text));
  fetch(Global.urlWordMortality)
    .then(res => res.text())
    .then(text => AsyncStorage.setItem('@json-death', text));
  fetch(Global.urlWordRecovered)
    .then(res => res.text())
    .then(text => AsyncStorage.setItem('@json-recover', text));
}

function App() {
  updateDb();

  AsyncStorage.getItem('@json-name').then(item => {
    if (item === null) {
      AsyncStorage.setItem('@json-name', 'Primorsky krai');
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="covid tracker" component={Tracker} />
        <Stack.Screen name="choose region" component={ListCountries} />
        <Stack.Screen name="detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({});

export default App;
