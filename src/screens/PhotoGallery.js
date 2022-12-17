import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import React from 'react';
import CustomAppBar from '../components/CustomAppBar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const PhotoGallery = ({navigation}) => {
  const handlePhotoClick = () => {
    navigation.navigate('PhotoDetails');
  };
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
            name="Atil"
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
        <TouchableOpacity onPress={handlePhotoClick}>
          <Image
            source={require('../../assets/images/restaurant.png')}
            style={styles.image}
          />
        </TouchableOpacity>
        <Image
          source={require('../../assets/images/restaurant.png')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/images/restaurant.png')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/images/restaurant.png')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/images/restaurant.png')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/images/restaurant.png')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/images/restaurant.png')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/images/restaurant.png')}
          style={styles.image}
        />
        <Image
          source={require('../../assets/images/restaurant.png')}
          style={styles.image}
        />
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
    justifyContent: 'center',
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
