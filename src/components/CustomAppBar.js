import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';

const CustomAppBar = ({name, leftIcon, rightIcon, navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../assets/images/back_icon.png')}
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{name}</Text>
      <TouchableOpacity>{rightIcon}</TouchableOpacity>
    </View>
  );
};

export default CustomAppBar;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#370F24',
    height: 72,
    paddingHorizontal: 18,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir Medium',
    fontSize: 24.5,
    fontWeight: '500',
  },
  backIcon: {
    height: 24,
    width: 24,
  },
});