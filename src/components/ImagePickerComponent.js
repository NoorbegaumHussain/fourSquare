import {View, StyleSheet, Image} from 'react-native';
import React from 'react';

const ImagePickerComponent = ({imageUri}) => {
  return (
    // <View style={styles.imageContainer}>
    <Image
      source={
        imageUri
          ? {uri: imageUri}
          : require('../../assets/images/restaurant.png')
      }
      style={styles.image}
    />
    // </View>
  );
};

export default ImagePickerComponent;
const styles = StyleSheet.create({
  image: {
    height: 65,
    width: 65,
    borderRadius: 5,
    marginRight: 24,
  },
  imageContainer: {
    flexDirection: 'row',
  },
});
