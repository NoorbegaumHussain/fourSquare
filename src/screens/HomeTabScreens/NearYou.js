import {
  View,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  FlatList,
  PermissionsAndroid,
  Pressable,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';

import RestaurantDetails from '../../components/RestaurantDetails';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import RestaurantDetailsModified from '../../components/RestaurantDetailsModified';
import {
  addOrRemoveFromFav,
  getFavourites,
  restaurantsNearYou,
} from '../../services/auth';
import {useIsFocused} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {
  addToFavourite,
  deleteFromFavourites,
} from '../../redux/fourSquareSlice';

const NearYou = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const mapHeight = width < height ? '28%' : '50%';
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [placeId, setPlaceId] = useState('');
  const [fav, setFav] = useState(false);
  const [favId, setFavId] = useState('');
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const favList = useSelector(state => state.foursquaredata.favourite);
  console.log('favvvvvvv', favList);
  const loadPlaces = async () => {
    const response = await restaurantsNearYou(
      currentLatitude,
      currentLongitude,
    );

    if (response.status) {
      setNearbyLocations(response?.data?.data);
    } else {
      console.info(response.error);
    }
  };

  const loadFav = async () => {
    const response = await getFavourites(
      currentLatitude,
      currentLongitude,
      ' ',
    );
    if (response.status && response?.data?.data !== undefined) {
      setFav(response?.data?.data);
      response?.data?.data.map(item => {
        dispatch(addToFavourite(item.placeId));
      });
    } else {
      console.log(response);
    }
  };

  const focus = useIsFocused();
  useLayoutEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App needs to Access your location',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            getOneTimeLocation();
          } else {
            setLocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };
    if (focus === true && currentLatitude !== '') {
      loadPlaces();
      loadFav();
    }
    requestLocationPermission();
  }, [focus, currentLatitude, favList]);

  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      position => {
        setTimeout(() => {
          try {
            mapRef.current.animateToRegion(
              {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.05,
                longitudeDelta: 0.2,
              },
              3 * 1000,
            );
            // setLoading(false);
          } catch (error) {
            console.log('Failed to animate direction');
          }
        }, 500);
        setLocationStatus('You are Here');

        const currentLongitude = position.coords.longitude;

        const currentLatitude = position.coords.latitude;

        setCurrentLongitude(currentLongitude);

        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.cardContainer}>
        <RestaurantDetailsModified
          navigation={navigation}
          placeId={item?._id}
          placeName={item?.placeName}
          url={item.image?.url}
          sector={item?.sector}
          city={item?.city}
          rating={item?.totalrating}
          priceRange={item?.priceRange}
          distance={item?.dist?.calculated}
          overview={item?.overview}
          phone={item?.phone}
          latitude={item?.location?.coordinates[1]}
          longitude={item?.location?.coordinates[0]}
          image={
            <TouchableOpacity
              style={{
                height: 50,
                width: 50,
                alignItems: 'center',
              }}
              onPress={async () => {
                const response = await addOrRemoveFromFav(item?._id);
                console.log('fav resppppppp', response.data);
                if (response?.data?.status) {
                  dispatch(addToFavourite(item?._id));
                } else {
                  dispatch(deleteFromFavourites(item?._id));
                }
                console.log('item Id ', item?._id);
              }}>
              {favList.includes(item?._id) && favList.length > 0 ? (
                <Image
                  source={require('../../../assets/images/favourite_icon.png')}
                  style={styles.favIcon}
                />
              ) : (
                <Image
                  source={require('../../../assets/images/favourite_icon_selected.png')}
                  style={styles.favIcon}
                />
              )}
            </TouchableOpacity>
          }
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={[styles.mapContainer, {height: mapHeight}]}>
        {currentLatitude && currentLongitude !== '' ? (
          <MapView
            style={styles.mapStyle}
            customMapStyle={mapStyle}
            ref={mapRef}>
            <Marker
              draggable
              coordinate={{
                latitude: currentLatitude,
                longitude: currentLongitude,
              }}
              onDragEnd={e => alert(JSON.stringify(e.nativeEvent.coordinate))}
              title={'Test Marker'}
              description={'This is a description of the marker'}
            />
          </MapView>
        ) : null}
      </View>
      <FlatList
        data={nearbyLocations}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
};

export default NearYou;
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
    backgroundColor: '#E5E5E5',
    marginBottom: 20,
  },
  mapContainer: {
    // position: 'absolute',
    // top: 0,
    // left: 0,
    // right: 0,
    // bottom: 0,
    // alignItems: 'center',
    // justifyContent: 'flex-end',
    width: '100%',
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  favIcon: {
    height: 25,
    resizeMode: 'contain',
    width: 25,
    marginTop: 15,
  },

  cardContainer: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 5,
    marginHorizontal: 5,
  },
});
