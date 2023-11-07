import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const collectionReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_COLLECTIONS:
      return { ...state, isLoading: false, collections: action.payload };
    default:
      return state;
  }
};

const setIsLoading = dispacth => async isLoading => {
  dispacth({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const getAllCollections = dispacth => async keyword => {
  const data = keyword
    ? await apiHelper.get(`/collections?keyword=${keyword}`)
    : await apiHelper.get('/collections');

  dispacth({ type: ACTIONS.SET_COLLECTIONS, payload: data.data.data });
};

const addCollection =
  dispacth =>
  async ({ name, mainCollection, parentCollection }) => {
    const data = await apiHelper.post('/collections', {
      name,
      mainCollection,
      parentCollection,
    });

    const newData = await apiHelper.get('/collections');

    dispacth({ type: ACTIONS.SET_COLLECTIONS, payload: newData.data.data });
  };

const updateCollection =
  dispacth =>
  async ({ _id: id, name, mainCollection, parentCollection }) => {
    const data = await apiHelper.patch(`/collections/${id}`, {
      name,
      mainCollection,
      parentCollection,
    });

    const newData = await apiHelper.get('/collections');

    dispacth({ type: ACTIONS.SET_COLLECTIONS, payload: newData.data.data });
  };

const deleteCollection =
  dispacth =>
  async ({ _id: id }) => {
    const data = await apiHelper.delete(`/collections/${id}`);

    const newData = await apiHelper.get('/collections');

    dispacth({ type: ACTIONS.SET_COLLECTIONS, payload: newData.data.data });
  };

export const { Provider, Context } = contextFactory(
  collectionReducer,
  {
    setIsLoading,
    getAllCollections,
    addCollection,
    updateCollection,
    deleteCollection,
  },
  {
    isLoading: false,
    collections: undefined,
  },
);
