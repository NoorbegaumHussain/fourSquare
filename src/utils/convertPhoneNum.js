// export const phone = [string.slice(0, 3), " ", string.slice(3)].join('');
export const convertPhoneNum = number => {
  return number.replace(/^\d{3}-\d{8}$/);
};
