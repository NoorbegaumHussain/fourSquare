import {createSlice} from '@reduxjs/toolkit';
export const FourSquareSlice = createSlice({
  name: 'foursquaredata',
  initialState: {
    value: [1, 2],
  },
  reducers: {
    addUser: (state, action) => {
      console.log('Inside add user');
    },
  },
});
export const {addUser} = FourSquareSlice.actions;

export default FourSquareSlice.reducer;
