import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';

const OutlinedButton = ({
  text,
  source,
  style = {},
  buttonstyle = {},
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.enterButton, {...buttonstyle}]}>
        <Text style={[styles.enter, {...style}]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
  },
  enterButton: {
    boxSizing: 'border-box',
    height: 52,
    width: '100%',
    borderWidth: 0.8,
    borderColor: '#FFFFFF',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  enter: {
    color: '#FFFFFF',
    fontFamily: 'Avenir Book',
    fontSize: 20,
  },

  shareimage: {
    height: 12,
    width: 12,
  },
});
