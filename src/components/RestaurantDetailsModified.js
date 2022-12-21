import {View, Text, Image, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';

const RestaurantDetailsModified = ({image}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/restaurant.png')}
        style={styles.image}
      />
      <View style={styles.contentContainer}>
        <View style={styles.favContainer}>
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
            <Text style={styles.restaurantAdress}>
              Daffodils,Laxmindra Nagar
            </Text>
          </View>
        </View>
      </View>
    </View>
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
    width: '64%',
    alignItems: 'center',
    paddingHorizontal: 10,
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
    paddingBottom:4
  },
});
