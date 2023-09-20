import contextFactory from './ContextFactory';
import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const productReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

const getAllProducts = dispacth => async () => {
  const data = await apiHelper.get('/products');
  console.log(data.status);
  dispacth({ type: ACTIONS.SET_PRODUCTS, payload: data.data.data });
};

export const { Provider, Context } = contextFactory(
  productReducer,
  {
    getAllProducts,
  },
  {
    products: undefined,
  },
);
