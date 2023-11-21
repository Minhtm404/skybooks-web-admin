import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const productReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case ACTIONS.SET_PRODUCTS:
      return { ...state, isLoading: false, products: action.payload };
    default:
      return state;
  }
};

const setIsLoading = dispatch => async isLoading => {
  dispatch({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const getAllProducts = dispatch => async keyword => {
  try {
    const { data } = keyword
      ? await apiHelper.get(`/products?keyword=${keyword}`)
      : await apiHelper.get('/products');

    dispatch({ type: ACTIONS.SET_PRODUCTS, payload: data.data });
  } catch (err) {
    dispatch({
      type: ACTIONS.SET_ERROR,
      payload: err.response ? err.response.data.message : err.message,
    });
  }
};

const addProduct =
  dispatch =>
  async ({
    name,
    mainCollection,
    subCollection,
    price,
    discount,
    sku,
    vendor,
    author,
    format,
    dimensions,
    publishDate,
    quantity,
    description,
  }) => {
    try {
      await apiHelper.post('/products', {
        name,
        mainCollection,
        subCollection,
        price,
        discount,
        sku,
        vendor,
        author,
        format,
        dimensions,
        publishDate,
        quantity,
        description,
      });

      const { data } = await apiHelper.get('/products');

      dispatch({ type: ACTIONS.SET_PRODUCTS, payload: data.data });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const updateProduct =
  dispatch =>
  async ({
    _id: id,
    name,
    mainCollection,
    subCollection,
    price,
    discount,
    sku,
    vendor,
    author,
    format,
    dimensions,
    publishDate,
    quantity,
    description,
  }) => {
    try {
      await apiHelper.patch(`/products/${id}`, {
        name,
        mainCollection,
        subCollection,
        price,
        discount,
        sku,
        vendor,
        author,
        format,
        dimensions,
        publishDate,
        quantity,
        description,
      });

      const { data } = await apiHelper.get('/products');

      dispatch({ type: ACTIONS.SET_PRODUCTS, payload: data.data });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const deleteProduct =
  dispatch =>
  async ({ _id: id }) => {
    try {
      await apiHelper.delete(`/products/${id}`);

      const { data } = await apiHelper.get('/products');

      dispatch({ type: ACTIONS.SET_PRODUCTS, payload: data.data });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

export const { Provider, Context } = contextFactory(
  productReducer,
  {
    setIsLoading,
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  },
  {
    isLoading: false,
    error: undefined,
    products: undefined,
  },
);
