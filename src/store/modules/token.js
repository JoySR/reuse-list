import axios from 'axios';
import md5 from 'js-md5';
import { USER_BASE_URL } from '../../config/config';
import tokenConfig from '../../utils/token';
import types from '../mutation-types';

// initial state
const initialState = {
  token: null,
};

// actions
const actions = {
  setJwtToken: ({ commit }, { username, password }) => new Promise(
    (resolve, reject) => {
      axios.post(
        `${USER_BASE_URL}/login.php`,
        {
          username,
          password: md5(password),
        },
      ).then((response) => {
        const data = response.data;
        if (data.status) {
          const token = response.data.token;
          tokenConfig.set('token', token, 7);
          commit(types.SET_TOKEN, { token });
          resolve();
        } else {
          reject(data.msg);
        }
      }).catch((error) => {
        reject(error);
      });
    },
  ),
  saveCookieTokenInStore: ({ commit }, { token }) => {
    commit(types.SET_TOKEN, { token });
  },
  // eslint-disable-next-line
  register: ({ commit }, { username, password, email }) => new Promise(
    (resolve, reject) => {
      axios.post(
        `${USER_BASE_URL}/register.php`,
        {
          username,
          password: md5(password),
          email,
        },
      ).then((response) => {
        const data = response.data;
        if (data.status) {
          resolve();
        } else {
          reject(data.msg);
        }
      }).catch((error) => {
        reject(error);
      });
    },
  ),
  clearToken: ({ commit }, { username }) => new Promise(
    (resolve, reject) => {
      axios.post(
        `${USER_BASE_URL}/logout.php`,
        {
          username,
        },
      ).then((response) => {
        if (response.data.status) {
          tokenConfig.clear('token');
          commit(types.SET_TOKEN, { token: '' });
          resolve();
        } else {
          reject(response.data.msg);
        }
      }).catch((error) => {
        reject(error);
      });
    },
  ),
};

// mutations
const mutations = {
  [types.SET_TOKEN](state, { token }) {
    state.token = token;
  },
};

// getter
const getters = {
  getToken: state => state.token,
};

export default {
  state: initialState,
  actions,
  mutations,
  getters,
};
