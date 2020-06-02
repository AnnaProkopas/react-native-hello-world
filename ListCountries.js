import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, Button} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import Global from './Global';

class ListCountries extends Component {
  state = {item: 'Primorsky krai'};

  componentDidMount() {
    AsyncStorage.getItem('@json-name').then(item => {
      if (item === null) {
        item = 'Primorsky krai';
      }
      this.setState({item});
    });
  }

  render() {
    const {navigate} = this.props.navigation;

    return (
      <View>
        <FlatList
          data={Global.countries}
          renderItem={({item}) => {
            if (item == this.state.item) {
              return (
                <Button
                  title={item}
                  onPress={() => {
                    AsyncStorage.setItem('@json-name', item);
                    this.setState({item});
                  }}
                  color="#64b5f6"
                  style={styles.choosedBtn}
                />
              );
            } else {
              return (
                <Button
                  title={item}
                  onPress={() => {
                    Global.setJsonFromUrl(item);
                    AsyncStorage.setItem('@json-name', item);
                    console.log(item);
                    this.setState({item});
                    navigate('covid tracker');
                  }}
                />
              );
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  choosedBtn: {
    color: 'black',
  },
  notChoosedBtn: {},
});

export default ListCountries;
