import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  Text,
  useWindowDimensions,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {TextField} from 'rn-material-ui-textfield';
import {Formik} from 'formik';
import * as yup from 'yup';
import OutlinedButton from '../components/OutlinedButton';
import {resetPassword} from '../services/auth';

const ConfirmPassword = ({navigation, route}) => {
  const {width, height} = useWindowDimensions();
  const width1 = width < height ? 11.5 : 20;
  const [isLoading, setIsLoading] = useState(false);
  const loginValidationSchema = yup.object().shape({
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Password is required'),
    confirmPassword: yup
      .string()
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
              initialValues={{confirmPassword: '', password: ''}}
              onSubmit={async values => {
                const obj = {
                  email: route?.params?.email,
                  password: values.password,
                };
                setIsLoading(true);
                const response = await resetPassword(obj, route?.params?.token);
                setIsLoading(false);
                console.log(response);
                if (response.status) {
                  navigation.navigate('LoginScreen');
                } else {
                  console.log('Password verification failed');
                }
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
                  <Image
                    source={require('../../assets/images/logo.png')}
                    style={styles.logo}
                  />
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
                        paddingTop: Platform.OS === 'ios' ? 2 : 2.6,
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
                  {isLoading ? (
                    <View style={styles.submitButton}>
                      <ActivityIndicator size="large" color="#CCCCCC" />
                    </View>
                  ) : (
                    <View style={styles.submitButton}>
                      <OutlinedButton text="Submit" onPress={handleSubmit} />
                    </View>
                  )}
                </>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
};

export default ConfirmPassword;

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
    marginTop: 100,
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
});
