import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PrimaryButton from '../components/PrimaryButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePickerComponent from '../components/ImagePickerComponent';
const AddReview = ({navigation}) => {
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
                <Text style={styles.text}>Add Review</Text>
              </View>
            </View>
          </SafeAreaView>
        </View>
        <View style={styles.reviewContainer}>
          <KeyboardAwareScrollView>
            <Text style={styles.writeReviewText}>Write Review</Text>
            <TextInput
              multiline={true}
              style={styles.input}
              textAlignVertical="top"
              // onChangeText={onChangeText}
              // value={text}
            />
            <Text style={styles.photoText}>Add a photos to your review</Text>

            <ImagePickerComponent />
          </KeyboardAwareScrollView>
        </View>
      </View>
      <View style={styles.primaryButtonContainer}>
        <PrimaryButton text="Submit" onPress={() => navigation.navigate('')} />
      </View>
    </View>
  );
};

export default AddReview;
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
    color: '#351347',
    marginBottom: 10,
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
});
