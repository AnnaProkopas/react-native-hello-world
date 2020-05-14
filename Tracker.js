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
    'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-03-07/2020-04-23';

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
      this.setState({json: json.data});
    } catch (error) {
      alert('FAILED with ' + error.message);
    }
  }

  render() {
    console.log('Hello from Render');
    var flatData = [];
    if (this.state.json !== null) {
      var keys = Object.keys(this.state.json);
      keys.forEach(i => {
        var record = this.state.json[i].RUS;
        flatData.push(record);
      });
      console.log(flatData);
    }
    return (
      <View style={styles.container}>
        <Header title="COVID TRACKER" />
        <Button title="Get data" onPress={() => this.getData()} />
        <ScrollView horizontal={true}>
          {flatData.map(i => {
            return (
              <View
                style={{
                  marginLeft: 1,
                  height: i.deaths,
                  width: 10,
                  backgroundColor: 'black',
                }}
              />
            );
          })}
        </ScrollView>
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
