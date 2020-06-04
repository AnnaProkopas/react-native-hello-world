import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Detail extends Component {
  state = {
    json: {date_value: ['2020-01-01'], confirmed: [0], mortality: [0]},
  };

  dataToList({date_value: d_v, confirmed: conf, mortality: mort}) {
    var obj = [];
    for (var i = 0; i < d_v.length; i++) {
      obj.push({date_value: d_v[i], confirmed: conf[i], mortality: mort[i]});
    }
    return obj;
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log(this.props.navigation.dangerouslyGetParent().getParam('json_data'));
      // AsyncStorage.getItem('@json-name').then(jsonValue => {
      //   if (jsonValue != this.state.name) {
      //     this.setState({name: jsonValue});
      //     AsyncStorage.getItem('@json-data').then(jsnV => {
      //       if (jsnV != null) {
      //         jsnV = JSON.parse(jsnV);
      //         this.setState({
      //           json: this.dataToList(
      //             jsnV.date_value,
      //             jsnV.confirmed,
      //             jsnV.mortality,
      //           ),
      //         });
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
    // AsyncStorage.getItem('@json-name').then(jsonValue => {
    //   if (jsonValue != null) {
    //     this.setState({name: jsonValue});
    //   }
    // });
  }

  render() {
    console.log(this.state.json);
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.cell}>
            <Text style={styles.header_table_text}>date</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.header_table_text}>confirmed</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.header_table_text}>death</Text>
          </View>
        </View>
        <View style={{height: 4, backgroundColor: 'white'}} />
        <FlatList
          ItemSeparatorComponent={({leadingItem}) => (
            <View style={styles.separator} />
          )}
          data={this.dataToList(this.state.json)}
          renderItem={({item, index}) => (
            <View style={{flexDirection: 'row'}}>
              <View style={styles.cell}>
                <Text style={styles.cell_text}>{item.date_value}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cell_text}>{item.confirmed}</Text>
              </View>
              <View style={styles.cell}>
                <Text style={styles.cell_text}>{item.mortality}</Text>
              </View>
            </View>
          )}
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
  cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  header_table_text: {
    fontSize: 19,
  },
  cell_text: {
    fontSize: 16,
  },
  separator: {
    height: 6,
  },
});

export default Detail;
