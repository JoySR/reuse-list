import store from '../store';

// eslint-disable-next-line
export const getLists = () => {
  store.dispatch('fetchLists');
};
