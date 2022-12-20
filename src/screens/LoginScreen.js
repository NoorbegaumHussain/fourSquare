import React from 'react';
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Platform
} from 'react-native';
import {TextField} from 'rn-material-ui-textfield';
import OutlinedButton from '../components/OutlinedButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as yup from 'yup';

const LoginScreen = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const width1 = width < height ? 11.5 : 20;

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required'),
  });

  const handleForgotPasssword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleCreateAccount = () => {
    navigation.navigate('Register');
  };

  const handleSkip = () => {
    navigation.navigate('HomeScreen');
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/background.png')}
        resizeMode="cover"
        style={styles.image}>
        <SafeAreaView>
          <KeyboardAwareScrollView>
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{email: '', password: ''}}
              onSubmit={values => {
                console.log(values);
                navigation.navigate('DrawerNavigator');
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
                touched,
              }) => (
                <>
                  <TouchableOpacity onPress={handleSkip}>
                    <Text style={styles.skip}>Skip ></Text>
                  </TouchableOpacity>
                  <View>
                    <Image
                      source={require('../../assets/images/logo.png')}
                      style={styles.logo}
                    />
                  </View>
                  <View style={styles.inputfieldContainer}>
                    <View style={styles.textContainer}>
                      <TextField
                        label="Email"
                        name="email"
                        keyboardType="email-address"
                        formatText={this.formatText}
                        onSubmitEditing={this.onSubmit}
                        ref={this.fieldRef}
                        textColor="#FFFFFF"
                        tintColor="#b5abab"
                        baseColor="#b5abab"
                        lineWidth={1}
                        autoCapitalize="none"
                        labelFontSize={15}
                        labelOffset={{y1: -6, x1: width1}}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        autoCorrect={false}
                        style={{
                          fontFamily: 'Avenir Book',
                          fontSize: 16,
                          marginBottom: 5,
                          textAlign: 'center',
                          marginTop: 10,
                        }}
                        // color:'#b5abab'
                        labelTextStyle={{
                          textAlign: 'center',
                          //   paddingBottom: 10,
                          color: '#b5abab',
                          fontFamily: 'Avenir Book',
                          //   borderWidth: 1,
                          //   alignSelf: 'center',
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
                      {errors.email && touched.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                    </View>
                    <View style={styles.textContainer}>
                      <TextField
                        label="Password"
                        secureTextEntry={true}
                        name="password"
                        keyboardType="default"
                        formatText={this.formatText}
                        onSubmitEditing={this.onSubmit}
                        ref={this.fieldRef}
                        textColor="#FFFFFF"
                        tintColor="#b5abab"
                        baseColor="#b5abab"
                        lineWidth={1}
                        autoCapitalize="none"
                        labelFontSize={15}
                        labelOffset={{y1: -6, x1: width1}}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
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
                      {errors.password && touched.password && (
                        <Text style={styles.errorText}>{errors.password}</Text>
                      )}
                    </View>
                  </View>
                  <TouchableOpacity onPress={handleForgotPasssword}>
                    <Text style={styles.forgotPassText}>Forgot Password?</Text>
                  </TouchableOpacity>
                  <View style={styles.loginButtonContainer}>
                    <OutlinedButton text="Login" onPress={handleSubmit} />
                  </View>
                  <TouchableOpacity onPress={handleCreateAccount}>
                    <Text style={styles.createAccText}>Create Account</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
            <View style={styles.orButton}>
              <Text style={styles.orText}>OR</Text>
            </View>
            <View style={styles.bottomImageContainer}>
              <TouchableOpacity>
                <Image
                  source={require('../../assets/images/facebook_btn.png')}
                  style={styles.facebook}
                />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image
                  source={require('../../assets/images/g=_btn.png')}
                  style={styles.googleplus}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  skip: {
    fontFamily: 'Avenir Book',
    fontSize: 22,
    color: '#FFFFFF',
    marginTop: 15,
    textAlign: 'right',
    marginRight: 28,
  },
  logo: {
    marginTop: 70,
    alignSelf: 'center',
    height: 30,
    width: 210,
  },
  textContainer: {
    marginTop: 10,
    paddingHorizontal: 28,
  },
  inputfieldContainer: {
    marginTop: 32,
  },
  forgotPassText: {
    fontFamily: 'Avenir Book',
    textAlign: 'center',
    marginTop: 30,
    color: '#b5abab',
    fontSize: 18,
    opacity: 0.7,
  },
  loginButtonContainer: {
    marginTop: 40,
  },
  createAccText: {
    fontFamily: 'Avenir Book',
    textAlign: 'center',
    marginTop: 35,
    color: '#FFFFFF',
    fontSize: 20,
  },
  errorText: {
    fontFamily: 'Avenir Book',
    fontSize: 10,
    color: '#FF7060',
    marginTop: 5,
    marginLeft: 15,
    textAlign: 'center',
    letterSpacing: 1.2,
  },
  orButton: {
    backgroundColor: '#3B3C57',
    height: 33,
    width: 33,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    marginTop: 40,
    alignSelf: 'center',
  },
  orText: {
    fontFamily: 'Avenir Book',
    color: '#FFFFFF',
  },
  bottomImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35,
    marginBottom:20,
  },
  facebook: {
    // height: 53,
    marginLeft: 40,
    marginRight: 10,
    borderRadius: 6,
    width: 169,
  },
  googleplus: {
    // height: 53,
    marginRight: 40,
    marginLeft: 10,
    borderRadius: 6,
    width: 169,
  },
});

export default LoginScreen;
