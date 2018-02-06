import axios from 'axios';
import tokenConfig from './token';

const token = tokenConfig.get('token');

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export default axios;
