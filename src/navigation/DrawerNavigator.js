import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import DrawerContent from '../components/DrawerContent';
import AboutUs from '../screens/AboutUs';
import Favourites from '../screens/Favourites';
import Feedback from '../screens/Feedback';
import {NavigationContainer} from '@react-navigation/native';
import AppStack from './AppStack';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        overlayColor: 0,
        sceneContainerStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
      drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="AppStack" component={AppStack} />
      <Drawer.Screen name="Favourites" component={Favourites} />
      <Drawer.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen name="AboutUs" component={AboutUs} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
