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
      this.setState({json: this.props.route.params.json});
      // AsyncStorage.getItem('@json-name').then(nameValue => {
      //   console.log('name = ' + nameValue + ', read = ' + nameValue);
      //   if (nameValue != this.state.name) {
      //     console.log("update name");
      //     this.setState({name: nameValue});
      //     AsyncStorage.getItem('@json-data').then(jsonValue => {
      //       if (jsonValue != null) {
      //         console.log('update data');
      //         console.log(JSON.parse(jsonValue));
      //         this.setState({json: JSON.parse(jsonValue)});
      //       }
      //     });
      //   }
      // });
    });
    // AsyncStorage.getItem('@json-data').then(jsonValue => {
    //   if (jsonValue != null) {
    //     this.setState({json: JSON.parse(jsonValue)});
    //   }
    // });
    // AsyncStorage.getItem('@json-name').then(nameValue => {
    //   if (nameValue != null) {
    //     this.setState({name: nameValue});
    //   }
    // });
  }

  preparChart(x, y) {
    var chart = [];
    for (var i = 0; i < x.length; i++) {
      chart.push({x: x[i], y: y[i]});
    }
    return chart;
  }

  render() {
    console.log('tracker');
    // console.log(this.props);
    // console.log(this.props.navigation.getParam('json'));
    // console.log(this.props);
    console.log(this.state.json);
    var confirmed = 0,
      sick = 0,
      death = 0;
    var chart = {
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
    if (this.state.json != null) {
      // console.log(this.state.json["confirmed"]);
      var last = this.state.json.confirmed.length - 1;
      confirmed = this.state.json.confirmed[last];
      death = this.state.json.mortality[last];
      sick = confirmed - death - this.state.json.recovered[last];
      var x = this.state.json.date_value;
      chart.confirmed.data = this.preparChart(
        x,
        this.state.json.confirmed,
      ).reverse();
      chart.death.data = this.preparChart(
        x,
        this.state.json.mortality,
      ).reverse();
      chart.recovered.data = this.preparChart(
        x,
        this.state.json.recovered,
      ).reverse();
      console.log(chart.confirmed.data);
    }
    if (chart.death.data.length == 0) {
      console.log('length = 0, but json ==')
      console.log(this.state.json);
      return (
        <View style={styles.banner}>
          <Text style={[styles.banner_text, styles.orange]}>
            confirmed: {confirmed}
          </Text>
          <Text style={[styles.banner_text, styles.red]}>sick: {sick}</Text>
          <Text style={[styles.banner_text]}>death: {death}</Text>
        </View>
      );
    }
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
