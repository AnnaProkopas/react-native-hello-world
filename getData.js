import Global from './Global';
import AsyncStorage from '@react-native-community/async-storage';
import {readString} from 'react-papaparse';

async function getDataForCountry(name) {
  return new Promise((resolve, reject) => {
    var json = {
      date_value: [],
      confirmed: [],
      mortality: [],
      recovered: [],
    };
    fetch(Global.urlWordConfirmed)
      .then(res => res.text())
      .then(text => {
        var result = readString(text).data;
        var n_column = result[0].length;
        json.confirmed = result[Global.confirmedToIndex[name][0]]
          .slice(4)
          .map(x => +x);
        for (var pos = 1; pos < Global.confirmedToIndex[name].length; pos++) {
          for (var i = 4; i < n_column; i++) {
            json.confirmed[i - 4] += +result[
              Global.confirmedToIndex[name][pos]
            ][i];
          }
        }
        for (var i = 4; i < n_column; i++) {
          var [month, day, year] = result[0][i].split('/');
          json.date_value[i - 4] = day + '-' + month + '-20' + year;
        }
      });
    fetch(Global.urlWordMortality)
      .then(res => res.text())
      .then(text => {
        var result = readString(text).data;
        var n_column = result[0].length;
        json.mortality = result[Global.mortalityToIndex[name][0]]
          .slice(4)
          .map(x => +x);
        for (var pos = 1; pos < Global.mortalityToIndex[name].length; pos++) {
          for (var i = 4; i < n_column; i++) {
            json.mortality[i - 4] += +result[
              Global.mortalityToIndex[name][pos]
            ][i];
          }
        }
      });
    fetch(Global.urlWordRecovered)
      .then(res => res.text())
      .then(text => {
        var result = readString(text).data;
        var n_column = result[0].length;
        json.recovered = result[Global.recoveredToIndex[name][0]]
          .slice(4)
          .map(x => +x);
        for (var pos = 1; pos < Global.recoveredToIndex[name].length; pos++) {
          for (var i = 4; i < n_column; i++) {
            json.recovered[i - 4] += +result[
              Global.recoveredToIndex[name][pos]
            ][i];
          }
        }
      });
    resolve(json);
  });
}

async function setJsonFromUrl(name) {
  // return new Promise((resolve, reject) => {
  // console.log(name);
  var jsn;
  if (name == 'Primorsky krai') {
    var res = await fetch(Global.urlPrimorye);
    jsn = await res.json();
      // .then(res => )
      // .then(json => {
      //   AsyncStorage.setItem('@json-data', JSON.stringify(json));
      // });
  } else {
    var jsn = await getDataForCountry(name);//.then(json => {
      // console.log("after download");
      // console.log(json);
      // return json;
      // AsyncStorage.setItem('@json-data', JSON.stringify(json)).then(() => {
      //   console.log("after write");
      //   AsyncStorage.setItem('@json-name', name);
      //   // func();
      //   return json;
      // });
    // });
  }
  return jsn;
  // }
}

// async function updateDb() {
//   fetch(Global.urlPrimorye).then(res => res.json)
// }

export default setJsonFromUrl;
