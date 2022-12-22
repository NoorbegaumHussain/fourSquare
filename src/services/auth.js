import {BASE_URL} from '../utils/constants';
import {BearerToken} from '../utils/BearerToken';

import axios from 'axios';
import {errorHandler} from '../utils/errorHandler';
export const registerUser = async data => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/register`, data);
    return response;
  } catch (error) {
    // const {message: errorMessage} = errorHandler(error, 'register');
    return error;
  }
};
export const loginUser = async data => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/login`, data);
    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(error, 'login');
    return errorMessage;
  }
};

export const restaurantsNearYou = async (latitude, longitude) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/place/find-nearby-location?longitude=${longitude}&latitude=${latitude}&page=1`,
    );
    // console.info(response.data)

    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(error, 'login');
    return errorMessage;
  }
};

export const getPlacesByType = async (latitude, longitude, type) => {
  try {
    if (type === 'toppick') {
      let response = await axios.get(
        `${BASE_URL}/api/place/top-picks?longitude=${longitude}&latitude=${latitude}&page=1`,

        // {
        //   headers: {
        //     Authorization: BearerToken,
        //   },
        // },
      );
      return response;
    } else if (type === 'popular') {
      let response = await axios.get(
        `${BASE_URL}/api/place/popular?longitude=${longitude}&latitude=${latitude}&page=1`,

        // {
        //   headers: {
        //     Authorization: BearerToken,
        //   },
        // },
      );
      return response;
    } else if (type === 'lunch') {
      let response = await axios.get(
        `${BASE_URL}/api/place/lunch?longitude=${longitude}&latitude=${latitude}&page=1`,

        // {
        //   headers: {
        //     Authorization: BearerToken,
        //   },
        // },
      );
      return response;
    } else {
      let response = await axios.get(
        `${BASE_URL}/api/place/cafe?longitude=${longitude}&latitude=${latitude}&page=1`,

        // {
        //   headers: {
        //     Authorization: BearerToken,
        //   },
        // },
      );
      return response;
    }
  } catch (error) {
    const {message: errorMessage} = errorHandler(error, `getting ${type} info`);
    return errorMessage;
  }
};

export const getPlacesById = async placeId => {
  try {
    var response = await axios.get(
      `${BASE_URL}/api/place/get-place-details?placeId=${placeId}`,

      // {
      //   headers: {
      //     Authorization: BearerToken,
      //   },
      // },
    );

    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(
      error,
      'getting restaurant details',
    );
    return errorMessage;
  }
};

export const getImagesById = async placeId => {
  try {
    var response = await axios.get(
      `${BASE_URL}/api/place/get-images?placeId=${placeId}`,

      // {
      //   headers: {
      //     Authorization: BearerToken,
      //   },
      // },
    );

    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(
      error,
      'getting images details',
    );
    return errorMessage;
  }
};

export const getReviewsById = async placeId => {
  try {
    var response = await axios.get(
      `${BASE_URL}/api/place/reviews?placeId=${placeId}`,

      // {
      //   headers: {
      //     Authorization: BearerToken,
      //   },
      // },
    );

    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(
      error,
      'getting review details',
    );
    return errorMessage;
  }
};
