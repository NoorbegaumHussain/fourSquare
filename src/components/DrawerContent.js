import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
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
import {addUserId} from '../redux/fourSquareSlice';
const DrawerContent = props => {
  const [userData, setUserData] = useState();
  const userId = useSelector(state => state.foursquaredata.userId);
  console.log('UserId', userId);
  const dispatch = useDispatch();
  const loadUserDetails = async () => {
    const response = await getParticularUserDetails();
    if (response.status === 200 && response?.data?.data !== undefined) {
      setUserData(response?.data?.data);
      dispatch(addUserId(response?.data?.data._id));
      console.log('userDetails', response.data.data);
    }
  };

  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus === true) {
      loadUserDetails();
    }
  }, [focus]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/sidemenu_background.png')}
        style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          {userId !== null ? (
            <Image
              source={{uri: userData?.profilePic?.url}}
              style={styles.image}
            />
          ) : (
            <Image
              source={require('../../assets/images/defaultProfile.png')}
              style={styles.image}
            />
          )}

          <Text style={styles.loginText}>Noorbegaum</Text>
          <View style={{marginTop: 40}}>
            {userId !== null ? (
              <>
                <TouchableOpacity
                  style={styles.drawerContentContainer}
                  onPress={() => props.navigation.navigate('Favourites')}>
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
                    style={styles.drawerContentIconFav}
                  />
                  <Text style={styles.drawerContentTextHide}>Favourites</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.drawerContentContainer}>
                  <Image
                    source={require('../../assets/images/feedback.png')}
                    style={styles.drawerContentIcon}
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
            <TouchableOpacity
              style={styles.drawerContentContainer}
              onPress={() => props.navigation.navigate('AboutUs')}>
              <Image
                source={require('../../assets/images/logout.png')}
                style={styles.drawerContentIcon}
              />
              <Text style={styles.drawerContentText}>Logout</Text>
            </TouchableOpacity>
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
    color: '#CCCCCC',
    fontWeight: '500',
  },
});
