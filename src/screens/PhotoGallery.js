import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import CustomAppBar from '../components/CustomAppBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getImagesById, uploadSingleImage} from '../services/auth';
import {useIsFocused} from '@react-navigation/native';
import {restructureObject} from '../utils/restructureObject';
import {createFormData} from '../utils/createFormData';
import ImagePickerComponent from '../components/ImagePickerComponent';
import ImagePicker from 'react-native-image-crop-picker';
import {createSingleImageFormData} from '../utils/createSingleImageFormData';

const PhotoGallery = ({navigation, route}) => {
  const [menuImages, setMenuImages] = useState([]);
  const [imagedata, setImgData] = useState();
  const [load, setLoad] = useState(false);
  const [imageuri, setImageUri] = useState('');
  const handlePhotoClick = (image, imageId, name) => {
    navigation.navigate('PhotoDetails', {
      image: image,
      imageId: imageId,
      name: name,
      placeName: route?.params?.placeName,
    });
  };

  const loadImages = async () => {
    const response = await getImagesById(route?.params?.placeId);

    if (response.status && response?.data?.data !== undefined) {
      setMenuImages(restructureObject(response?.data?.data));
    } else {
      console.log(response);
    }
  };

  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus === true) {
      loadImages();
      uploadImage();
    }
  }, [focus, imagedata, load]);

  const uploadImage = async () => {
    const obj = {
      placeId: route?.params?.placeId,
      image: imagedata,
    };
    if (imagedata !== undefined) {
      const formData = createSingleImageFormData(obj);

      const response = await uploadSingleImage(formData);
      console.log('......', response);
      setLoad(true);
      if (response.status) {
        setLoad(true);
      } else {
        console.log(response.message);
      }
    }
  };

  const getImageFromCamera = async () => {
    await ImagePicker.openCamera({
      width: 104,
      height: 104,
      cropping: true,
    }).then(image => {
      setImageUri(`file://${image.path}`);
      const {path, filename, mime} = image;
      setImgData({path, filename, mime});
    });
  };

  const getImageFromGallary = async () => {
    await ImagePicker.openPicker({
      width: 104,
      height: 104,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setImageUri(`file://${image.path}`);
      const {path, filename, mime} = image;
      setImgData({path, filename, mime});
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
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#310D20"
      />
      <View style={styles.backgroundBeyoundSafeArea}>
        <SafeAreaView>
          <CustomAppBar
            navigation={navigation}
            name={route?.params?.placeName}
            rightIcon={
              <Icon
                name="camera-plus-outline"
                size={29}
                color="#FFFFFF"
                borderRadius={5}
                onPress={() => createThreeButtonAlert()}
              />
            }
          />
        </SafeAreaView>
      </View>
      <View style={styles.imageContainer}>
        {menuImages.map(image => (
          <TouchableOpacity
            key={image.tempId}
            onPress={() =>
              handlePhotoClick(image?.url, image?._id, image?.name)
            }>
            <Image source={{uri: image?.url}} style={styles.image} />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default PhotoGallery;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backgroundBeyoundSafeArea: {
    backgroundColor: '#310D20',
  },
  imageContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  image: {
    height: 122,
    width: 125,
    margin: 2.5,
  },
});
