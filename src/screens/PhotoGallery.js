import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import CustomAppBar from '../components/CustomAppBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getImagesById} from '../services/auth';
import {useIsFocused} from '@react-navigation/native';

const PhotoGallery = ({navigation, route}) => {
  const [menuImages, setMenuImages] = useState([]);
  const handlePhotoClick = (image, imageId, name) => {
    navigation.navigate('PhotoDetails', {
      image: image,
      imageId: imageId,
      name: name,
      placeName: route?.params?.placeName,
    });
  };
  // console.warn(menuImages);

  const loadImages = async () => {
    const response = await getImagesById(route?.params?.placeId);
    if (response.status) {
      setMenuImages(response?.data?.data[0].uploadedImages);
    } else {
      console.log(response);
    }
  };

  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus === true) {
      loadImages();
    }
  }, [focus]);

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
              />
            }
          />
        </SafeAreaView>
      </View>
      <View style={styles.imageContainer}>
        {menuImages.map(image => (
          <TouchableOpacity
            onPress={() =>
              handlePhotoClick(image?.photos?.url[0], image?._id, image?.name)
            }>
            <Image source={{uri: image?.photos?.url[0]}} style={styles.image} />
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
