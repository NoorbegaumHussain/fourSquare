import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';

const RestaurantDetails = ({image}) => {
  const {width, height} = useWindowDimensions();
  const width1 = width < height ? '60%' : '65%';
  return (
    <View style={styles.cardContainer}>
      <Image
        source={require('../../assets/images/restaurant.png')}
        style={styles.image}
      />
      <View>
        <View style={[styles.favContainer, {width: width1}]}>
          <Text style={styles.restaurantName}>Attil</Text>
          {image}
        </View>
        <View style={styles.restaurantInfo}>
          <View>
            <View style={styles.ratingBackground}>
              <Text style={styles.ratingText}>8.5</Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.restaurantDetails}>Indian </Text>
              <View style={styles.dotContainer} />
              <Text style={styles.restaurantDetails}> ₹₹₹₹ 6.5km</Text>
            </View>
            <Text style={styles.restaurantDetails}>
              Daffodils,Laxmindra Nagar
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RestaurantDetails;
const styles = StyleSheet.create({
  image: {height: 125, width: 119},
  cardContainer: {
    flexDirection: 'row',
    marginHorizontal: 6,
    marginTop: 7.5,
    backgroundColor: '#FFFFFF',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  dotContainer: {
    // borderWidth: 1,
    backgroundColor: '#686868',
    alignSelf: 'center',
    borderRadius: 50,
    height: 5,
    width: 5,
  },
  favContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
  },

  ratingBackground: {
    backgroundColor: '#74d434',
    width: 24,
    height: 24,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginLeft: 10,
  },
  restaurantName: {
    fontFamily: 'Avenir Medium',
    color: '#1D1D26',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 7,
  },
});
