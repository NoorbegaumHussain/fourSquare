export const convertPriceRange = number => {
  if (number < 10) {
    return '₹';
  } else if (number < 100) {
    return '₹₹';
  } else if (number < 1000) {
    return '₹₹₹';
  } else {
    return '₹₹₹₹';
  }
};
