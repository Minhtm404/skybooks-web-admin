import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const collectionReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case ACTIONS.SET_COLLECTIONS:
      return {
        ...state,
        isLoading: false,
        collections: action.payload.collections,
        totalCollections: action.payload.totalCollections,
      };
    default:
      return state;
  }
};

const setIsLoading = dispatch => async isLoading => {
  dispatch({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const getAllCollections =
  dispatch =>
  async ({ keyword = '', page = 1, limit = 100 }) => {
    try {
      const { data } = await apiHelper.get(
        `/collections?keyword=${keyword}&page=${page}&limit=${limit}`,
      );

      dispatch({
        type: ACTIONS.SET_COLLECTIONS,
        payload: { collections: data.data, totalCollections: data.results },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const addCollection =
  dispatch =>
  async ({ name, mainCollection, parentCollection }) => {
    try {
      await apiHelper.post('/collections', {
        name,
        mainCollection,
        parentCollection,
      });

      const { data } = await apiHelper.get('/collections');

      dispatch({
        type: ACTIONS.SET_COLLECTIONS,
        payload: { collections: data.data, totalCollections: data.results },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const updateCollection =
  dispatch =>
  async ({ _id: id, name, mainCollection, parentCollection }) => {
    try {
      await apiHelper.patch(`/collections/${id}`, {
        name,
        mainCollection,
        parentCollection,
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const deleteCollection =
  dispatch =>
  async ({ _id: id }) => {
    try {
      await apiHelper.delete(`/collections/${id}`);

      const { data } = await apiHelper.get('/collections');

      dispatch({
        type: ACTIONS.SET_COLLECTIONS,
        payload: { collections: data.data, totalCollections: data.results },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
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
    error: undefined,
    collections: undefined,
    totalCollections: undefined,
  },
);
