// export const BearerToken =
//   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2M2ExYTc3MTcxZWE2NzIzZGYwYzA4NDAiLCJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJpYXQiOjE2NzE3MDk1NzUsImV4cCI6MTY3MTcxMzE3NX0.PdpdxV36_tzMzpu0tMVFPY8nxckytce-wAU1dlffWLo';

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    return value != null ? JSON.parse(value) : null;
    // console.log(value);
  } catch (e) {
    console.log(e);
  }
};
