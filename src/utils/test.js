// import axios from 'axios';

// export const testLogin = async () => {
//   const response = await axios.post(
//     'https://four-square-lake.vercel.app/api/user/login',
//     {
//       email: 'test@test.com',
//       password: '12345678',
//     },
//   );
//   console.log('Headers from Test Login', response.headers);
// };

// testLogin();

var myHeaders = new Headers();
myHeaders.append('Content-Type', 'text/plain');

var raw = JSON.stringify({
  email: 'test@test.com',
  password: '12345678',
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow',
};

export const testLogin = () => {
  fetch('https://four-square-lake.vercel.app/api/user/login', requestOptions)
    .then(response => response)
    .then(result => console.info(result))
    .catch(error => console.log('error', error));
};
