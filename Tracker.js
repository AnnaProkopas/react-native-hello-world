/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import PureChart from 'react-native-pure-chart';
import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import setJsonFromUrl from './script/getData';

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
      console.log(this.props);
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
        <View style={[styles.header, styles.white]}>
          <Text style={styles.header_text}>{this.state.name}</Text>
          <TouchableHighlight
            underlayColor="#798fbd"
            style={styles.choose_btn}
            onPress={() => this.props.navigation.navigate('choose region')}>
            <Text style={styles.choose_btn_text}>choose another region</Text>
          </TouchableHighlight>
        </View>
        <View
          style={[
            this.state.visible === true ? styles.load : styles.container,
            styles.white,
          ]}>
          {this.state.visible ? (
            <ActivityIndicator
              color="#3b5998"
              size="large"
              style={styles.ActivityIndicatorStyle}
            />
          ) : (
            <>
              <View style={styles.banner}>
                <Text style={[styles.banner_text, styles.orange]}>
                  confirmed: {this.state.confirmed}
                </Text>
                <Text style={[styles.banner_text, styles.red]}>
                  sick: {this.state.sick}
                </Text>
                <Text style={[styles.banner_text]}>
                  died: {this.state.death}
                </Text>
              </View>
              <View style={styles.chart}>
                <PureChart
                  data={[
                    this.state.chart.confirmed,
                    this.state.chart.death,
                    this.state.chart.recovered,
                  ]}
                  type="line"
                  height={300}
                />
              </View>
              <TouchableHighlight
                underlayColor="#798fbd"
                style={styles.detail_btn}
                onPress={() =>
                  this.props.navigation.navigate('detail', {
                    json_data: this.state.json,
                  })
                }>
                <Icon name="list" color="#fff" />
              </TouchableHighlight>
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
  banner: {
    flex: 3,
  },
  banner_text: {
    fontSize: 30,
  },
  chart: {
    flex: 11,
    justifyContent: 'center',
  },
  orange: {
    color: '#FF7000',
  },
  red: {
    color: '#D52F00',
  },
  white: {
    backgroundColor: 'white',
  },
  load: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  detail_btn: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    margin: 20,
    width: 60,
    height: 60,
    backgroundColor: '#3b5998',
    borderRadius: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    height: 45,
    padding: 5,
  },
  header_text: {
    fontSize: 18,
    alignSelf: 'center',
  },
  choose_btn: {
    backgroundColor: '#3b5998',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 190,
  },
  choose_btn_text: {
    color: 'white',
    fontSize: 16,
  },
});

export default Tracker;
