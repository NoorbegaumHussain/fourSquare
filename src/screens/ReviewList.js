import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Pressable,
} from 'react-native';
import React from 'react';
import CustomAppBar from '../components/CustomAppBar';
import ReviewCard from '../components/ReviewCard';
import Icon from 'react-native-vector-icons/AntDesign';

const DATA = [
  {
    id: 1,
    name: 'Saish Balu',
    userReview: 'Must try crab soup and oyesters cooked in ghee !!',
    date: 'June 24,2015',
  },
  {
    id: 2,
    name: 'Saish Balu',
    userReview: 'Must try crab soup and oyesters cooked in ghee !!',
    date: 'June 24,2015',
  },

  {
    id: 4,
    name: 'Saish Balu',
    userReview: 'Must try crab soup and oyesters cooked in ghee !!',
    date: 'June 24,2015',
  },
  {
    id: 5,
    name: 'Saish Balu',
    userReview: 'Must try crab soup and oyesters cooked in ghee !!',
    date: 'June 24,2015',
  },
  {
    id: 6,
    name: 'Saish Balu',
    userReview: 'Must try crab soup and oyesters cooked in ghee !!',
    date: 'June 24,2015',
  },
  {
    id: 7,
    name: 'Saish Balu',
    userReview: 'Must try crab soup and oyesters cooked in ghee !!',
    date: 'June 24,2015',
  },
  {
    id: 8,
    name: 'Saish Balu',
    userReview: 'Must try crab soup and oyesters cooked in ghee !!',
    date: 'June 24,2015',
  },
  {
    id: 9,
    name: 'Saish Balu',
    userReview: 'Must try crab soup and oyesters cooked in ghee !!',
    date: 'June 24,2015',
  },
  {
    id: 10,
    name: 'Saish Balu',
    userReview: 'Must try crab soup and oyesters cooked in ghee !!',
    date: 'June 24,2015',
  },
];
const renderItem = ({item}) => {
  return (
    <Pressable>
      <ReviewCard
        name={item.name}
        userReview={item.userReview}
        date={item.date}
      />
    </Pressable>
  );
};
const ReviewList = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#310D20"
      />
      <View style={styles.backgroundBeyoundSafeArea}>
        <SafeAreaView>
          <CustomAppBar
            navigation={navigation}
            name="Atil"
            rightIcon={<Icon name="addfile" size={24} color="#FFFFFF" />}
          />
        </SafeAreaView>
      </View>
      <FlatList
        data={DATA}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

export default ReviewList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundBeyoundSafeArea: {
    backgroundColor: '#310D20',
  },
});
