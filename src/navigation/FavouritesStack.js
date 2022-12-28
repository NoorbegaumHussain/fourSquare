import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import RestaurantDetailScreen from '../screens/RestaurantDetailScreen';
import PhotoGallery from '../screens/PhotoGallery';
import PhotoDetails from '../screens/PhotoDetails';
import ReviewList from '../screens/ReviewList';
import AddReview from '../screens/AddReview';
import SearchScreen from '../screens/SearchScreen';
import Favourites from '../screens/Favourites';

const Stack = createStackNavigator();

const FavouritesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favourites"
        component={Favourites}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="RestaurantDetailScreen"
        component={RestaurantDetailScreen}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="ReviewList"
        component={ReviewList}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="PhotoGallery"
        component={PhotoGallery}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="PhotoDetails"
        component={PhotoDetails}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="AddReview"
        component={AddReview}
        options={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
    </Stack.Navigator>
  );
};

export default FavouritesStack;
