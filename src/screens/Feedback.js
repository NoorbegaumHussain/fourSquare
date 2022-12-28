import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  TextInput,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import PrimaryButton from '../components/PrimaryButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePickerComponent from '../components/ImagePickerComponent';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';
import {addFeedback} from '../services/auth';
import SimpleToast from 'react-native-simple-toast';
const Feedback = ({navigation}) => {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = await addFeedback(text);
    setIsLoading(false);
    if (response.status) {
      SimpleToast.show('success');
      navigation.goBack();
    } else {
      SimpleToast.show(`${response}, since feedback is empty`);
    }
    // navigation.navigate('');
    // navigation.navigate('');
  };
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
                <Text style={styles.text}>Feedback</Text>
              </View>
            </View>
          </SafeAreaView>
        </View>
        <View style={styles.reviewContainer}>
          <KeyboardAwareScrollView>
            <Text style={styles.writeReviewText}>Write your feedback</Text>
            <TextInput
              multiline={true}
              style={styles.input}
              onChangeText={string => setText(string)}
              // value={text}
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
      {isLoading ? (
        <View style={styles.primaryButtonContainer}>
          <ActivityIndicator size="large" color="#310D20" />
        </View>
      ) : (
        <View style={styles.primaryButtonContainer}>
          <PrimaryButton text="Submit" onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
};

export default Feedback;
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
});
