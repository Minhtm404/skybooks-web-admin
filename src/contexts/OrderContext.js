import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const OrderReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ORDERS:
      return { ...state, isLoading: false, orders: action.payload };
    default:
      return state;
  }
};

const setIsLoading = dispacth => async isLoading => {
  dispacth({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const getAllOrders = dispacth => async () => {
  const data = await apiHelper.get('/orders');

  dispacth({ type: ACTIONS.SET_ORDERS, payload: data.data.data });
};

export const { Provider, Context } = contextFactory(
  OrderReducer,
  {
    setIsLoading,
    getAllOrders,
  },
  {
    isLoading: false,
    orders: undefined,
  },
);
