import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const CustomerReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case ACTIONS.SET_CUSTOMERS:
      return { ...state, isLoading: false, customers: action.payload };
    default:
      return state;
  }
};

const setIsLoading = dispatch => async isLoading => {
  dispatch({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const getAllCustomers = dispatch => async keyword => {
  try {
    const { data } = keyword
      ? await apiHelper.get(`/users?keyword=${keyword}`)
      : await apiHelper.get('/users');

    dispatch({ type: ACTIONS.SET_CUSTOMERS, payload: data.data });
  } catch (err) {
    dispatch({
      type: ACTIONS.SET_ERROR,
      payload: err.response ? err.response.data.message : err.message,
    });
  }
};

const updateCustomer =
  dispatch =>
  async ({ _id: id, name, email, role, active }) => {
    try {
      await apiHelper.patch(`/users/${id}`, {
        name,
        email,
        role,
        active,
      });

      const { data } = await apiHelper.get('/users');

      dispatch({ type: ACTIONS.SET_CUSTOMERS, payload: data.data });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const deleteCustomer =
  dispatch =>
  async ({ _id: id }) => {
    try {
      await apiHelper.delete(`/users/${id}`);

      const { data } = await apiHelper.get('/users');

      dispatch({ type: ACTIONS.SET_CUSTOMERS, payload: data.data });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

export const { Provider, Context } = contextFactory(
  CustomerReducer,
  {
    setIsLoading,
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
  },
  {
    isLoading: false,
    error: undefined,
    customers: undefined,
  },
);
