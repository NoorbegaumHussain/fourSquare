import {BASE_URL} from '../utils/constants';
import {BearerToken} from '../utils/BearerToken';
import axios from 'axios';
import {errorHandler} from '../utils/errorHandler';
import {getData} from '../utils/BearerToken';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async data => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/register`, data);
    const headers = response.headers;
    let stringifiedToken = JSON.stringify({
      accessToken: headers.authorization,
      refreshToken: headers['refresh-token'],
    });
    try {
      await AsyncStorage.setItem('token', stringifiedToken);
      const temp = await AsyncStorage.getItem('token');
      console.log('........', temp);
    } catch (e) {
      console.log('error in storing data in async');
    }
    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(error, 'register');
    return errorMessage;
  }
};
export const loginUser = async data => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/login`, data);

    // try {
    //   await AsyncStorage.clear();
    //   await AsyncStorage.setItem('token', stringifiedToken);
    //   const temp = await AsyncStorage.getItem('token');
    //   console.log('........', temp);
    // } catch (e) {
    //   console.log('error in storing data in async');
    // }
    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(error, 'login');
    return errorMessage;
  }
};

export const restaurantsNearYou = async (latitude, longitude) => {
  // const tokendata = await getData();
  // if (tokendata.accessToken !== null) {
  try {
    const response = await axios.post(
      `${BASE_URL}api/place/find-nearby-location?longitude=${longitude}&latitude=${latitude}`,
    );
    // console.log('responseeeee', response.data);
    return response;
  } catch (error) {
    // const {message: errorMessage} = errorHandler(error, 'login');
    return error.response.data;
  }
  // }
};

export const getPlacesByType = async (latitude, longitude, type) => {
  // const tokendata = await getData();
  // if (tokendata.accessToken !== null) {
  try {
    if (type === 'toppick') {
      let response = await axios.get(
        `${BASE_URL}api/place/top-picks?longitude=${longitude}&latitude=${latitude}&page=1`,
      );
      return response;
    } else if (type === 'popular') {
      let response = await axios.get(
        `${BASE_URL}api/place/popular?longitude=${longitude}&latitude=${latitude}&page=1`,
      );
      return response;
    } else if (type === 'lunch') {
      let response = await axios.get(
        `${BASE_URL}api/place/lunch?longitude=${longitude}&latitude=${latitude}&page=1`,
      );
      return response;
    } else {
      let response = await axios.get(
        `${BASE_URL}api/place/cafe?longitude=${longitude}&latitude=${latitude}&page=1`,
      );
      return response;
    }
  } catch (error) {
    const {message: errorMessage} = errorHandler(error, `getting ${type} info`);
    return errorMessage;
  }
  // }
};

export const getPlacesById = async placeId => {
  // const tokendata = await getData();
  // if (tokendata.accessToken !== null) {
  try {
    var response = await axios.get(
      `${BASE_URL}api/place/get-place-details?placeId=${placeId}`,
    );

    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(
      error,
      'getting restaurant details',
    );
    return errorMessage;
  }
  // }
};

export const getImagesById = async placeId => {
  // const tokendata = await getData();
  // if (tokendata.accessToken !== null) {
  try {
    var response = await axios.get(
      `${BASE_URL}api/place/get-images?placeId=${placeId}`,
    );

    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(
      error,
      'getting images details',
    );
    return errorMessage;
  }
  // }
};

export const getReviewsById = async placeId => {
  // const tokendata = await getData();
  // if (tokendata.accessToken !== null) {
  try {
    var response = await axios.get(
      `${BASE_URL}api/place/reviews?placeId=${placeId}`,
    );

    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(
      error,
      'getting review details',
    );
    return errorMessage;
  }
  // }
};

export const addRating = async data => {
  // const tokendata = await getData();
  // if (tokendata.accessToken !== null) {
  // AsyncStorage.getItem(LOGIN_TOKEN);
  try {
    const response = await axios.post(
      `https://four-square-lake.vercel.app/api/place/rating?placeId=${data.placeId}&star=${data.rating}`,
      {},
      {
        headers: {
          Authorization: BearerToken,
        },
      },
    );
    console.info('Response', response.data);
    return response;
  } catch (error) {
    console.log('inside Try', error.response);

    const {message: errorMessage} = errorHandler(error, 'login');
    return errorMessage;
  }
  // }
};

export const getParticularImageDetailsById = async imageId => {
  // const tokendata = await getData();
  // if (tokendata.accessToken !== null) {
  try {
    var response = await axios.get(
      `${BASE_URL}api/place/get-image-details?imageId=${imageId}`,
    );

    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(
      error,
      'getting review details',
    );
    return errorMessage;
  }
  // }
};

export const addFeedback = async data => {
  // const tokendata = await getData();
  // if (tokendata.accessToken !== null) {
  try {
    const response = await axios.post(
      `https://four-square-lake.vercel.app/api/application/add-feedback?feedback=${data}`,
      {},
      {
        headers: {
          Authorization: BearerToken,
        },
      },
    );
    console.info('Response', response.data);
    return response;
  } catch (error) {
    console.log('inside Try', error.response);

    const {message: errorMessage} = errorHandler(error, 'login');
    return errorMessage;
  }
  // }
};

export const getAbout = async () => {
  // const tokendata = await getData();
  // if (tokendata.accessToken !== null) {
  try {
    var response = await axios.get(`${BASE_URL}/api/application/aboutus`);

    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(
      error,
      'getting review details',
    );
    return errorMessage;
  }
  // }
};

export const getOTP = async email => {
  // const tokendata = await getData();
  // if (tokendata.accessToken !== null) {
  try {
    var response = await axios.get(
      `${BASE_URL}api/otp?email=${email}`,
      {},
      {
        headers: {
          Authorization: BearerToken,
        },
      },
    );

    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(
      error,
      'getting review details',
    );
    return errorMessage;
  }
  // }
};

export const verifyOTP = async data => {
  // const tokendata = await getData();
  // if (tokendata.accessToken !== null) {
  try {
    const response = await axios.post(`${BASE_URL}/api/otp`, data, {
      headers: {
        Authorization: BearerToken,
      },
    });
    console.info('Response', response.data);
    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(error, 'login');
    return errorMessage;
  }
  // }
};

export const resetPassword = async (obj, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}api/otp/reset-password`,
      obj,
      {
        headers: {
          'OTP-VERIFICATION-TOKEN': token,
        },
      },
    );
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getFavourites = async (lat, long, text) => {
  // const tokendata = await getData();
  // if (tokendata.accessToken !== null) {
  try {
    var response = await axios.get(
      `${BASE_URL}api/place/favourites?longitude=${long}&latitude=${lat}&text=${text}`,
      {
        headers: {
          Authorization: BearerToken,
        },
      },
    );

    return response;
  } catch (error) {
    // const {message: errorMessage} = errorHandler(
    //   error,
    //   'getting review details',
    // );
    return error.response;
  }
  // }
};

export const addOrRemoveFromFav = async placeId => {
  // const tokendata = await getData();
  // if (tokendata.accessToken !== null) {
  console.log(placeId);
  try {
    const response = await axios.post(
      `${BASE_URL}api/place/favourites?placeId=${placeId}`,
      {},
      {
        headers: {
          Authorization: BearerToken,
        },
      },
    );
    console.info('Response', response.data);
    return response;
  } catch (error) {
    // const {message: errorMessage} = errorHandler(error, 'login');
    return error.response;
  }
};

export const getParticularPlaceDetailsById = async placeId => {
  try {
    var response = await axios.get(
      `${BASE_URL}api/place/get-place-details?placeId=${placeId}`,
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

export const searchRestaurants = async text => {
  try {
    var response = await axios.get(`${BASE_URL}api/place/search?text=${text}`);

    return response;
  } catch (error) {
    return error.response;
  }
};

export const searchNearByCity = async (latitude, longitude) => {
  try {
    var response = await axios.get(
      `${BASE_URL}api/place/nearby-city?longitude=${longitude}&latitude=${latitude}`,
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

export const searchByFilter = async obj => {
  try {
    const response = await axios.post(
      `${BASE_URL}api/place/filter`,
      obj,
      // {
      //   headers: {
      //     'OTP-VERIFICATION-TOKEN': token,
      //   },
      // },
    );
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const searchNearMe = async (latitude, longitude, text) => {
  try {
    const response = await axios.get(
      `${BASE_URL}api/place/search-near-me?longitude=${longitude}&latitude=${latitude}&text=${text}`,
      {},
      // {
      //   headers: {
      //     'OTP-VERIFICATION-TOKEN': token,
      //   },
      // },
    );
    return response;
  } catch (error) {
    return error.response.data.message;
  }
};

export const getParticularUserDetails = async () => {
  try {
    var response = await axios.get(`${BASE_URL}api/user`, {
      headers: {
        Authorization: BearerToken,
      },
    });

    return response;
  } catch (error) {
    return error.response;
  }
  // }
};

// export const uploadImages = async formData => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/api/place/upload-multiple-images`,
//       formData,
//       {
//         headers: {
//           Authorization: BearerToken,
//         },
//       },
//     );
//     console.info('Response', response.data);
//     return response;
//   } catch (error) {
//     const {message: errorMessage} = errorHandler(error, 'login');
//     return errorMessage;
//   }
//   // }
// };

export const addReview = async formData => {
  try {
    let res = await fetch(`${BASE_URL}api/place/reviews`, {
      method: 'post',
      body: formData,
      headers: {
        Authorization: BearerToken,
      },
    });
    const jsonResponse = await res.json();
    return jsonResponse;
  } catch (error) {
    return error;
  }
};

export const uploadSingleImage = async formData => {
  try {
    let res = await fetch(`${BASE_URL}api/place/upload-images`, {
      method: 'post',
      body: formData,
      headers: {
        Authorization: BearerToken,
      },
    });
    const jsonResponse = await res.json();
    return jsonResponse;
  } catch (error) {
    return error;
  }
};

export const getTopPicks = async (latitude, longitude) => {
  try {
    var response = await axios.get(
      `${BASE_URL}api/place/top-picks?longitude=${longitude}&latitude=${latitude}`,
      // {
      //   headers: {
      //     Authorization: BearerToken,
      //   },
      // },
    );

    return response;
  } catch (error) {
    return error.response;
  }
  // }
};

export const getPopular = async (latitude, longitude) => {
  try {
    var response = await axios.get(
      `${BASE_URL}api/place/popular?longitude=${longitude}&latitude=${latitude}`,
      // {
      //   headers: {
      //     Authorization: BearerToken,
      //   },
      // },
    );

    return response;
  } catch (error) {
    return error.response;
  }
  // }
};
