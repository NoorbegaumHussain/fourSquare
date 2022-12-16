import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  useWindowDimensions,
} from 'react-native';
import React, {useState} from 'react';
import {TextField} from 'rn-material-ui-textfield';
import {TouchableOpacity} from 'react-native-gesture-handler';
import OutlinedButton from '../components/OutlinedButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const ForgotPassword = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const width1 = width < height ? 11.5 : 20;
  const [otp, setOtp] = useState('');
  const handleGetIn = () => {
    if (otp !== '') {
      navigation.navigate('ConfirmPassword');
    } else {
      console.log('Please enter otp');
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        resizeMode="cover"
        style={styles.image}>
        <SafeAreaView>
          <KeyboardAwareScrollView>
            <Image
              source={require('../../assets/images/logo.png')}
              style={styles.logo}
            />
            <Text style={styles.text}>
              We have sent you an OTP {'\n'} Please enter it below
            </Text>
            <View style={styles.textContainer}>
              <TextField
                label="Enter OTP"
                secureTextEntry={true}
                name="otp"
                keyboardType="default"
                formatText={this.formatText}
                ref={this.fieldRef}
                value={otp}
                onChangeText={text => setOtp(text)}
                textColor="#FFFFFF"
                tintColor="#b5abab"
                baseColor="#b5abab"
                lineWidth={1}
                autoCapitalize="none"
                labelFontSize={15}
                labelOffset={{y1: -6, x1: width1}}
                autoCorrect={false}
                style={{
                  fontFamily: 'Avenir Book',
                  fontSize: 16,
                  marginBottom: 5,
                  textAlign: 'center',
                  marginTop: 10,
                }}
                labelTextStyle={{
                  textAlign: 'center',
                  color: '#b5abab',
                  fontFamily: 'Avenir Book',
                  alignSelf: 'center',
                  height: 50,
                  paddingTop: Platform.OS === 'ios' ? 2 : 2.6,
                }}
                containerStyle={
                  {
                    // height:200,
                    // borderWidth:1,
                  }
                }
              />
              {/* {errors.password && touched.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )} */}
            </View>
            <TouchableOpacity>
              <Text style={styles.resendOTP}>Resend OTP</Text>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <OutlinedButton text="Get in !" onPress={handleGetIn} />
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default ForgotPassword;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  logo: {
    marginTop: 70,
    alignSelf: 'center',
    height: 30,
    width: 210,
  },
  text: {
    fontFamily: 'Avenir Book',
    fontSize: 22,
    color: '#FFFFFF',
    lineHeight: 38,
    textAlign: 'center',
    marginTop: 70,
  },
  textContainer: {
    marginTop: 10,
    paddingHorizontal: 28,
  },
  resendOTP: {
    fontFamily: 'Avenir Book',
    textAlign: 'center',
    marginTop: 30,
    color: '#b5abab',
    fontSize: 18,
    opacity: 0.7,
  },
  buttonContainer: {
    marginTop: 39,
  },
});
