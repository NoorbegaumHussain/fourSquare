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
import RestaurantDetailsModified from '../components/RestaurantDetailsModified';
import {
  addOrRemoveFromFav,
  filterFavourite,
  getFavourites,
} from '../services/auth';
import {useIsFocused} from '@react-navigation/native';
import {addToFavourite, deleteFromFavourites} from '../redux/fourSquareSlice';
import {useDispatch, useSelector} from 'react-redux';
import FilterScreen from './FilterScreen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextField} from 'rn-material-ui-textfield';
import PrimaryButton from '../components/PrimaryButton';

const Favourites = ({navigation}) => {
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [text, setText] = useState('');
  const favList = useSelector(state => state.foursquaredata.favourite);
  const dispatch = useDispatch();
  const locationData = useSelector(state => state.foursquaredata.locationData);
  const [filterClicked, setFilterClicked] = useState(false);
  const [filterView, setFilterView] = useState('');
  const [sortbyClicked, setSortbyClicked] = useState({
    popular: {isClicked: false},
    distance: {isClicked: false},
    rating: {isClicked: false},
  });
  const [filterbyClicked, setFilterbyClicked] = useState({
    onerupee: {isClicked: false},
    tworupee: {isClicked: false},
    threerupee: {isClicked: false},
    fourrupee: {isClicked: false},
  });
  const [features, setFeatures] = useState({
    creditCard: false,
    delivery: false,
    dogFriendly: false,
    familyFriendly: false,
    walkingDistance: false,
    outdoorSeating: false,
    parking: false,
    wifi: false,
  });
  const [radius, setRadius] = useState('');

  const getSortByValue = () => {
    if (sortbyClicked.popular.isClicked) {
      return 'popular';
    } else if (sortbyClicked.distance.isClicked) {
      return 'distance';
    } else {
      return 'rating';
    }
  };
  const getPriceRange = () => {
    if (filterbyClicked.onerupee.isClicked) {
      return 9;
    } else if (filterbyClicked.tworupee.isClicked) {
      return 99;
    } else if (filterbyClicked.threerupee.isClicked) {
      return 999;
    } else {
      return 9999;
    }
  };

  const getFeaturesValue = () => {
    Object.keys(features).forEach(key => {
      if (features[key] === false) {
        delete features[key];
      }
    });
    return features;
  };
  const values = getFeaturesValue();
  // console.log('values.......', values);

  const obj = {
    longitude: locationData.longitude,
    latitude: locationData.latitude,
    sortBy: getSortByValue(),
    priceRange: getPriceRange(),
    ...values,
    radius: radius,
    text: text,
  };
  const [filteredValue, setFilteredValue] = useState('');
  const handleFilter = async () => {
    const response = await filterFavourite(obj);
    console.log('obj.....', response.data.data);
    if (response?.status && response?.data?.data !== undefined) {
      setFilterClicked(false);
      setFilterView(true);
      setFilteredValue(response?.data?.data);
    } else {
      console.log('response.......', response);
    }
    // console.log('response.......', response);
  };

  const loadPlaces = async () => {
    const response = await getFavourites(
      locationData.latitude,
      locationData.longitude,
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
      handleFilter();
    }
  }, [focus, text, favList]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.cardContainer}>
        <RestaurantDetailsModified
          navigation={navigation}
          placeId={item?.placeId}
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
                console.info(item.placeId, favList);
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
      </View>
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
              onPress={() => {
                navigation.goBack();
                setFilterView(false);
                setFilterClicked(false);
              }}
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
              {filterClicked ? (
                <TouchableOpacity
                  onPress={() => {
                    handleFilter();
                  }}>
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              ) : (
                <Icon
                  name="filter"
                  size={25}
                  color="#FFFFFF"
                  style={styles.filter}
                  onPress={() => {
                    setFilterClicked(true);
                  }}
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      </View>
      {nearbyLocations && !filterClicked && !filterView ? (
        <FlatList
          data={nearbyLocations}
          keyExtractor={item => item._id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        !filterClicked &&
        !filterView && (
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text
              style={{
                color: '#000000',
                fontFamily: 'Avenir Medium',
                fontSize: 20,
                fontWeight: '500',
                textAlign: 'center',
                marginBottom: 15,
              }}>
              No Favourites Found
            </Text>
          </View>
        )
      )}
      {filterClicked && (
        <View style={{flex: 1}}>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.filterTextContainer}>
              <Text style={styles.filterHeaderText}>Sort by</Text>
            </View>

            <View style={styles.sortbyButtonsContainer}>
              <TouchableOpacity
                style={[
                  styles.sortbyButtons,
                  {
                    backgroundColor: sortbyClicked.popular.isClicked
                      ? '#351347'
                      : '#FFFFFF',
                    borderRightWidth: 1,
                    borderColor: '#351347',
                  },
                ]}
                onPress={() =>
                  setSortbyClicked(prev => ({
                    popular: {isClicked: !sortbyClicked.popular.isClicked},
                    distance: {isClicked: false},
                    rating: {isClicked: false},
                  }))
                }>
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: sortbyClicked.popular.isClicked
                        ? '#FFFFFF'
                        : '#351347',
                    },
                  ]}>
                  Popular
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortbyButtons,
                  {
                    backgroundColor: sortbyClicked.distance.isClicked
                      ? '#351347'
                      : '#FFFFFF',
                    borderRightWidth: 1,
                    borderColor: '#351347',
                  },
                ]}
                onPress={() =>
                  setSortbyClicked(prev => ({
                    popular: {isClicked: false},
                    distance: {isClicked: !sortbyClicked.distance.isClicked},
                    rating: {isClicked: false},
                  }))
                }>
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: sortbyClicked.distance.isClicked
                        ? '#FFFFFF'
                        : '#351347',
                    },
                  ]}>
                  Distance
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.sortbyButtons,
                  {
                    backgroundColor: sortbyClicked.rating.isClicked
                      ? '#351347'
                      : '#FFFFFF',
                  },
                ]}
                onPress={() =>
                  setSortbyClicked(prev => ({
                    popular: {isClicked: false},
                    distance: {isClicked: false},
                    rating: {isClicked: !sortbyClicked.rating.isClicked},
                  }))
                }>
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: sortbyClicked.rating.isClicked
                        ? '#FFFFFF'
                        : '#351347',
                    },
                  ]}>
                  Rating
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.filterTextContainer}>
              <Text style={styles.filterHeaderText}>Filter by</Text>
            </View>
            <View style={styles.inputfieldContainer}>
              <View style={styles.textContainer}>
                <TextField
                  label="Set Radius"
                  name="email"
                  keyboardType="number-pad"
                  formatText={this.formatText}
                  onSubmitEditing={this.onSubmit}
                  ref={this.fieldRef}
                  textColor="#FFFFFF"
                  tintColor="#b5abab"
                  baseColor="#b5abab"
                  lineWidth={1}
                  autoCapitalize="none"
                  labelFontSize={15}
                  // labelOffset={{y1: -6, x1: width1}}
                  onChangeText={string => setRadius(string)}
                  // onBlur={handleBlur('email')}
                  // value={values.email}
                  autoCorrect={false}
                  style={{
                    fontFamily: 'Avenir Book',
                    marginTop: 10,
                    color: '#000000',
                    fontSize: 20,
                  }}
                  // color:'#b5abab'
                  labelTextStyle={{
                    color: '#b5abab',
                    fontFamily: 'Avenir Book',
                    //   alignSelf: 'center',
                    height: 50,
                    paddingTop: Platform.OS === 'ios' ? 2 : 2.8,
                  }}
                />
              </View>
              <View style={styles.filterbyButtonsContainer}>
                <TouchableOpacity
                  style={[
                    styles.filterbyButtons,
                    {
                      backgroundColor: filterbyClicked.onerupee.isClicked
                        ? '#351347'
                        : '#FFFFFF',
                      borderRightWidth: 1,
                      borderColor: '#351347',
                    },
                  ]}
                  onPress={() =>
                    setFilterbyClicked(prev => ({
                      onerupee: {
                        isClicked: !filterbyClicked.onerupee.isClicked,
                      },
                      tworupee: {isClicked: false},
                      threerupee: {isClicked: false},
                      fourrupee: {isClicked: false},
                    }))
                  }>
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: filterbyClicked.onerupee.isClicked
                          ? '#FFFFFF'
                          : '#351347',
                      },
                    ]}>
                    ₹
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterbyButtons,
                    {
                      backgroundColor: filterbyClicked.tworupee.isClicked
                        ? '#351347'
                        : '#FFFFFF',
                      borderRightWidth: 1,
                      borderColor: '#351347',
                    },
                  ]}
                  onPress={() =>
                    setFilterbyClicked(prev => ({
                      onerupee: {isClicked: false},
                      tworupee: {
                        isClicked: !filterbyClicked.tworupee.isClicked,
                      },
                      threerupee: {isClicked: false},
                      fourrupee: {isClicked: false},
                    }))
                  }>
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: filterbyClicked.tworupee.isClicked
                          ? '#FFFFFF'
                          : '#351347',
                      },
                    ]}>
                    ₹₹
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterbyButtons,
                    {
                      backgroundColor: filterbyClicked.threerupee.isClicked
                        ? '#351347'
                        : '#FFFFFF',
                      borderRightWidth: 1,
                      borderColor: '#351347',
                    },
                  ]}
                  onPress={() =>
                    setFilterbyClicked(prev => ({
                      onerupee: {isClicked: false},
                      tworupee: {isClicked: false},
                      threerupee: {
                        isClicked: !filterbyClicked.threerupee.isClicked,
                      },
                      fourrupee: {isClicked: false},
                    }))
                  }>
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: filterbyClicked.threerupee.isClicked
                          ? '#FFFFFF'
                          : '#351347',
                      },
                    ]}>
                    ₹₹₹
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.filterbyButtons,
                    {
                      backgroundColor: filterbyClicked.fourrupee.isClicked
                        ? '#351347'
                        : '#FFFFFF',
                    },
                  ]}
                  onPress={() =>
                    setFilterbyClicked(prev => ({
                      onerupee: {isClicked: false},
                      tworupee: {isClicked: false},
                      threerupee: {isClicked: false},
                      fourrupee: {
                        isClicked: !filterbyClicked.fourrupee.isClicked,
                      },
                    }))
                  }>
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: filterbyClicked.fourrupee.isClicked
                          ? '#FFFFFF'
                          : '#351347',
                      },
                    ]}>
                    ₹₹₹₹
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.filterTextContainer}>
              <Text style={styles.filterHeaderText}>Features</Text>
            </View>
            <TouchableOpacity
              style={styles.featureContainer}
              onPress={() =>
                setFeatures(prev => ({
                  ...prev,
                  creditCard: !features.creditCard,
                }))
              }>
              <Text
                style={[
                  styles.featureText,
                  {color: features.creditCard ? '#000000' : '#A9A9A9'},
                ]}>
                Accepts credit cards
              </Text>

              {features.creditCard ? (
                <Image
                  source={require('../../assets/images/filter_selected.png')}
                  style={styles.selectedIcon}
                />
              ) : (
                <Icon
                  name="plus"
                  size={23}
                  color="rgba(53, 19, 71, 0.4)"
                  style={styles.plusIcon}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.featureContainer}
              onPress={() =>
                setFeatures(prev => ({
                  ...prev,
                  delivery: !features.delivery,
                }))
              }>
              <Text
                style={[
                  styles.featureText,
                  {color: features.delivery ? '#000000' : '#A9A9A9'},
                ]}>
                Delivery
              </Text>

              {features.delivery ? (
                <Image
                  source={require('../../assets/images/filter_selected.png')}
                  style={styles.selectedIcon}
                />
              ) : (
                <Icon
                  name="plus"
                  size={23}
                  color="rgba(53, 19, 71, 0.4)"
                  style={styles.plusIcon}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.featureContainer}
              onPress={() =>
                setFeatures(prev => ({
                  ...prev,
                  dogFriendly: !features.dogFriendly,
                }))
              }>
              <Text
                style={[
                  styles.featureText,
                  {color: features.dogFriendly ? '#000000' : '#A9A9A9'},
                ]}>
                Dog Friendly
              </Text>

              {features.dogFriendly ? (
                <Image
                  source={require('../../assets/images/filter_selected.png')}
                  style={styles.selectedIcon}
                />
              ) : (
                <Icon
                  name="plus"
                  size={23}
                  color="rgba(53, 19, 71, 0.4)"
                  style={styles.plusIcon}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.featureContainer}
              onPress={() =>
                setFeatures(prev => ({
                  ...prev,
                  familyFriendly: !features.familyFriendly,
                }))
              }>
              <Text
                style={[
                  styles.featureText,
                  {color: features.familyFriendly ? '#000000' : '#A9A9A9'},
                ]}>
                Family-Friendly places
              </Text>

              {features.familyFriendly ? (
                <Image
                  source={require('../../assets/images/filter_selected.png')}
                  style={styles.selectedIcon}
                />
              ) : (
                <Icon
                  name="plus"
                  size={23}
                  color="rgba(53, 19, 71, 0.4)"
                  style={styles.plusIcon}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.featureContainer}
              onPress={() =>
                setFeatures(prev => ({
                  ...prev,
                  walkingDistance: !features.walkingDistance,
                }))
              }>
              <Text
                style={[
                  styles.featureText,
                  {color: features.walkingDistance ? '#000000' : '#A9A9A9'},
                ]}>
                In walking distance
              </Text>

              {features.walkingDistance ? (
                <Image
                  source={require('../../assets/images/filter_selected.png')}
                  style={styles.selectedIcon}
                />
              ) : (
                <Icon
                  name="plus"
                  size={23}
                  color="rgba(53, 19, 71, 0.4)"
                  style={styles.plusIcon}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.featureContainer}
              onPress={() =>
                setFeatures(prev => ({
                  ...prev,
                  outdoorSeating: !features.outdoorSeating,
                }))
              }>
              <Text
                style={[
                  styles.featureText,
                  {color: features.outdoorSeating ? '#000000' : '#A9A9A9'},
                ]}>
                Outdoor Seating
              </Text>

              {features.outdoorSeating ? (
                <Image
                  source={require('../../assets/images/filter_selected.png')}
                  style={styles.selectedIcon}
                />
              ) : (
                <Icon
                  name="plus"
                  size={23}
                  color="rgba(53, 19, 71, 0.4)"
                  style={styles.plusIcon}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.featureContainer}
              onPress={() =>
                setFeatures(prev => ({
                  ...prev,
                  parking: !features.parking,
                }))
              }>
              <Text
                style={[
                  styles.featureText,
                  {color: features.parking ? '#000000' : '#A9A9A9'},
                ]}>
                Parking
              </Text>

              {features.parking ? (
                <Image
                  source={require('../../assets/images/filter_selected.png')}
                  style={styles.selectedIcon}
                />
              ) : (
                <Icon
                  name="plus"
                  size={23}
                  color="rgba(53, 19, 71, 0.4)"
                  style={styles.plusIcon}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.featureContainer}
              onPress={() =>
                setFeatures(prev => ({
                  ...prev,
                  wifi: !features.wifi,
                }))
              }>
              <Text
                style={[
                  styles.featureText,
                  {color: features.wifi ? '#000000' : '#A9A9A9'},
                ]}>
                Wi-Fi
              </Text>

              {features.wifi ? (
                <Image
                  source={require('../../assets/images/filter_selected.png')}
                  style={styles.selectedIcon}
                />
              ) : (
                <Icon
                  name="plus"
                  size={23}
                  color="rgba(53, 19, 71, 0.4)"
                  style={styles.plusIcon}
                />
              )}
            </TouchableOpacity>
          </KeyboardAwareScrollView>
        </View>
      )}
      {!filterClicked && filterView && (
        <View style={{flex: 1}}>
          {filteredValue.length > 0 ? (
            <FlatList
              data={filteredValue}
              keyExtractor={item => item._id}
              renderItem={renderItem}
            />
          ) : (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <Text
                style={{
                  color: '#000000',
                  fontFamily: 'Avenir Medium',
                  fontSize: 20,
                  fontWeight: '500',
                  textAlign: 'center',
                  marginBottom: 15,
                }}>
                No Results Found
              </Text>
            </View>
          )}
        </View>
      )}
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
  doneText: {
    color: '#FFFFFF',
    marginTop: 5,
    fontFamily: 'Avenir Book',
    fontSize: 16,
    fontWeight: '600',
  },

  nearbyPlacesContainer: {
    backgroundColor: '#F0F0F0',
    height: 60,
    justifyContent: 'center',
    paddingLeft: 18,
  },
  nearbyPlacesText: {
    fontFamily: 'Avenir Medium',
    fontSize: 20,
    color: '#858585',
    fontWeight: '500',
  },
  image: {height: 65, width: 65},
  cityName: {
    fontFamily: 'Avenir Book',
    fontSize: 20,
    color: '#000000',
    marginLeft: 30,
    textAlign: 'center',
  },

  nearmeListContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    height: 84,
  },
  nearmeListText: {
    fontFamily: 'Avenir Book',
    fontSize: 20,
    color: '#000000',
    marginLeft: 35,
  },
  locationIcon: {
    height: 33,
    width: 32,
    marginLeft: 10,
  },
  line: {
    height: 0.4,
  },
  filterHeaderText: {
    fontFamily: 'Avenir Medium',
    fontSize: 16.5,
    color: '#858585',
    fontWeight: '500',
  },
  sortbyButtonsContainer: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1.3,
    borderBottomWidth: 1.3,
    borderColor: '#351347',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  filterTextContainer: {
    flexDirection: 'row',
    paddingLeft: 20,
    alignItems: 'center',
    height: 54,
  },
  buttonText: {
    fontFamily: 'Avenir Medium',
    fontSize: 17,
    fontWeight: '400',
    textAlign: 'center',
  },
  sortbyButtons: {
    height: 58,
    width: '33.33%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    marginTop: 10,
    paddingHorizontal: 28,
  },
  inputfieldContainer: {
    backgroundColor: '#FFFFFF',
  },
  filterbyButtonsContainer: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1.3,
    borderBottomWidth: 1.3,
    borderColor: '#351347',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginTop: 20,
  },
  filterbyButtons: {
    height: 58,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedIcon: {
    height: 18,
    width: 18,
  },
  plusIcon: {
    height: 19,
    width: 19,
  },
  featureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    height: 64,
    marginBottom: 1,
  },
  featureText: {
    fontFamily: 'Avenir Book',
    fontSize: 18,
  },
});
