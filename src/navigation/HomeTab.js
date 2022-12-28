import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import NearYou from '../screens/HomeTabScreens/NearYou';
import TopPick from '../screens/HomeTabScreens/TopPick';
import Popular from '../screens/HomeTabScreens/Popular';
import Lunch from '../screens/HomeTabScreens/Lunch';
import Coffee from '../screens/HomeTabScreens/Coffee';
import {useWindowDimensions} from 'react-native';
const Tab = createMaterialTopTabNavigator();

const HomeTab = () => {
  const {width, height} = useWindowDimensions();
  const width1 = width < height ? 'auto' : '100%';

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarScrollEnabled: true,
        tabBarActiveTintColor: 'white',
        upperCaseLabel: false,
        tabBarStyle: {
          backgroundColor: '#370F24',
        },
        tabBarItemStyle: {width: '100%'},
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: 'Avenir Medium',
          textTransform: 'none',
          fontWeight: '600',
          paddingLeft: 10,
        },
        tabBarContentContainerStyle: {
          justifyContent: 'center',
          width: width1,
        },
        tabBarIndicatorStyle: {
          borderBottomColor: '#370F24',
          borderBottomWidth: 2.5,
          borderRadius: 3.5,
        },
      }}>
      <Tab.Screen name="Near you" component={NearYou} />
      <Tab.Screen name="Toppick" component={TopPick} />
      <Tab.Screen name="Popular" component={Popular} />
      <Tab.Screen name="Lunch" component={Lunch} />
      <Tab.Screen name="Cafe" component={Coffee} />
    </Tab.Navigator>
  );
};

export default HomeTab;
