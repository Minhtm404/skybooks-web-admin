import contextFactory from './contextFactory';
import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const collectionReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_COLLECTIONS:
      return { ...state };
    default:
      return state;
  }
};

const getAllCollections = dispacth => async () => {
  const data = await apiHelper.get('/collections');

  console.log(data);

  dispacth({ type: ACTIONS.SET_COLLECTIONS, payload: data });
};

export const { Provider, Context } = contextFactory(
  collectionReducer,
  {
    getAllCollections
  },
  {
    collections: null
  }
);
