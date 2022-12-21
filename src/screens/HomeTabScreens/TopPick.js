import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import RestaurantDetails from '../../components/RestaurantDetails';
import RestaurantDetailsModified from '../../components/RestaurantDetailsModified';
import getCurrentLatLong from '../../utils/getCurrentLatLong';
import Geolocation from '@react-native-community/geolocation';
import {getPlacesByType} from '../../services/auth';
import Toast from 'react-native-simple-toast';
import {useIsFocused} from '@react-navigation/native';

const TopPick = ({navigation}) => {
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [placeId, setPlaceId] = useState('');
  // console.log('nearbyLocations', nearbyLocations);
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
      'toppick',
    );
    if (response.status) {
      setNearbyLocations(response?.data?.data);
    } else {
      console.log(response);
    }
  };

  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus === true) {
      loadPlaces();
    }
  }, [focus, currentLatitude]);

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
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={nearbyLocations}
        keyExtractor={item => item._id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default TopPick;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 20,
  },
  cardContainer: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 10,
    marginHorizontal: 5,
  },
});
