import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

const PrimaryButton = ({text, onPress}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
    backgroundColor: '#351547',
  },
  text: {
    fontFamily: 'Avenir Medium',
    fontSize: 18,
    color: '#F7F7F7',
    fontWeight: '500',
  },
});
