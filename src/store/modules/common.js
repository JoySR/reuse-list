import types from '../mutation-types';

// initial state
const initialState = {
  shownModalAddList: false,
  shownModalAddItem: false,
};

// actions
const actions = {
  setModalAddList: ({ commit }, { shown }) => {
    commit(types.SET_MODAL_ADD_LIST, { shown });
  },
  setModalAddItem: ({ commit }, { shown }) => {
    commit(types.SET_MODAL_ADD_ITEM, { shown });
  },
};

// mutations
const mutations = {
  [types.SET_MODAL_ADD_LIST](state, { shown }) {
    state.shownModalAddList = shown;
  },
  [types.SET_MODAL_ADD_ITEM](state, { shown }) {
    state.shownModalAddItem = shown;
  },
};

// getter
const getters = {
  shownModalAddList: state => state.shownModalAddList,
  shownModalAddItem: state => state.shownModalAddItem,
};

export default {
  state: initialState,
  actions,
  mutations,
  getters,
};
