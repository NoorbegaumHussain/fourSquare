import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {
  DrawerContentScrollView,
  useDrawerStatus,
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Feather';

const DrawerContent = props => {

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/sidemenu_background.png')}
        style={{flex: 1}}>
        <DrawerContentScrollView {...props}>
          <Image
            source={require('../../assets/images/profile1.png')}
            style={styles.image}
          />
          <Text style={styles.loginText}>Login</Text>
          <View style={{marginTop: 40}}>
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
            <TouchableOpacity
              style={styles.drawerContentContainer}
              onPress={() => props.navigation.navigate('AboutUs')}>
              <Image
                source={require('../../assets/images/about.png')}
                style={styles.drawerContentIcon}
              />
              <Text style={styles.drawerContentText}>AboutUs</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.drawerContentContainer}>
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
});
