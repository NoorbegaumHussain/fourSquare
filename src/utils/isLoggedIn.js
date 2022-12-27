import AsyncStorage from '@react-native-async-storage/async-storage';

export const isLoggedIn = async () => {
  const data = await AsyncStorage.getItem('auth');
  console.log('STORED TOKEN IN ASYNC', data);
  return data;
};
