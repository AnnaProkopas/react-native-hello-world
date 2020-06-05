import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Global from './constants/global';

class ListCountries extends Component {
  state = {item: 'Primorsky krai', visible: false};

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
            return (
              <TouchableHighlight
                underlayColor="#5b95d9"
                onPress={() => {
                  if (item != this.state.item) {
                    AsyncStorage.setItem('@json-name', item);
                    this.setState({item});
                    navigate('covid tracker');
                  }
                }}
                style={[
                  item == this.state.item
                    ? styles.choosedBtn
                    : styles.notChoosedBtn,
                  styles.btn,
                ]}>
                <Text>{item}</Text>
              </TouchableHighlight>
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btn: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
    height: 35,
  },
  choosedBtn: {
    backgroundColor: '#80bbff',
  },
  notChoosedBtn: {
    backgroundColor: '#c7e1ff',
  },
});

export default ListCountries;
