/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Button} from 'react-native';
import PureChart from 'react-native-pure-chart';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import setJsonFromUrl from './getData';

class Tracker extends Component {
  state = {
    visible: false,
    json: {
      date_value: ['2020-01-01'],
      confirmed: [0],
      mortality: [0],
      recovered: [0],
    },
    name: 'null',
    chart: {
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
    },
    confirmed: 0,
    death: 0,
    sick: 0,
  };

  prepareChart(x, y) {
    var chart = [];
    for (var i = 0; i < x.length; i++) {
      chart.push({x: x[i], y: y[i]});
    }
    return chart;
  }

  updateChart() {
    var last = this.state.json.confirmed.length - 1;
    this.setState({confirmed: this.state.json.confirmed[last]});
    this.setState({death: this.state.json.mortality[last]});
    this.setState({
      sick:
        this.state.confirmed -
        this.state.death -
        this.state.json.recovered[last],
    });
    var x = this.state.json.date_value;
    var chart = this.state.chart;
    chart.confirmed.data = this.prepareChart(
      x,
      this.state.json.confirmed,
    ).reverse();
    chart.death.data = this.prepareChart(
      x,
      this.state.json.mortality,
    ).reverse();
    chart.recovered.data = this.prepareChart(
      x,
      this.state.json.recovered,
    ).reverse();
    this.setState({chart: chart});
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      AsyncStorage.getItem('@json-name').then(nameValue => {
        if (this.state.name != nameValue) {
          this.setState({visible: true});
          setJsonFromUrl(nameValue).then(jsn => {
            this.setState({json: jsn});
            this.updateChart();
            this.setState({visible: false});
          });
          this.setState({name: nameValue});
        }
      });
    });
    AsyncStorage.getItem('@json-name').then(nameValue => {
      this.setState({name: nameValue});
      this.setState({visible: true});
      setJsonFromUrl(nameValue).then(jsn => {
        this.setState({json: jsn});
        this.updateChart();
        this.setState({visible: false});
      });
    });
  }

  render() {
    return (
      <>
        <Button
          title="Choose another region"
          onPress={() => this.props.navigation.navigate('choose region')}
        />
        <View
          style={this.state.visible === true ? styles.stylOld : styles.container}>
          {this.state.visible ? (
            <ActivityIndicator
            color="#009688"
              size="large"
              style={styles.ActivityIndicatorStyle}
            />
          ) : (
            <>
              <View style={styles.banner}>
                <Text style={[styles.banner_text, styles.orange]}>
                  confirmed: {this.state.confirmed}
                </Text>
                <Text style={[styles.banner_text, styles.red]}>sick: {this.state.sick}</Text>
                <Text style={[styles.banner_text]}>death: {this.state.death}</Text>
              </View>
              <View style={styles.list}>
                <PureChart
                  data={[this.state.chart.confirmed, this.state.chart.death, this.state.chart.recovered]}
                  type="line"
                  height={300}
                />
              </View>
              <Icon.Button
                name="list"
                backgroundColor="#3b5998"
                onPress={() => this.props.navigation.navigate('detail', {json_data: this.state.json})}>
                detail
              </Icon.Button>
            </>
          )}
        </View>
      </>
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
  stylOld: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleNew: {
    flex: 1,
    flexDirection: 'column',
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export default Tracker;
