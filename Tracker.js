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
  Button,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
// import {LineChart} from 'react-native-chart-kit';
import PureChart from 'react-native-pure-chart';
// import {Divider} from 'reat-native-elements';
import Header from './Header';

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
    this.getData();
    console.log('Hello from ComponentDidMount');
  }

  async getData() {
    try {
      var response = await fetch(this.url);
      var json = await response.json();
      this.setState({json: json.days});
    } catch (error) {
      alert('FAILED with ' + error.message);
    }
  }

  render() {
    var flatData = [];
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
    if (this.state.json !== null) {
      for (var k in this.state.json) {
        flatData.push(this.state.json[k]);
      }
      confirmed = flatData[flatData.length - 1].confirmed;
      sick = flatData[flatData.length - 1].sick;
      death = flatData[flatData.length - 1].mortality;
      chart.date_value = flatData.map(a => {
        return a.date_value;
      });
      chart.confirmed.data = flatData
        .map(a => {
          return {x: a.date_value, y: a.confirmed};
        })
        .reverse();
      chart.death.data = flatData
        .map(a => {
          return {x: a.date_value, y: a.mortality};
        })
        .reverse();
      chart.recovered.data = flatData
        .map(a => {
          return {x: a.date_value, y: a.recovered};
        })
        .reverse();
    }
    console.log(chart.death);
    console.log(chart.confirmed);
    return (
      <View style={styles.container}>
        <Header style={styles.header} title="COVID TRACKER" />
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
        {/* <ScrollView horizontal={true}>
          <LineChart
            data={{
              labels: chart.date_value,
              datasets: [
                {
                  data: chart.confirmed,
                },
                // {
                //   data: chart.death,
                // },
                // {
                //   data: chart.recovered,
                // },
              ],
            }}
            width={flatData.length * 30} // Dimensions.get('window').width} // from react-native
            height={400}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            style={{marginVertical: 8}}
          />
        </ScrollView> */}
        {/* <View style={styles.list}>
          <FlatList
            data={flatData}
            renderItem={({item, index}) => (
              <Text>
                {index}: ({item.date_value}) {item.confirmed}
              </Text>
            )}
            keyExtractor={i => i.date_value}
          />
        </View> */}
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
