import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const OrderReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case ACTIONS.SET_ORDERS:
      return { ...state, isLoading: false, orders: action.payload };
    default:
      return state;
  }
};

const setIsLoading = dispatch => async isLoading => {
  dispatch({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const getAllOrders = dispatch => async keyword => {
  try {
    const { data } = keyword
      ? await apiHelper.get(`/orders?keyword=${keyword}`)
      : await apiHelper.get('/orders');

    dispatch({ type: ACTIONS.SET_ORDERS, payload: data.data });
  } catch (err) {
    dispatch({
      type: ACTIONS.SET_ERROR,
      payload: err.response ? err.response.data.message : err.message,
    });
  }
};

export const { Provider, Context } = contextFactory(
  OrderReducer,
  {
    setIsLoading,
    getAllOrders,
  },
  {
    isLoading: false,
    error: undefined,
    orders: undefined,
  },
);
