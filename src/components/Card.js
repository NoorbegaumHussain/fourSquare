////**********Card JS*********///
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import React from 'react';

const Card = ({title = '', style}) => {
  const {width, height} = useWindowDimensions();
  return (
    <View style={[styles.container, {...style}, {width: width}]}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
  },
  text: {
    fontSize: 30,
  },
});
