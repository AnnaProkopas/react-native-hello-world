import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Header(props) {
  // {title} - props, сокращенно от properties
  return (
    <View style={styles.header}>
      <Text style={styles.text}>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 32,
  },
});

export default Header;
