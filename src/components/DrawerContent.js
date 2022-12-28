import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {
  DrawerContentScrollView,
  useDrawerStatus,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';
import {useIsFocused} from '@react-navigation/native';
import {getParticularUserDetails} from '../services/auth';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {
  addUserId,
  clearFavourites,
  deleteUserId,
} from '../redux/fourSquareSlice';
import SimpleToast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {isLoggedIn} from '../utils/isLoggedIn';
const DrawerContent = props => {
  const [userData, setUserData] = useState();
  const [token, setToken] = useState('');
  const [logout, setLogout] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const token = isLoggedIn();
  // const userId = useSelector(state => state.foursquaredata.userId);
  // console.log('UserId', userId);

  const getToken = async () => {
    var data = await isLoggedIn();
    setToken(data);
  };

  const dispatch = useDispatch();
  const loadUserDetails = async () => {
    getToken();
    if (token) {
      setIsLoading(true);
      const response = await getParticularUserDetails();
      setIsLoading(false);
      if (
        response?.status === 200 &&
        response?.data?.data !== undefined &&
        !props?.route
      ) {
        setUserData(response?.data?.data);
        dispatch(addUserId(response?.data?.data._id));
      }
    }
  };

  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus === true) {
      loadUserDetails();
    }
  }, [focus, logout, token]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/sidemenu_background.png')}
        style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          {isLoading ? (
            <View style={styles.image}>
              <ActivityIndicator size="large" color="#CCCCCC" />
            </View>
          ) : (
            <>
              {token && !props?.route ? (
                <Image
                  source={{uri: userData?.profilePic?.url}}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={require('../../assets/images/defaultProfile.png')}
                  style={styles.defaultImage}
                />
              )}
            </>
          )}
          {token && !props?.route ? (
            <Text style={styles.loginText}>{userData?.name}</Text>
          ) : (
            <TouchableOpacity
              onPress={() => props.navigation.navigate('LoginScreen')}>
              <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
          )}

          <View style={{marginTop: 40}}>
            {token && !props?.route ? (
              <>
                <TouchableOpacity
                  style={styles.drawerContentContainer}
                  onPress={() => props.navigation.navigate('FavouritesStack')}>
                  <Image
                    source={require('../../assets/images/favourite_icon_copy.png')}
                    style={styles.drawerContentIconFav}
                  />
                  <Text style={styles.drawerContentText}>Favourites</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.drawerContentContainer}
                  onPress={() => props.navigation.navigate('Feedback')}>
                  <Image
                    source={require('../../assets/images/feedback.png')}
                    style={styles.drawerContentIcon}
                  />
                  <Text style={styles.drawerContentText}>Feedback</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity style={styles.drawerContentContainer}>
                  <Image
                    source={require('../../assets/images/favourite_icon_copy.png')}
                    style={styles.drawerContentIconFavHide}
                  />
                  <Text style={styles.drawerContentTextHide}>Favourites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerContentContainer}>
                  <Image
                    source={require('../../assets/images/feedback.png')}
                    style={styles.drawerContentIconHide}
                  />
                  <Text style={styles.drawerContentTextHide}>Feedback</Text>
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={styles.drawerContentContainer}
              onPress={() => props.navigation.navigate('AboutUs')}>
              <Image
                source={require('../../assets/images/about.png')}
                style={styles.drawerContentIcon}
              />
              <Text style={styles.drawerContentText}>AboutUs</Text>
            </TouchableOpacity>
            {token && !props?.route ? (
              <TouchableOpacity
                style={styles.drawerContentContainer}
                onPress={async () => {
                  await AsyncStorage.removeItem('auth');
                  const afterDelete = await AsyncStorage.getItem('auth');
                  console.log('after logging out data is async', afterDelete);
                  setLogout(true);
                  dispatch(clearFavourites());
                }}>
                <Image
                  source={require('../../assets/images/logout.png')}
                  style={styles.drawerContentIcon}
                />
                <Text style={styles.drawerContentText}>Logout</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.drawerContentContainer}>
                <Image
                  source={require('../../assets/images/logout.png')}
                  style={styles.drawerContentIconHide}
                />
                <Text style={styles.drawerContentTextHide}>Logout</Text>
              </TouchableOpacity>
            )}
          </View>
        </DrawerContentScrollView>
      </ImageBackground>
    </View>
  );
};

export default DrawerContent;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContent: {
    // alignItems:
    // marginLeft: 18,
  },
  image: {
    height: 95,
    width: 95,
    borderRadius: 50,
    marginTop: 17,
    alignSelf: 'center',
  },
  loginText: {
    color: '#CCCCCC',
    fontSize: 24,
    fontFamily: 'Avenir Medium',
    textAlign: 'center',
    marginTop: 10,
  },
  drawerContentText: {
    fontFamily: 'Avenir Medium',
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  drawerContentContainer: {
    height: 87,
    width: '82%',
    borderBottomWidth: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: 'rgba(204, 204, 204, 0.3)',
  },
  drawerContentIcon: {
    resizeMode: 'contain',
    marginHorizontal: 15,
    height: 27,
  },
  drawerContentIconFav: {
    resizeMode: 'contain',
    marginHorizontal: 20,
    height: 22,
  },
  drawerContentTextHide: {
    fontFamily: 'Avenir Medium',
    fontSize: 18,
    color: '#474049',
    fontWeight: '500',
  },
  defaultImage: {
    height: 120,
    width: 120,
    borderRadius: 50,
    marginTop: 17,
    alignSelf: 'center',
  },
  drawerContentIconFavHide: {
    resizeMode: 'contain',
    marginHorizontal: 20,
    height: 22,
    tintColor: '#474049',
  },
  drawerContentIconHide: {
    resizeMode: 'contain',
    marginHorizontal: 15,
    height: 27,
    tintColor: '#474049',
  },
});
