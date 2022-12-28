import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Pressable,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import CustomAppBar from '../components/CustomAppBar';
import ReviewCard from '../components/ReviewCard';
import Icon from 'react-native-vector-icons/AntDesign';
import {useIsFocused} from '@react-navigation/native';
import {getReviewsById} from '../services/auth';
import {formatISODate} from '../utils/formatISODate';
import {isLoggedIn} from '../utils/isLoggedIn';
import SimpleToast from 'react-native-simple-toast';

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
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const getToken = async () => {
    var data = await isLoggedIn();
    setToken(data);
  };
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
    setIsLoading(true);
    const response = await getReviewsById(route?.params?.placeId);
    setIsLoading(false);
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
      getToken();
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
              // <Icon
              //   name="addfile"
              //   size={24}
              //   color="#FFFFFF"
              //   onPress={() => {
              //     if (token) {
              //       navigation.navigate('AddReview', {
              //         placeId: route?.params?.placeId,
              //       });
              //     } else {
              //       SimpleToast.show('Please Login to continue');
              //     }
              //   }}
              // />
              <TouchableOpacity
                onPress={() => {
                  if (token) {
                    navigation.navigate('AddReview', {
                      placeId: route?.params?.placeId,
                    });
                  } else {
                    SimpleToast.show('Please Login to continue');
                  }
                }}>
                <Image
                  source={require('../../assets/images/add_review2.png')}
                  style={{width: 20, height: 25, tintColor: '#FFFFFF'}}
                />
              </TouchableOpacity>
            }
          />
        </SafeAreaView>
      </View>
      {isLoading && (
        <View style={{marginTop: 15}}>
          <ActivityIndicator size="large" color="#310D20" />
        </View>
      )}
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
