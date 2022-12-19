import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-crop-picker';
const ImagePickerComponent = () => {
  const {width, height} = useWindowDimensions();
  const [imageUri, setImageUri] = useState('');

  const getImageFromCamera = async () => {
    ImagePicker.openCamera({
      width: 104,
      height: 104,
      cropping: true,
    }).then(image => {
      // console.log(image);
      setImageUri(`file://${image.path}`);
      //   const {path, filename, mime} = image;
      //   getImageUri({path, filename, mime});
    });
  };

  const getImageFromGallary = async () => {
    ImagePicker.openPicker({
      width: 104,
      height: 104,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      // console.log(image);
      setImageUri(`file://${image.path}`);
      const {path, filename, mime} = image;
      //   getImageUri({path, filename, mime});
    });
  };

  const createThreeButtonAlert = () =>
    Alert.alert('Select Picture From', '', [
      {
        text: 'Camera',
        onPress: () => getImageFromCamera(),
      },
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Gallary',
        onPress: () => getImageFromGallary(),
      },
    ]);
  return (
    <View style={styles.imageContainer}>
      <Image
        source={
          imageUri
            ? {uri: imageUri}
            : require('../../assets/images/restaurant.png')
        }
        style={styles.image}
      />
      <TouchableOpacity
        onPress={() => {
          createThreeButtonAlert();
        }}>
        <View style={styles.addImageContainer}>
          <Icon name="camera-plus-outline" size={34} color="#8D8D8D" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ImagePickerComponent;
const styles = StyleSheet.create({
  addImageContainer: {
    height: 65,
    width: 65,
    borderRadius: 5,
    marginRight: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC',
  },
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
