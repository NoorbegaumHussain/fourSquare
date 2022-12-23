import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import RestaurantDetails from '../components/RestaurantDetails';
import RestaurantDetailsModified from '../components/RestaurantDetailsModified';
import Geolocation from '@react-native-community/geolocation';
import {addOrRemoveFromFav, getFavourites} from '../services/auth';
import {useIsFocused} from '@react-navigation/native';
import {addToFavourite, deleteFromFavourites} from '../redux/fourSquareSlice';
import {useDispatch, useSelector} from 'react-redux';

const Favourites = ({navigation}) => {
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [text, setText] = useState('');
  const [deleted, setDeleted] = useState('');
  const favList = useSelector(state => state.foursquaredata.favourite);
  const dispatch = useDispatch();

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
    const response = await getFavourites(
      currentLatitude,
      currentLongitude,
      text,
    );
    if (response.status) {
      console.log(response.data);
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
  }, [focus, text, deleted]);

  const handleCardClick = () => {
    navigation.navigate('RestaurantDetailScreen');
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={handleCardClick} style={styles.cardContainer}>
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
                console.info(item._id);
                const response = await addOrRemoveFromFav(item?.placeId);
                console.log('fav resppppppp', response.data);
                if (response?.data?.status) {
                  console.log('deleting', item?.placeId);
                  dispatch(deleteFromFavourites(item?.placeId));
                } else {
                  dispatch(deleteFromFavourites(item?.placeId));
                }
              }}>
              <Image
                source={require('../../assets/images/close.png')}
                style={styles.favIcon}
              />
            </TouchableOpacity>
          }
        />
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: '#F0F0F0',
        },
      ]}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#310D20"
      />
      <View style={styles.backgroundBeyoundSafeArea}>
        <SafeAreaView>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backIcon}>
              <View style={styles.backIconContainer}>
                <Image
                  source={require('../../assets/images/back_icon.png')}
                  style={styles.backIcon}
                />
              </View>
            </TouchableOpacity>
            <View
              style={{
                marginLeft: 11,
              }}>
              <Text style={styles.text}>Favourites</Text>

              <View style={styles.searchSection}>
                <Icon
                  name="search"
                  size={23}
                  color="#CCCCCC"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Search"
                  placeholderTextColor="#CCCCCC"
                  // onFocus={() =>
                  //   setFocus(prev => ({
                  //     nearme: {hasfocus: false},
                  //     search: {hasfocus: true},
                  //   }))
                  // }
                  onChangeText={searchString => {
                    setText(searchString);
                  }}
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
            <View style={styles.filterContainer}>
              {/* {filterClicked ? (
                <TouchableOpacity
                  onPress={() => setFilterClicked(!filterClicked)}>
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              ) : ( */}
              <Icon
                name="filter"
                size={25}
                color="#FFFFFF"
                style={styles.filter}
                // onPress={() => setFilterClicked(!filterClicked)}
              />
              {/* )} */}
            </View>
          </View>
        </SafeAreaView>
      </View>
      <FlatList
        data={nearbyLocations}
        keyExtractor={item => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Favourites;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundBeyoundSafeArea: {
    backgroundColor: '#310D20',
  },

  headerContainer: {
    flexDirection: 'row',
    backgroundColor: '#370F24',
    paddingTop: 10,
    justifyContent: 'space-around',
  },
  backIcon: {
    height: 23,
    width: 25,
    marginTop: 3,
  },
  backIconContainer: {
    width: 40,
    fontWeight: '500',
  },
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#ffffff',
    color: '#424242',
    borderRadius: 5,
    width: '60%',
  },
  filterContainer: {
    width: 40,
    alignItems: 'center',
    fontWeight: '500',
  },
  filter: {
    transform: [{scaleX: -1}],
    marginTop: 3,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir Medium',
    fontSize: 24.5,
    fontWeight: '500',
    textAlign: 'center',
    marginBottom: 15,
  },
  favIcon: {
    // paddingLeft: 10,
    marginTop: 9,
    resizeMode: 'contain',
    width: 16,
    height: 16,
    marginRight: -7,
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
