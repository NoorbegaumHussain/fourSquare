import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import CustomAppBar from '../components/CustomAppBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import {TouchableOpacity} from 'react-native-gesture-handler';
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
  const [isLoading, setIsLoading] = useState(false);
  const handlePhotoClick = (image, imageId, name) => {
    navigation.navigate('PhotoDetails', {
      image: image,
      imageId: imageId,
      name: name,
      placeName: route?.params?.placeName,
    });
  };

  const loadImages = async () => {
    setIsLoading(true);
    const response = await getImagesById(route?.params?.placeId);
    setIsLoading(false);
    if (response?.status && response?.data?.data !== undefined) {
      setMenuImages(restructureObject(response?.data?.data));
    } else {
      console.log(response);
    }
  };

  const uploadImage = async () => {
    const obj = {
      placeId: route?.params?.placeId,
      image: imagedata,
    };
    if (imagedata) {
      const formData = createSingleImageFormData(obj);
      const response = await uploadSingleImage(formData);
      console.log('......', response);
      if (response?.status) {
        setLoad(true);
        setImgData(null);
      } else {
        console.log(response.message);
      }
    }
  };

  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus === true) {
      loadImages();
      uploadImage();
    }
  }, [focus, imagedata]);

  const getImageFromCamera = async () => {
    await ImagePicker.openCamera({
      width: 500,
      height: 1000,
      cropping: true,
    }).then(image => {
      // setImageUri(`file://${image.path}`);
      const {path, filename, mime} = image;
      setImgData({path, filename, mime});
    });
  };

  const getImageFromGallary = async () => {
    await ImagePicker.openPicker({
      width: 500,
      height: 1000,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      // setImageUri(`file://${image.path}`);
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
              <TouchableOpacity onPress={() => createThreeButtonAlert()}>
                <Image
                  source={require('../../assets/images/addpic.png')}
                  style={{width: 30, height: 20}}
                />
              </TouchableOpacity>
            }
          />
        </SafeAreaView>
      </View>
      <>
        {isLoading && (
          <View style={{marginTop: 15}}>
            <ActivityIndicator size="large" color="#CCCCCC" />
          </View>
        )}

        {/* <View style={styles.imageContainer}> */}
        <ScrollView
          contentContainerStyle={styles.imageContainer}
          showsVerticalScrollIndicator={false}>
          {menuImages.map(image => (
            <TouchableOpacity
              key={image.tempId}
              onPress={() =>
                handlePhotoClick(image?.url, image?._id, image?.name)
              }>
              <Image source={{uri: image?.url}} style={styles.image} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* </View> */}
      </>
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
