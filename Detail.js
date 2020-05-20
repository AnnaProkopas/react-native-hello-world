import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PureChart from 'react-native-pure-chart';
import Header from './Header';

class Detail extends Component {
  state = {
    json: [{date_value: '2020.01.01', confirmed: 0}],
  };

  componentWillMount() {
    AsyncStorage.getItem('@json-data').then(jsonValue => {
      if (jsonValue != null) {
        this.setState({json: JSON.parse(jsonValue).days});
        console.log(this.state.json);
      }
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header style={styles.header} title="COVID TRACKER" />
        <FlatList
          // ItemSeparatorComponent={({leadingItem}) => {
          //   if (leadingItem.confirmed <= 10) {
          //     return <View style={styles.separator} />;
          //   } else {
          //     return null;
          //   }
          // }}
          data={this.state.json.reverse()}
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

export default Detail;
