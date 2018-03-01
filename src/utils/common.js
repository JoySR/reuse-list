import store from '../store';

export const getLists = () => {
  store.dispatch('fetchLists');
};
