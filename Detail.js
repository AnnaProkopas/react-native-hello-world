import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

class Detail extends Component {
  state = {
    json: {date_value: ['2020-01-01'], confirmed: [0], mortality: [0]},
  };

  dataToList({date_value: d_v, confirmed: conf, mortality: mort}) {
    var obj = [];
    for (var i = 0; i < d_v.length; i++) {
      obj.push({date_value: d_v[i], confirmed: conf[i], mortality: mort[i]});
    }
    return obj.reverse();
  }

  render() {
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
          data={this.dataToList(this.props.route.params.json_data)}
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
