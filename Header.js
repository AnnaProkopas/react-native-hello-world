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
  header: {
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#289AEC',
  },
  text: {
    fontSize: 28,
    color: '#FFFFFF',
  },
});

export default Header;
