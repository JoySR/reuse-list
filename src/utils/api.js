import axios from 'axios';
import { JWT_TOKEN_URL } from './config';
import tokenConfig from './token';

// eslint-disable-next-line
export const login = (username, password, callback) => {
  axios.post(
    JWT_TOKEN_URL,
    {
      username,
      password,
    },
  ).then((response) => {
    tokenConfig.set('token', response.data.token, 7);
    callback();
  }).catch((error) => {
    callback(error);
  });
};
