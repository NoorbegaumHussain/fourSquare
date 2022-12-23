import {createSlice} from '@reduxjs/toolkit';
export const FourSquareSlice = createSlice({
  name: 'foursquaredata',
  initialState: {
    favourite: [],
  },
  reducers: {
    addToFavourite: (state, action) => {
      if (state.favourite.includes(action.payload)) {
        console.log('duplicate encountered');
      } else {
        state.favourite.push(action.payload);
      }

      console.log('after adding', state.favourite);
    },
    deleteFromFavourites: (state, action) => {
      if (state.favourite.includes(action.payload)) {
        console.log(action.payload);
        state.favourite = state.favourite.filter(fav => fav !== action.payload);
        console.log('after removing', state.favourite);
      }
    },
  },
});
export const {addUser, addToFavourite, deleteFromFavourites} =
  FourSquareSlice.actions;

export default FourSquareSlice.reducer;
