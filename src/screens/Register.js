import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  Text,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextField} from 'rn-material-ui-textfield';
import {Formik} from 'formik';
import * as yup from 'yup';
import OutlinedButton from '../components/OutlinedButton';
import {registerUser} from '../services/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Register = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const width1 = width < height ? 11.5 : 20;
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const loginValidationSchema = yup.object().shape({
    name: yup.string().required('UserName is Required'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is Required'),
    mobileNo: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('Phone number is Required'),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .required('Password Confirmation is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

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
              initialValues={{
                name: '',
                email: '',
                mobileNo: '',
                confirmPassword: '',
                password: '',
              }}
              onSubmit={async values => {
                const obj = {
                  name: values.name,
                  email: values.email,
                  phone: values.mobileNo,
                  password: values.password,
                };
                const response = await registerUser(obj);
                if (response?.data?.status) {
                  // const headers = response.headers;
                  let stringifiedToken = JSON.stringify({
                    accessToken: response.headers.authorization,
                    refreshToken: response.headers['refresh-token'],
                  });
                  console.log(stringifiedToken);
                  try {
                    await AsyncStorage.setItem('token', stringifiedToken);
                  } catch (e) {
                    console.log('error in storing data in async');
                  }
                  navigation.navigate('DrawerNavigator');
                } else {
                  console.log(response);
                }
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                  />
                  <View style={styles.inputFieldsContainer}>
                    <View style={styles.textContainer}>
                      <TextField
                        label="Name"
                        name="name"
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
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
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
                      {errors.email && touched.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                    </View>
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
                      {errors.email && touched.email && (
                        <Text style={styles.errorText}>{errors.email}</Text>
                      )}
                    </View>
                    <View style={styles.textContainer}>
                      <TextField
                        label="Mobile Number"
                        name="mobileNo"
                        keyboardType="phone-pad"
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
                        onChangeText={handleChange('mobileNo')}
                        onBlur={handleBlur('mobileNo')}
                        value={values.mobileNo}
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
                      {errors.mobileNo && touched.mobileNo && (
                        <Text style={styles.errorText}>{errors.mobileNo}</Text>
                      )}
                    </View>
                    <View style={styles.textContainer}>
                      <TextField
                        label="Enter Password"
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
                    <View style={styles.textContainer}>
                      <TextField
                        label="Confirm Password"
                        secureTextEntry={true}
                        name="confirmPassword"
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
                        onChangeText={handleChange('confirmPassword')}
                        onBlur={handleBlur('confirmPassword')}
                        value={values.confirmPassword}
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
                          paddingTop: Platform.OS === 'ios' ? 2 : 4.5,
                        }}
                        containerStyle={
                          {
                            // height:200,
                            // borderWidth:1,
                          }
                        }
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text style={styles.errorText}>
                          {errors.confirmPassword}
                        </Text>
                      )}
                    </View>
                  </View>
                  <View style={styles.submitButton}>
                    <OutlinedButton text="Login" onPress={handleSubmit} />
                  </View>
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default Register;

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
  textContainer: {
    marginTop: 10,
    paddingHorizontal: 28,
  },
  submitButton: {
    marginTop: 93,
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
  inputFieldsContainer: {
    marginTop: 10,
  },
});
