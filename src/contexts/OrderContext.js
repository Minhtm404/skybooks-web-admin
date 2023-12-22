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
      return {
        ...state,
        isLoading: false,
        orders: action.payload.orders,
        totalOrders: action.payload.totalOrders,
      };
    default:
      return state;
  }
};

const setIsLoading = dispatch => async isLoading => {
  dispatch({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const getAllOrders =
  dispatch =>
  async ({ keyword = '', page = 1, limit = 100 }) => {
    try {
      const { data } = await apiHelper.get(
        `/orders?keyword=${keyword}&page=${page}&limit=${limit}`,
      );

      dispatch({
        type: ACTIONS.SET_ORDERS,
        payload: {
          orders: data.data,
          totalOrders: data.results,
        },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const updateOrder =
  dispatch =>
  async ({ orderId, paymentStatus, orderStatus }) => {
    try {
      await apiHelper.patch(`/orders/${orderId}`, { paymentStatus, orderStatus });
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
    updateOrder,
  },
  {
    isLoading: false,
    error: undefined,
    orders: undefined,
    totalOrders: undefined,
  },
);
