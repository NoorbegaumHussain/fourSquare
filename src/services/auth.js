import {BASE_URL} from '../utils/constants';
import axios from 'axios';
import {errorHandler} from '../utils/errorHandler';
export const registerUser = async data => {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/register`, data);
    return response;
  } catch (error) {
    const {message: errorMessage} = errorHandler(error);
    return errorMessage;
  }
};
