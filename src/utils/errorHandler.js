export const errorHandler = (error, key) => {
  const {request, response} = error;
  if (response) {
    const {message} = response.data;
    const status = response.status;
    return {
      message,
      status,
    };
  } else if (request) {
    //request sent but no response received
    return {
      message: `server time out while fetching ${key}`,
      status: 503,
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return {
      message: `opps! something went wrong while setting up request in ${key}`,
    };
  }
};
