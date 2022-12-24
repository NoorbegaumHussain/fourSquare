import {createSlice} from '@reduxjs/toolkit';
export const FourSquareSlice = createSlice({
  name: 'foursquaredata',
  initialState: {
    favourite: [],
    userId: null,
    locationData: null,
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
    addUserId: (state, action) => {
      state.userId = action.payload;
    },
    deleteUserId: (state, action) => {
      state.userId = null;
    },
    storeLocation: (state, action) => {
      state.locationData = action.payload;
    },
    deleteLocation: (state, action) => {
      state.locationData = null;
    },
  },
});
export const {
  addToFavourite,
  deleteFromFavourites,
  addUserId,
  deleteUserId,
  storeLocation,
  deleteLocation,
} = FourSquareSlice.actions;

export default FourSquareSlice.reducer;
