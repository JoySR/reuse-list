import axios from 'axios';
import types from '../mutation-types';
import { LIST_BASE_URL } from '../../config/config';
import tokenConfig from '../../utils/token';

const initialState = {
  lists: [],
};

const actions = {
  fetchLists: ({ commit }) => {
    axios.get(
      `${LIST_BASE_URL}/all.php`,
    ).then((response) => {
      const data = response.data;
      if (data.status) {
        commit(types.SET_LISTS, { lists: data.lists });
      }
      // FIXME: add error handling
      // FIXME: temp disable lint
      // eslint-disable-next-line
    }).catch((error) => {
      // TODO: show error message, use a message component.
    });
  },
  // eslint-disable-next-line
  createList: ({ commit }, { name }) => new Promise((resolve, reject) => {
    const token = tokenConfig.get('token');
    axios({
      url: `${LIST_BASE_URL}/add.php`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
      },
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }),
  // eslint-disable-next-line
  editList: ({ commit }, { id, name }) => new Promise((resolve, reject) => {
    const token = tokenConfig.get('token');
    axios({
      url: `${LIST_BASE_URL}/edit.php`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id,
        name,
      },
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }),
  // eslint-disable-next-line
  removeList: ({ commit }, { id }) => new Promise((resolve, reject) => {
    const token = tokenConfig.get('token');
    axios({
      url: `${LIST_BASE_URL}/delete.php`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        id,
      },
    }).then((response) => {
      resolve(response);
    }).catch((error) => {
      reject(error);
    });
  }),
  // eslint-disable-next-line
  fetchCurrentList: ({ commit }, { id }) => new Promise((resolve, reject) => {
    axios.get(
      `${LIST_BASE_URL}/single.php?list_id=${id}`,
    ).then((response) => {
      const data = response.data;
      if (data.status) {
        resolve(data.list);
      }
      // FIXME: add error handling
      // FIXME: temp disable lint
      // eslint-disable-next-line
    }).catch((error) => {
      // TODO: show error message, use a message component.
      reject();
    });
  }),
  setCurrentList: ({ commit }, { list }) => {
    commit(types.SET_CURRENT_LIST, { list });
  },
  removeCurrentList: ({ commit }) => {
    commit(types.REMOVE_CURRENT_LIST);
  },
};

const mutations = {
  [types.SET_LISTS](state, { lists }) {
    state.lists = lists;
  },
  [types.SET_CURRENT_LIST](state, { list }) {
    state.currentList = list;
  },
  [types.REMOVE_CURRENT_LIST](state) {
    if (state.currentList) {
      state.currentList = null;
    }
  },
};

const getters = {
  allLists: state => state.lists,
  allListNames: state => state.lists.map(list => list.name),
  currentList: state => state.currentList,
};

export default {
  state: initialState,
  actions,
  mutations,
  getters,
};
