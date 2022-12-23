import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import React from 'react';
import {convertPriceRange} from '../utils/convertPriceRange';
import {roundOff} from '../utils/roundOffNumber';
import {TouchableOpacity} from 'react-native-gesture-handler';

const RestaurantDetailsModified = ({
  placeId,
  image,
  placeName,
  url,
  sector,
  city,
  rating,
  priceRange,
  distance,
  onPress,
  navigation,
  overview,
  phone,
  latitude,
  longitude,
}) => {
  const handleCardClick = () => {
    navigation.navigate('RestaurantDetailScreen', {
      placeId: placeId,
      url: url,
      image: url,
      placeName: placeName,
      sector: sector,
      city: city,
      rating: rating,
      priceRange: priceRange,
      distance: distance,
      overview: overview,
      phone: phone,
      latitude: latitude,
      longitude: longitude,
    });
  };
  return (
    <Pressable style={styles.container} onPress={handleCardClick}>
      <Image
        source={{
          uri: url,
        }}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <View style={styles.favContainer}>
          <Text style={styles.restaurantName}>{placeName}</Text>
          {image}
        </View>
        <View style={styles.restaurantInfo}>
          <View>
            <View style={styles.ratingBackground}>
              <Text style={styles.ratingText}>{roundOff(rating)}</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.restaurantDetails}>{sector} </Text>
              <View style={styles.dotContainer} />
              <Text style={styles.restaurantDetails}>
                {` ${convertPriceRange(priceRange)} ${roundOff(distance, 1)}km`}
              </Text>
            </View>
            <Text
              style={styles.restaurantAdress}
              ellipsizeMode="tail"
              numberOfLines={2}>
              {city}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RestaurantDetailsModified;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    width: '100%',
    marginTop: 7,
    // marginHorizontal: 10,
    borderRightColor: 'red',
  },
  image: {height: '100%', width: '33%'},
  contentContainer: {
    width: '100%',
  },
  favContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '67%',
    alignItems: 'center',
    paddingLeft: 10,
  },
  dotContainer: {
    backgroundColor: '#686868',
    alignSelf: 'center',
    borderRadius: 50,
    height: 5,
    width: 5,
  },
  ratingBackground: {
    backgroundColor: '#74d434',
    width: 24,
    height: 24,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 7,
  },
  ratingText: {
    color: '#FFFFFF',
    fontFamily: 'Avenir Book',
    fontWeight: '500',
  },
  restaurantDetails: {
    color: '#797D7F',
  },
  textContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  restaurantInfo: {
    borderColor: 'black',
    marginTop: 14,

    width: '64%',
    textAlign: 'justify',
    paddingHorizontal: 10,
  },
  restaurantName: {
    fontFamily: 'Avenir Medium',
    color: '#1D1D26',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 7,
  },
  restaurantAdress: {
    color: '#797D7F',
    paddingBottom: 4,
  },
});
