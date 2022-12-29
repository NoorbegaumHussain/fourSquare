import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
  Image,
  Platform,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import RestaurantDetails from '../../components/RestaurantDetails';
import RestaurantDetailsModified from '../../components/RestaurantDetailsModified';
import getCurrentLatLong from '../../utils/getCurrentLatLong';
import Geolocation from '@react-native-community/geolocation';
import {addOrRemoveFromFav, getPlacesByType} from '../../services/auth';
import Toast from 'react-native-simple-toast';
import {useIsFocused} from '@react-navigation/native';
import {
  addToFavourite,
  deleteFromFavourites,
} from '../../redux/fourSquareSlice';
import {useDispatch, useSelector} from 'react-redux';
import {isLoggedIn} from '../../utils/isLoggedIn';

const Coffee = ({navigation}) => {
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [placeId, setPlaceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // const token = isLoggedIn();
  const favList = useSelector(state => state.foursquaredata.favourite);
  // console.log('nearbyLocations', nearbyLocations);
  const [token, setToken] = useState('');
  const getOneTimeLocation = () => {
    Geolocation.getCurrentPosition(position => {
      const currentLongitude = position.coords.longitude;

      const currentLatitude = position.coords.latitude;

      setCurrentLongitude(currentLongitude);

      setCurrentLatitude(currentLatitude);
    });
  };
  const loadPlaces = async () => {
    getOneTimeLocation();
    const response = await getPlacesByType(
      currentLatitude,
      currentLongitude,
      'cafe',
    );
    if (response.status) {
      setNearbyLocations(response?.data?.data);
    } else {
      console.log(response);
    }
  };

  const getToken = async () => {
    var data = await isLoggedIn();
    setToken(data);
  };

  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus) {
      loadPlaces();
    }
  }, [focus, currentLatitude, token]);

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
                getToken();
                if (token) {
                  const response = await addOrRemoveFromFav(item?._id);
                  if (response?.data?.status) {
                    dispatch(addToFavourite(item?._id));
                  } else {
                    dispatch(deleteFromFavourites(item?._id));
                  }
                } else {
                  Alert.alert('Login to continue', '', [
                    {
                      text: 'Login',
                      onPress: () => navigation.navigate('LoginScreen'),
                    },
                    {
                      text: 'Cancel',
                      onPress: () => null,
                      style: 'cancel',
                    },
                  ]);
                }
              }}>
              {favList.includes(item?._id) ? (
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
      {isLoading && (
        <View style={{marginTop: 15}}>
          <ActivityIndicator size="large" color="#310D20" />
        </View>
      )}
      <FlatList
        data={nearbyLocations}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={loadPlaces} />
        }
      />
    </View>
  );
};

export default Coffee;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  cardContainer: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 10,
    marginHorizontal: 5,
  },
  favIcon: {
    height: 25,
    resizeMode: 'contain',
    width: 25,
    marginTop: 15,
  },
});
