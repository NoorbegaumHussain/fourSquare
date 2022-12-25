import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Pressable,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import CustomAppBar from '../components/CustomAppBar';
import ReviewCard from '../components/ReviewCard';
import Icon from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';
import {getReviewsById} from '../services/auth';
import {formatISODate} from '../utils/formatISODate';

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

const ReviewList = ({navigation, route}) => {
  const [reviews, setReviews] = useState('');
  const renderItem = ({item}) => {
    return (
      <ReviewCard
        name={item?.name}
        userReview={item?.reviewMessage}
        date={formatISODate(item.createdAt)}
        url={item?.reviewerPhoto?.url}
      />
    );
  };

  const loadList = async () => {
    const response = await getReviewsById(route?.params?.placeId);
    if (response.status) {
      setReviews(response?.data?.data);
    } else {
      console.log(response);
    }
  };

  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus === true) {
      loadList();
    }
  }, [focus]);

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
            rightIcon={
              <Icon
                name="addfile"
                size={24}
                color="#FFFFFF"
                onPress={() =>
                  navigation.navigate('AddReview', {
                    placeId: route?.params?.placeId,
                  })
                }
              />
            }
          />
        </SafeAreaView>
      </View>
      <FlatList
        data={reviews}
        keyExtractor={item => item._id}
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
