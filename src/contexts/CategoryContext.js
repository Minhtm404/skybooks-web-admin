import contextFactory from './Factory';
import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const collectionReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_COLLECTIONS:
      return { ...state, collections: action.payload };
    default:
      return state;
  }
};

const getAllCollections = dispacth => async () => {
  const data = await apiHelper.get('/collections');

  dispacth({ type: ACTIONS.SET_COLLECTIONS, payload: data.data.data });
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
