import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {ScrollView} from 'react-native-gesture-handler';

const RestaurantDetailScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../../assets/images/restaurant.png')}
          resizeMode="cover"
          style={styles.image}>
          <SafeAreaView>
            <View style={styles.header}>
              <Image
                source={require('../../assets/images/back_icon.png')}
                style={styles.backIcon}
              />
              <Text style={styles.text}>Attil</Text>
              <View style={styles.rightHeader}>
                <Image
                  source={require('../../assets/images/share_icon.png')}
                  style={styles.shareIcon}
                />
                <Image
                  source={require('../../assets/images/favourite_icon_copy.png')}
                  style={styles.favIcon}
                />
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.restaurantDetails}>
                Indian Restaurant, Chinese Restaurant, {'\n'} and Italian
                Restaurant.
              </Text>
            </View>
          </SafeAreaView>
        </ImageBackground>

        <View style={styles.iconContainer}>
          <View style={styles.individualIconContainer}>
            <Image
              source={require('../../assets/images/rating_icon.png')}
              style={styles.ratingIcon}
            />
            <Text>Rating</Text>
          </View>
          <View style={styles.individualIconContainer}>
            <Image
              source={require('../../assets/images/photos_icon.png')}
              style={styles.ratingIcon}
            />
            <Text>Photos</Text>
          </View>
          <View style={styles.individualIconContainer}>
            <Image
              source={require('../../assets/images/review_icon.png')}
              style={styles.ratingIcon}
            />
            <Text>Review</Text>
          </View>
        </View>

        <View style={styles.line} />
      </ScrollView>
    </View>
  );
};

export default RestaurantDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 300,
    width: '100%',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir Medium',
    fontSize: 22,
    fontWeight: '500',
    marginLeft: 50,
  },
  backIcon: {height: 22, width: 22},
  shareIcon: {height: 22, width: 22},
  favIcon: {height: 21, width: 23, marginLeft: 28},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    alignItems: 'center',
  },
  rightHeader: {
    flexDirection: 'row',
  },
  restaurantDetails: {
    fontFamily: 'Avenir Book',
    fontSize: 20,
    color: '#FFFFFF',
    lineHeight: 32,
    textAlign: 'center',
  },
  textContainer: {
    marginTop: 130,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 50,
    marginVertical: 8,
  },
  ratingIcon: {
    resizeMode: 'contain',
    height: 50,
    width: 45,
  },
  individualIconContainer: {
    alignItems: 'center',
  },
  line: {
    // borderWidth:0.3,
    height: 0.4,
    backgroundColor: '#8D8D8d',
    marginHorizontal: 20,
  },
});
