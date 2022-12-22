import {BASE_URL} from '../utils/constants';
import {BearerToken} from '../utils/BearerToken';
import axios from 'axios';
import {errorHandler} from '../utils/errorHandler';
import {getData} from '../utils/BearerToken';

export const registerUser = async data => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/register`, data);
    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(error, 'register');
    return errorMessage;
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
  const tokendata = await getData();
  if (tokendata.accessToken !== null) {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/place/find-nearby-location?longitude=${longitude}&latitude=${latitude}&page=1`,
      );
      return response;
    } catch (error) {
      const {message: errorMessage} = errorHandler(error, 'login');
      return errorMessage;
    }
  }
};

export const getPlacesByType = async (latitude, longitude, type) => {
  const tokendata = await getData();
  if (tokendata.accessToken !== null) {
    try {
      if (type === 'toppick') {
        let response = await axios.get(
          `${BASE_URL}/api/place/top-picks?longitude=${longitude}&latitude=${latitude}&page=1`,
        );
        return response;
      } else if (type === 'popular') {
        let response = await axios.get(
          `${BASE_URL}/api/place/popular?longitude=${longitude}&latitude=${latitude}&page=1`,
        );
        return response;
      } else if (type === 'lunch') {
        let response = await axios.get(
          `${BASE_URL}/api/place/lunch?longitude=${longitude}&latitude=${latitude}&page=1`,
        );
        return response;
      } else {
        let response = await axios.get(
          `${BASE_URL}/api/place/cafe?longitude=${longitude}&latitude=${latitude}&page=1`,
        );
        return response;
      }
    } catch (error) {
      const {message: errorMessage} = errorHandler(
        error,
        `getting ${type} info`,
      );
      return errorMessage;
    }
  }
};

export const getPlacesById = async placeId => {
  const tokendata = await getData();
  if (tokendata.accessToken !== null) {
    try {
      var response = await axios.get(
        `${BASE_URL}/api/place/get-place-details?placeId=${placeId}`,
      );

      return response;
    } catch (error) {
      const {message: errorMessage} = errorHandler(
        error,
        'getting restaurant details',
      );
      return errorMessage;
    }
  }
};

export const getImagesById = async placeId => {
  const tokendata = await getData();
  if (tokendata.accessToken !== null) {
    try {
      var response = await axios.get(
        `${BASE_URL}/api/place/get-images?placeId=${placeId}`,
      );

      return response;
    } catch (error) {
      const {message: errorMessage} = errorHandler(
        error,
        'getting images details',
      );
      return errorMessage;
    }
  }
};

export const getReviewsById = async placeId => {
  const tokendata = await getData();
  if (tokendata.accessToken !== null) {
    try {
      var response = await axios.get(
        `${BASE_URL}/api/place/reviews?placeId=${placeId}`,
      );

      return response;
    } catch (error) {
      const {message: errorMessage} = errorHandler(
        error,
        'getting review details',
      );
      return errorMessage;
    }
  }
};

export const addRating = async data => {
  const tokendata = await getData();
  if (tokendata.accessToken !== null) {
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
  }
};

export const getParticularImageDetailsById = async imageId => {
  const tokendata = await getData();
  if (tokendata.accessToken !== null) {
    try {
      var response = await axios.get(
        `${BASE_URL}/api/place/get-image-details?imageId=${imageId}`,
      );

      return response;
    } catch (error) {
      const {message: errorMessage} = errorHandler(
        error,
        'getting review details',
      );
      return errorMessage;
    }
  }
};

export const addFeedback = async data => {
  const tokendata = await getData();
  if (tokendata.accessToken !== null) {
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
  }
};

export const getAbout = async () => {
  const tokendata = await getData();
  if (tokendata.accessToken !== null) {
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
  }
};

export const getOTP = async email => {
  try {
    var response = await axios.get(
      `${BASE_URL}/api/otp?email=${email}`,
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
};

export const verifyOTP = async data => {
  try {
    const response = await axios.post(
      `https://four-square-lake.vercel.app/api/otp`,
      data,
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
};

export const resetPassword = async (obj, token) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/otp/reset-password`,
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
