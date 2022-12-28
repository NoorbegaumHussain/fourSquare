import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Platform,
  TouchableOpacity
} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import PrimaryButton from '../components/PrimaryButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePickerComponent from '../components/ImagePickerComponent';
import {useIsFocused} from '@react-navigation/native';
import {getAbout} from '../services/auth';
const AboutUs = ({navigation}) => {
  const [aboutus, setAboutus] = useState('');
  const loadList = async () => {
    const response = await getAbout();

    if (response.status) {
      console.log('success about', response.data.data[0].aboutUs);
      setAboutus(response.data.data[0].aboutUs);
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
      <View style={{flex: 1, height: '100%'}}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#310D20"
        />
        <View style={styles.backgroundBeyoundSafeArea}>
          <SafeAreaView>
            <View style={styles.headerContainer}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  source={require('../../assets/images/back_icon.png')}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={styles.text}>About Us</Text>
              </View>
            </View>
          </SafeAreaView>
        </View>
        <Text style={styles.aboutUstext}>{aboutus}</Text>
      </View>
    </View>
  );
};

export default AboutUs;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundBeyoundSafeArea: {
    backgroundColor: '#310D20',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#370F24',
    height: 72,
    paddingHorizontal: 18,
  },
  text: {
    color: '#FFFFFF',
    fontFamily: 'Avenir Medium',
    fontSize: 23,
    fontWeight: '500',
    // marginLeft:'23%',
  },
  textContainer: {
    alignItems: 'center',
    width: '84%',
  },
  input: {
    height: 190,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: '#CCCCCC',
    // textAlign: 'justify',
    fontFamily: 'Avenir Book',
    fontSize: 18.5,
    color: '#8D8D8D',
    lineHeight: 29,
    fontWeight: '500',
  },
  writeReviewText: {
    fontFamily: 'Avenir Book',
    fontSize: 20,
    color: '#000000',
    marginBottom: 10,
    fontWeight: '500',
  },
  reviewContainer: {
    marginHorizontal: 18,
    marginVertical: 25,
  },
  image: {
    height: 65,
    width: 65,
    borderRadius: 5,
    marginRight: 24,
  },
  photoText: {
    fontFamily: 'Avenir Book',
    fontSize: 18,
    color: '#351347',
    marginBottom: 10,
    marginTop: 13,
    fontWeight: '300',
  },
  primaryButtonContainer: {
    // justifyContent: 'flex-end',
    marginBottom: Platform.OS === 'ios' ? 15 : 0,
  },
  backIcon: {
    height: 22,
    width: 22,
    marginLeft: 6,
  },
  aboutUstext: {
    fontFamily: 'Avenir Book',
    fontSize: 21,
    lineHeight: 30,
    color: 'rgba(0,0,0,0.6)',
    fontWeight: '400',
    textAlign: 'justify',
    paddingHorizontal: 18,
    marginVertical: 20,
  },
});
