import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PrimaryButton from '../components/PrimaryButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePickerComponent from '../components/ImagePickerComponent';
import ImagePicker from 'react-native-image-crop-picker';
import {createFormData} from '../utils/createFormData';
import {addReview} from '../services/auth';

const AddReview = ({navigation, route}) => {
  const [text, setText] = useState('');
  const [imagedata, setImgData] = useState([]);
  const [imageuri, setImageUri] = useState('');

  const handleSubmit = async () => {
    const obj = createFormData({
      placeId: route?.params?.placeId,
      reviewMessage: text,
      image: imagedata,
    });
    console.log(obj);
    const response = await addReview(obj);
    // console.log(response);
    if (response.status) {
      console.log(response.message);
      navigation.goBack();
    } else {
      console.log(response.message);
    }
  };

  const getImageFromCamera = async () => {
    ImagePicker.openCamera({
      width: 104,
      height: 104,
      cropping: true,
    }).then(image => {
      // console.log(image);
      setImageUri(`file://${image.path}`);
      const {path, filename, mime} = image;
      setImgData([...imagedata, {image: {filename, mime, path}}]);
    });
  };

  const getImageFromGallary = async () => {
    ImagePicker.openPicker({
      width: 104,
      height: 104,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      // console.log(image);
      setImageUri(`file://${image.path}`);
      const {path, filename, mime} = image;
      setImgData([...imagedata, {image: {filename, mime, path}}]);
    });
  };

  const createThreeButtonAlert = () =>
    Alert.alert('Select Picture From', '', [
      {
        text: 'Camera',
        onPress: () => getImageFromCamera(),
      },
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {
        text: 'Gallary',
        onPress: () => getImageFromGallary(),
      },
    ]);

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
          {/* <View style={{flex: 1, height: '100%'}}> */}
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.writeReviewText}>Write Review</Text>
            <TextInput
              multiline={true}
              style={styles.input}
              textAlignVertical="top"
              onChangeText={string => setText(string)}
            />
            <Text style={styles.photoText}>Add a photos to your review</Text>
            <View
              style={{
                // marginHorizontal: 0,
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {imagedata?.map(item => (
                <Image
                  source={{uri: item?.image?.path}}
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 10,
                    marginRight: 10,
                    marginTop: 10,
                  }}
                />
              ))}
              <View
                style={{
                  height: 70,
                  width: 70,
                  borderRadius: 10,
                  alignContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#cccccc',
                  marginBottom: 80,
                  marginTop: 10,
                  marginRight: 10,
                }}>
                <Icon
                  name="camera-plus-outline"
                  size={40}
                  color="#301934"
                  style={{alignSelf: 'center', marginTop: 18}}
                  onPress={() => {
                    createThreeButtonAlert();
                  }}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
          {/* </View> */}
        </View>
      </View>
      <View style={styles.primaryButtonContainer}>
        <PrimaryButton text="Submit" onPress={handleSubmit} />
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
    flex: 1,
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
  addImageContainer: {
    height: 65,
    width: 65,
    borderRadius: 5,
    marginRight: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#CCCCCC',
  },
  pickedimage: {
    height: 65,
    width: 65,
    borderRadius: 5,
    marginRight: 24,
  },
  imageContainer: {
    flexDirection: 'row',
  },
});
