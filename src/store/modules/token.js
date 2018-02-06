import axios from 'axios';
import { JWT_TOKEN_URL } from '../../utils/config';
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
        JWT_TOKEN_URL,
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
  clearToken: ({ commit }) => {
    commit(types.SET_TOKEN, { token: '' });
  },
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
