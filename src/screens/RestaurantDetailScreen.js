import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  useWindowDimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import PrimaryButton from '../components/PrimaryButton';
import LinearGradient from 'react-native-linear-gradient';
import {Rating, AirbnbRating} from 'react-native-ratings';
import CustomModal from '../components/CustomModal';
import {getPlacesById} from '../services/auth';
import Toast from 'react-native-simple-toast';
import {useIsFocused} from '@react-navigation/native';

const RestaurantDetailScreen = ({navigation, route}) => {
  console.log(route?.params?.placeId);
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [particularRestaurantData, setParticularRestaurantDetails] = useState(
    [],
  );
  const {width, height} = useWindowDimensions();
  const handleRatingPress = () => {
    setVisible(true);
    setModal(true);
  };

  const loadRestaurantDetails = async () => {
    const response = await getPlacesById(route?.params?.placeId);

    if (response.status) {
      setParticularRestaurantDetails(response?.data?.data);
    } else {
      Toast.show(response);
    }
  };

  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus === true) {
      loadRestaurantDetails();
    }
  }, [focus]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          source={{uri: particularRestaurantData?.image?.url}}
          resizeMode="cover"
          style={styles.image}>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0, 0.5, 1]}
            style={{height: 370}}
            colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.0)', 'rgba(0,0,0,0.8)']}>
            <SafeAreaView>
              <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image
                    source={require('../../assets/images/back_icon.png')}
                    style={styles.backIcon}
                  />
                </TouchableOpacity>
                <Text style={styles.text}>
                  {particularRestaurantData?.placeName}
                </Text>
                <View style={styles.rightHeader}>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/images/share_icon.png')}
                      style={styles.shareIcon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../../assets/images/favourite_icon_copy.png')}
                      style={styles.favIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.textContainer}>
                <Text style={styles.restaurantDetails}>
                  {particularRestaurantData?.sector}
                </Text>
              </View>
              <AirbnbRating
                size={15}
                showRating={false}
                defaultRating={particularRestaurantData?.totalrating}
                style={styles.ratings}
                isDisabled={true}
                // onFinishRating={rating => ratingCompleted(rating)}
              />
            </SafeAreaView>
          </LinearGradient>
        </ImageBackground>

        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.individualIconContainer}
            onPress={handleRatingPress}>
            <Image
              source={require('../../assets/images/rating_icon.png')}
              style={styles.ratingIcon}
            />
            <Text style={styles.ratingText}>Rating</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.individualIconContainer}
            onPress={() => navigation.navigate('PhotoGallery')}>
            <Image
              source={require('../../assets/images/photos_icon.png')}
              style={styles.ratingIcon}
            />
            <Text style={styles.ratingText}>Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.individualIconContainer}
            onPress={() => navigation.navigate('ReviewList')}>
            <Image
              source={require('../../assets/images/review_icon.png')}
              style={styles.ratingIcon}
            />
            <Text style={styles.ratingText}>Review</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.line} />
        <View style={styles.overViewContainer}>
          <Text style={styles.overViewText}>Overview</Text>
          <Text style={styles.overViewDetails}>
            {particularRestaurantData?.overview}
          </Text>
        </View>

        <View style={styles.mapContainer}>
          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            customMapStyle={mapStyle}>
            <Marker
              draggable
              coordinate={{
                latitude: 37.78825,
                longitude: -122.4324,
              }}
              onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={'Test Marker'}
              description={'This is a description of the marker'}
            />
          </MapView>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            locations={[0.4, 0.8]}
            colors={['rgba(249, 245, 238 ,1)', 'rgba(249, 245, 238,0)']}
            style={{
              height: Platform.OS === 'ios' ? 161 : 150,
            }}>
            <View style={styles.maptextContainer}>
              <Text style={styles.mapText}>
                {particularRestaurantData.city}
              </Text>
              <Text style={styles.mapTextNumber}>
                {particularRestaurantData.phone}
              </Text>
              <Text style={styles.mapTextDistance}>Drive : 5 km</Text>
            </View>
          </LinearGradient>
        </View>
        <View style={styles.primaryButtonContainer}>
          <PrimaryButton
            text="Add Review "
            onPress={() => navigation.navigate('AddReview')}
          />
        </View>
      </ScrollView>
      {modal && (
        <CustomModal
          visible={visible}
          onPress={() => {
            setVisible(false);
            setModal(false);
          }}>
          <View>
            <Text
              style={[
                styles.overallrating,
                {marginTop: Platform.OS === 'ios' ? 10 : 0},
              ]}>
              Overall Rating
            </Text>
            <Text style={styles.ratingInNumber}>4.5</Text>
            <Text
              style={[
                styles.experience,
                {marginTop: Platform.OS === 'ios' ? 65 : 26},
              ]}>
              How would you rate your {'\n'} experience ?
            </Text>
            <AirbnbRating
              size={30}
              showRating={false}
              defaultRating={5}
              isDisabled={false}
              starContainerStyle={{
                width: '70%',
                justifyContent: 'space-around',
                marginTop: 40,
              }}
              // onFinishRating={rating => ratingCompleted(rating)}
            />
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </CustomModal>
      )}
    </View>
  );
};

export default RestaurantDetailScreen;
const mapStyle = [
  {
    elementType: 'geometry',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#523735',
      },
    ],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#c9b2a6',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#dcd2be',
      },
    ],
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#ae9e90',
      },
    ],
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#93817c',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#a5b076',
      },
    ],
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#447530',
      },
    ],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f5f1e6',
      },
    ],
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [
      {
        color: '#fdfcf8',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [
      {
        color: '#f8c967',
      },
    ],
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#e9bc62',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [
      {
        color: '#e98d58',
      },
    ],
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [
      {
        color: '#db8555',
      },
    ],
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#806b63',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#8f7d77',
      },
    ],
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [
      {
        color: '#ebe3cd',
      },
    ],
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [
      {
        color: '#dfd2ae',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
      {
        color: '#b9d3c2',
      },
    ],
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
      {
        color: '#92998d',
      },
    ],
  },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: 370,
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
    marginTop: Platform.OS === 'ios' ? 0 : 13,
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
    marginTop: Platform.OS === 'ios' ? 215 : 235,
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
  ratingText: {
    fontFamily: 'Avenir Book',
    fontSize: 16,
    color: '#606060',
    fontWeight: '500',
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
  overViewContainer: {
    marginHorizontal: 20,
  },
  overViewText: {
    fontFamily: 'Avenir Book',
    fontSize: 20,
    color: '#351347',
    lineHeight: 26,
    marginTop: 19,
    marginBottom: 11,
  },
  overViewDetails: {
    fontFamily: 'Avenir Book',
    fontSize: 16,
    color: '#8D8D8D',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'justify',
  },
  mapContainer: {
    height: Platform.OS === 'ios' ? 161 : 150,
    width: '100%',
    // shadowColor: '#171717',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 0.6,
    // shadowRadius: 2,
    // elevation: 5,
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  primaryButtonContainer: {
    justifyContent: 'flex-end',
    // marginBottom: Platform.OS === 'ios' ? 10 : 0,
  },
  maptextContainer: {
    marginTop: 13,
    marginLeft: 18,
  },
  mapText: {
    fontFamily: 'Avenir Medium',
    fontSize: 15,
    color: '#606060',
    lineHeight: 23,
    fontWeight: '600',
  },
  mapTextNumber: {
    fontFamily: 'Avenir Medium',
    fontSize: 15,
    color: '#606060',
    lineHeight: 23,
    fontWeight: '600',
    marginTop: 10.8,
  },
  mapTextDistance: {
    fontFamily: 'Avenir Medium',
    fontSize: 15,
    color: '#606060',
    lineHeight: 23,
    fontWeight: '600',
    marginTop: 9.8,
  },
  ratings: {
    marginBottom: 10,
  },
  submitButton: {
    alignContent: 'flex-end',
    width: '100%',
    borderTopWidth: 1,
    borderColor: '#A0A0A0',
    justifyContent: 'center',
    alignItems: 'center',
    height: 54,
    marginTop: 64,
  },
  submitText: {
    fontFamily: 'Avenir Medium',
    fontSize: 20,
    color: '#351547',
    fontWeight: '500',
  },
  overallrating: {
    color: '#000000',
    fontFamily: 'Avenir Medium',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 30,
  },
  ratingInNumber: {
    textAlign: 'center',
    color: '#36B000',
    fontSize: 37,
    fontWeight: '900',
    fontFamily: 'Avenir Book',
    marginTop: 16,
  },
  experience: {
    fontFamily: 'Avenir Book',
    fontWeight: '400',
    color: '#000000',
    lineHeight: 30,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 40,
  },
});
