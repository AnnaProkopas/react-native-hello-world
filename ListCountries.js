import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';
import Global from './Global';
import setJsonFromUrl from './getData';

class ListCountries extends Component {
  state = {item: 'Primorsky krai', visible: false};

  updateData = jsn => {
    // console.log(this.props);
    this.props.route.params.updateData(jsn);
  };

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
                <TouchableHighlight
                  underlayColor="#0288D1"
                  onPress={() => {
                    AsyncStorage.setItem('@json-name', item);
                    this.setState({item});
                  }}
                  style={[styles.choosedBtn, styles.btn]}>
                  <Text>{item}</Text>
                </TouchableHighlight>
              );
            } else {
              return (
                <TouchableHighlight
                  underlayColor="#0288D1"
                  onPress={() => {
                    // setJsonFromUrl(item).then(jsn => {
                    //   console.log('i have been back');
                    //   console.log(jsn);
                    //   this.updateData(jsn);
                    // });
                    AsyncStorage.setItem('@json-name', item);
                    this.setState({item});
                    navigate('covid tracker');
                  }}
                  style={[styles.notChoosedBtn, styles.btn]}>
                  <Text>{item}</Text>
                </TouchableHighlight>
              );
            }
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    alignItems: 'center',
    borderWidth: 1,
  },
  choosedBtn: {
    backgroundColor: '#64b5f6',
  },
  notChoosedBtn: {
    backgroundColor: '#53a4e5',
  },
  stylOld: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  styleNew: {
    flex: 1,
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
});

export default ListCountries;
