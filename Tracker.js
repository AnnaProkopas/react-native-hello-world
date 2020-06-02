/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PureChart from 'react-native-pure-chart';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

class Tracker extends Component {
  state = {
    json: null,
    name: null,
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      AsyncStorage.getItem('@json-data').then(jsonValue => {
        if (jsonValue != null) {
          this.setState({json: JSON.parse(jsonValue)});
        }
      });
    });
    AsyncStorage.getItem('@json-data').then(jsonValue => {
      if (jsonValue != null) {
        this.setState({json: JSON.parse(jsonValue)});
      }
    });
    AsyncStorage.getItem('@json-name').then(jsonValue => {
      if (jsonValue != null) {
        this.setState({name: jsonValue});
      }
    });
  }

  render() {
    console.log(this.state.name);
    var confirmed = 0,
      sick = 0,
      death = 0;
    var chart = {
      date_value: ['2020-01-01'],
      confirmed: {
        seriesName: 'confirmed',
        data: [{x: '01-01', y: 0}],
        color: '#FF7000',
      },
      death: {
        seriesName: 'death',
        data: [{x: '01-01', y: 0}],
        color: '#D52F00',
      },
      recovered: {
        seriesName: 'recovered',
        data: [{x: '01-01', y: 0}],
        color: 'green',
      },
    };
    if (this.state.json) {
      // console.log(this.state.json);
      confirmed = this.state.json[this.state.json.length - 1].confirmed;
      sick = this.state.json[this.state.json.length - 1].sick;
      death = this.state.json[this.state.json.length - 1].mortality;
      chart.date_value = this.state.json.map(a => {
        return a.date_value;
      });
      chart.confirmed.data = this.state.json
        .map(a => {
          return {x: a.date_value, y: a.confirmed};
        })
        .reverse();
      chart.death.data = this.state.json
        .map(a => {
          return {x: a.date_value, y: a.mortality};
        })
        .reverse();
      chart.recovered.data = this.state.json
        .map(a => {
          return {x: a.date_value, y: a.recovered};
        })
        .reverse();
    }
    // console.log(chart.death);
    // console.log(chart.confirmed);
    return (
      <View style={styles.container}>
        <View style={styles.banner}>
          <Text style={[styles.banner_text, styles.orange]}>
            confirmed: {confirmed}
          </Text>
          <Text style={[styles.banner_text, styles.red]}>sick: {sick}</Text>
          <Text style={[styles.banner_text]}>death: {death}</Text>
        </View>
        <View style={styles.list}>
          <PureChart
            data={[chart.confirmed, chart.death, chart.recovered]}
            type="line"
            height={300}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  header: {
    flex: 1,
  },
  banner: {
    flex: 3,
  },
  list: {
    flex: 11,
    justifyContent: 'center',
  },
  banner_text: {
    fontSize: 30,
  },
  orange: {
    color: '#FF7000',
  },
  red: {
    color: '#D52F00',
  },
  separator: {
    height: 2,
    backgroundColor: 'grey',
  },
});

export default Tracker;
