import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  Platform,
  useWindowDimensions,
  Share,
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {getParticularImageDetailsById} from '../services/auth';
import {useIsFocused} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
const PhotoDetails = ({navigation, route}) => {
  const {width, height} = useWindowDimensions();
  const [date, setDate] = useState('');
  const loadImages = async () => {
    const response = await getParticularImageDetailsById(
      route?.params?.imageId,
    );
    if (response.status) {
      console.log('.............', response.data.data);
      setDate(response?.data);
    } else {
      console.log(response);
    }
  };

  const focus = useIsFocused();
  useLayoutEffect(() => {
    if (focus === true) {
      loadImages();
    }
  }, [focus]);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'details',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: route?.params?.image}}
        resizeMode="cover"
        style={styles.image}>
        <LinearGradient
          start={{x: 1, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0, 0.3]}
          style={{flex: 1}}
          colors={['rgba(0,0,0,0.8)', 'rgba(0,0,0,0.0)']}>
          <View style={{flex: width > height ? 0.8 : 0.88}}>
            <SafeAreaView>
              <View style={styles.header}>
                <Icon
                  name="close"
                  size={30}
                  color="#FFFFFF"
                  onPress={() => navigation.goBack()}
                />
                <Text style={styles.text}>{route?.params?.placeName}</Text>
                <TouchableOpacity onPress={() => onShare()}>
                  <Image
                    source={require('../../assets/images/share_icon.png')}
                    style={styles.shareIcon}
                  />
                </TouchableOpacity>
              </View>
            </SafeAreaView>
          </View>
          <View
            style={[
              styles.uploaderDetailsContainer,
              {flex: width > height ? 0.2 : 0.12},
            ]}>
            <Image
              source={require('../../assets/images/profile1.png')}
              style={styles.profile}
            />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{route?.params?.name}</Text>
              <Text style={styles.date}>Added May 12,2016</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default PhotoDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : 10,
  },
  closeIcon: {
    tintColor: '#FFFFFF',
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir Medium',
    fontSize: 22.5,
    fontWeight: '500',
  },
  shareIcon: {
    height: 24,
    width: 24,
  },
  uploaderDetailsContainer: {
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    marginTop: Platform.OS === 'ios' ? 10 : 0,
    flexDirection: 'row',
    paddingLeft: 18,
  },
  profile: {
    borderRadius: 50,
    height: 60,
    width: 60,
    alignSelf: 'center',
  },
  name: {
    fontFamily: 'Avenir Medium',
    fontSize: 19,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  date: {
    fontFamily: 'Avenir Book',
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  textContainer: {
    marginTop: 10,
    marginLeft: 26,
  },
});
