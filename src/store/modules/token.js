import axios from 'axios';
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
          password,
        },
      ).then((response) => {
        const token = response.data.token;
        tokenConfig.set('token', token, 7);
        commit(types.SET_TOKEN, { token });
        resolve();
      }).catch((error) => {
        reject(error);
      });
    },
  ),
  saveCookieTokenInStore: ({ commit }, { token }) => {
    commit(types.SET_TOKEN, { token });
  },
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
