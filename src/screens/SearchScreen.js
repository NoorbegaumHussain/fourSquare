import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  useWindowDimensions,
  Pressable,
  Platform,
  PermissionsAndroid,
  Animated,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';
import CompassIcon from 'react-native-vector-icons/Ionicons';
import {TextField} from 'rn-material-ui-textfield';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RestaurantDetails from '../components/RestaurantDetails';
import OutlinedButton from '../components/OutlinedButton';
import PrimaryButton from '../components/PrimaryButton';
import {ScrollView} from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import MapView, {Marker} from 'react-native-maps';
import {isMap} from 'immer/dist/internal';
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
];
const suggestionsData = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Top pick',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Popular',
  },
];
const SearchScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const width1 = width < height ? 11.5 : 20;
  const [filterClicked, setFilterClicked] = useState(false);
  const [nearme, setNearme] = useState('');
  const [focus, setFocus] = useState({
    search: {hasfocus: false},
    nearme: {hasfocus: false},
  });
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
  const [place, setPlace] = useState({
    isSet: false,
    placeString: '',
  });
  const [mapView, setMapView] = useState(false);
  console.log(place.isSet, place.placeString);
  const handleCardClick = () => {
    console.log('card Clicked ys');
  };
  const mapHeight = width < height ? '28%' : '50%';
  const [currentLongitude, setCurrentLongitude] = useState('');
  const [currentLatitude, setCurrentLatitude] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const mapRef = useRef(null);

  useEffect(() => {
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
    if (mapView) {
      requestLocationPermission();
    }
  }, [mapView]);

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
      <TouchableOpacity onPress={handleCardClick}>
        <View style={styles.cardContainer}>
          <Image
            source={require('../../assets/images/restaurant.png')}
            style={styles.image}
          />
          <Text style={styles.cityName}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderSuggestions = ({item}) => {
    return (
      <TouchableOpacity onPress={handleCardClick}>
        <View style={styles.cardContainer}>
          <Text style={styles.cityName}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const searchData = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571sdse29d72',
      title: 'Third Item',
    },
  ];

  const renderSearch = ({item}) => {
    return (
      <View style={{flex: 1,marginLeft:20}}>
        <Pressable onPress={handleCardClick}>
          <RestaurantDetails
            image={
              <Image
                source={require('../../assets/images/favourite_icon.png')}
                style={styles.favIcon}
              />
            }
          />
          <Text>{item.title}</Text>
        </Pressable>
      </View>
    );
  };

  const [currentIndex, setCurrentIndex] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const viewableItemsChanged = useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0]?.index);
  }).current;
  const slidesRef = useRef(null);
  const viewConfig = useRef({
    waitForInteraction: true,
    viewAreaCoveragePercentThreshold: 0,
  }).current;
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            focus.nearme.hasfocus || filterClicked ? '#FFFFFF' : '#F0F0F0',
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
                  onFocus={() =>
                    setFocus(prev => ({
                      nearme: {hasfocus: false},
                      search: {hasfocus: true},
                    }))
                  }
                  onChangeText={searchString => {
                    if (searchString.length > 2) {
                      setPlace(() => ({
                        isSet: true,
                        placeString: searchString,
                      }));
                      setFocus(prev => ({
                        nearme: {hasfocus: false},
                        search: {hasfocus: false},
                      }));
                    } else {
                      setPlace(() => ({
                        isSet: false,
                        placeString: '',
                      }));
                      setFocus(prev => ({
                        nearme: {hasfocus: false},
                        search: {hasfocus: true},
                      }));
                    }
                    // setSearch({searchString});
                  }}
                  underlineColorAndroid="transparent"
                />
              </View>
              <View style={styles.searchSection}>
                <CompassIcon
                  name="compass-outline"
                  size={23}
                  color="#CCCCCC"
                  style={styles.searchIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Near Me"
                  placeholderTextColor="#CCCCCC"
                  onFocus={() =>
                    setFocus(prev => ({
                      search: {hasfocus: false},
                      nearme: {hasfocus: true},
                    }))
                  }
                  onChangeText={searchString => {
                    setNearme({searchString});
                  }}
                  underlineColorAndroid="transparent"
                />
              </View>
            </View>
            <View style={styles.filterContainer}>
              {filterClicked ? (
                <TouchableOpacity
                  onPress={() => setFilterClicked(!filterClicked)}>
                  <Text style={styles.doneText}>Done</Text>
                </TouchableOpacity>
              ) : (
                <Icon
                  name="filter"
                  size={25}
                  color="#FFFFFF"
                  style={styles.filter}
                  onPress={() => setFilterClicked(!filterClicked)}
                />
              )}
            </View>
          </View>
        </SafeAreaView>
      </View>
      {!filterClicked && focus.search.hasfocus && (
        <ScrollView>
          <View style={styles.nearbyPlacesContainer}>
            <Text style={styles.nearbyPlacesText}>Near by places</Text>
          </View>
          <View>
            <FlatList
              data={DATA}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
          </View>
          <View style={styles.nearbyPlacesContainer}>
            <Text style={styles.nearbyPlacesText}>Suggestions</Text>
          </View>
          <View>
            <FlatList
              data={suggestionsData}
              keyExtractor={item => item.id}
              renderItem={renderSuggestions}
            />
          </View>
        </ScrollView>
      )}
      {place.isSet && !mapView && (
        <View style={{flex: 1}}>
          <FlatList
            data={searchData}
            keyExtractor={item => item.id}
            renderItem={renderSearch}
          />
          <View style={{marginBottom: Platform.OS === 'ios' ? 13 : 0}}>
            <PrimaryButton text="Map View" onPress={() => setMapView(true)} />
          </View>
        </View>
      )}
      {place.isSet && mapView && (
        <View style={{flex: 1}}>
          <View style={styles.mainContainer}>
            <View style={[styles.mapContainer, {height: '103.5%'}]}>
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
                    onDragEnd={e =>
                      alert(JSON.stringify(e.nativeEvent.coordinate))
                    }
                    title={'Test Marker'}
                    description={'This is a description of the marker'}
                  />
                </MapView>
              ) : null}
            </View>

            <FlatList
              data={searchData}
              keyExtractor={item => item.id}
              renderItem={renderSearch}
              pagingEnabled={true}
              horizontal
              bounces={false}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: false},
              )}
              onViewableItemsChanged={viewableItemsChanged}
              viewabilityConfig={viewConfig}
              scrollEventThrottle={32}
              ref={slidesRef}
            />
          </View>
          <View style={{marginBottom: Platform.OS === 'ios' ? 13 : 0}}>
            <PrimaryButton text="List View" onPress={() => setMapView(false)} />
          </View>
        </View>
      )}
      {!filterClicked && focus.nearme.hasfocus && (
        <View>
          <View style={styles.nearmeListContainer}>
            <Image
              source={require('../../assets/images/location_icon.png')}
              style={styles.locationIcon}
            />
            <Text style={styles.nearmeListText}>Use my current location</Text>
          </View>
          <View style={[styles.line, {backgroundColor: '#8D8D8d'}]} />
          <View style={styles.nearmeListContainer}>
            <Image
              source={require('../../assets/images/map_icon.png')}
              style={styles.locationIcon}
            />
            <Text style={styles.nearmeListText}>Select Search area on map</Text>
          </View>
          <View style={[styles.line, {backgroundColor: '#8D8D8d'}]} />
        </View>
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
                  // onChangeText={handleChange('email')}
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
    </View>
  );
};
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
export default SearchScreen;
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
  filter: {
    transform: [{scaleX: -1}],
    marginTop: 3,
  },
  backIcon: {
    height: 23,
    width: 25,
    marginTop: 3,
  },
  doneText: {
    color: '#FFFFFF',
    marginTop: 5,
    fontFamily: 'Avenir Book',
    fontSize: 16,
    fontWeight: '600',
  },
  filterContainer: {
    width: 40,
    alignItems: 'center',
    fontWeight: '500',
  },
  backIconContainer: {
    width: 40,
    fontWeight: '500',
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
  cardContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingLeft: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
    height: 80,
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
    // borderWidth:0.3,
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
    fontWeight: '500',
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
  favIcon: {
    height: 25,
    resizeMode: 'contain',
    width: 25,
    marginTop: 8,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#E5E5E5',
    marginBottom: 20,
  },
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
