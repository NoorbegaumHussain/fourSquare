import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../components/DrawerContent';
import AboutUs from '../screens/AboutUs';
import Favourites from '../screens/Favourites';
import Feedback from '../screens/Feedback';
import AppStack from './AppStack';
import {Dimensions} from 'react-native';
import FavouritesStack from './FavouritesStack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = ({route}) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        overlayColor: 0,
        swipeEdgeWidth: 0,
        sceneContainerStyle: {
          backgroundColor: '#FFFFFF',
        },
        // drawerStyle: {
        //   width: '80%',
        // },
        drawerType: 'slide',
      }}
      drawerContent={props => (
        <DrawerContent {...props} route={route?.params?.isSkip} />
      )}>
      <Drawer.Screen name="AppStack" component={AppStack} />
      <Drawer.Screen name="FavouritesStack" component={FavouritesStack} />
      <Drawer.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen name="AboutUs" component={AboutUs} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
