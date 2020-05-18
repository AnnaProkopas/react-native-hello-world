/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
// import {Divider} from 'reat-native-elements';
import Header from './header';

class Tracker extends Component {
  url =
    'https://raw.githubusercontent.com/Barrowland/covid-19-statistics-Primorsky-Krai/master/stat-covid-19-prim.json';

  state = {
    json: null,
  };

  constructor(params) {
    super();
    console.log('Hello from Constructor');
  }

  componentDidMount() {
    console.log('Hello from ComponentDidMount');
  }

  async getData() {
    try {
      var response = await fetch(this.url);
      var json = await response.json();
      console.log(json);
      this.setState({json: json.days});
    } catch (error) {
      alert('FAILED with ' + error.message);
    }
  }

  render() {
    console.log('Hello from Render');
    var flatData = [];
    if (this.state.json !== null) {
      for (var k in this.state.json) {
        flatData.push(this.state.json[k]);
      }
      // var keys = Object.keys(this.state.json);
      console.log(flatData);
    }
    return (
      <View style={styles.container}>
        <Header title="COVID TRACKER" />
        <Button title="Get data" onPress={() => this.getData()} />
        <FlatList
          data={flatData}
          renderItem={({item, index}) => (
            <Text>
              {index}: ({item.date_value}) {item.confirmed}
            </Text>
          )}
          keyExtractor={i => i.date_value}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'yellow',
  },
  text: {
    fontSize: 32,
  },
  separator: {
    height: 2,
    backgroundColor: 'grey',
  },
});

export default Tracker;
