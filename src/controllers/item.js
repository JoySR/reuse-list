import store from '../store';

export const getCurrentListItems = (id) => {
  store.dispatch('fetchCurrentListItems', { listId: id });
};

// TODO: is there a better way to use listId without passing it as an argument?
export const handleCheck = (item, listId) => {
  store.dispatch(
    'changeItemStatus',
    {
      id: item.id,
      checked: !(+item.checked),
    },
  ).then(() => {
    getCurrentListItems(listId);
    // FIXME: temp disable lint
    // eslint-disable-next-line
  }).catch((error) => {
    // TODO: show error message, use a message component.
  });
};
