import moment from 'moment';

export const formatISODate = date => {
  return moment(date).format('MMMM D, YYYY');
};
