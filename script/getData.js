import Global from '../constants/global';
import AsyncStorage from '@react-native-community/async-storage';
import {readString} from 'react-papaparse';

async function getDataForCountry(name) {
  var json = {
    date_value: [],
    confirmed: [],
    mortality: [],
    recovered: [],
  };
  var text = await AsyncStorage.getItem('@json-confirm');
  var result = readString(text).data;
  var n_column = result[0].length;
  json.confirmed = result[Global.confirmedToIndex[name][0]]
    .slice(4)
    .map(x => +x);
  for (var pos = 1; pos < Global.confirmedToIndex[name].length; pos++) {
    for (var i = 4; i < n_column; i++) {
      json.confirmed[i - 4] += +result[Global.confirmedToIndex[name][pos]][i];
    }
  }
  for (var i = 4; i < n_column; i++) {
    var [month, day, year] = result[0][i].split('/');
    json.date_value[i - 4] = day + '-' + month + '-20' + year;
  }
  text = await AsyncStorage.getItem('@json-death');
  var result = readString(text).data;
  var n_column = result[0].length;
  json.mortality = result[Global.mortalityToIndex[name][0]]
    .slice(4)
    .map(x => +x);
  for (var pos = 1; pos < Global.mortalityToIndex[name].length; pos++) {
    for (var i = 4; i < n_column; i++) {
      json.mortality[i - 4] += +result[Global.mortalityToIndex[name][pos]][i];
    }
  }
  text = await AsyncStorage.getItem('@json-recover');
  var result = readString(text).data;
  var n_column = result[0].length;
  json.recovered = result[Global.recoveredToIndex[name][0]]
    .slice(4)
    .map(x => +x);
  for (var pos = 1; pos < Global.recoveredToIndex[name].length; pos++) {
    for (var i = 4; i < n_column; i++) {
      json.recovered[i - 4] += +result[Global.recoveredToIndex[name][pos]][i];
    }
  }
  return json;
}

async function setJsonFromUrl(name) {
  var jsn;
  if (name == 'Primorsky krai') {
    var jsnStr = await AsyncStorage.getItem('@json-prim');
    jsn = await JSON.parse(jsnStr);
  } else {
    var jsn = await getDataForCountry(name);
  }
  return jsn;
}
export default setJsonFromUrl;
