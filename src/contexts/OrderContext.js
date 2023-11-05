import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const OrderReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_ORDERS:
      return { ...state, orders: action.payload };
    default:
      return state;
  }
};

const getAllOrders = dispacth => async () => {
  const data = await apiHelper.get('/orders');

  dispacth({ type: ACTIONS.SET_ORDERS, payload: data.data.data });
};

export const { Provider, Context } = contextFactory(
  OrderReducer,
  {
    getAllOrders,
  },
  {
    orders: [],
  },
);
