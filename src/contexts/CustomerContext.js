import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const CustomerReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_CUSTOMERS:
      return { ...state, isLoading: false, customers: action.payload };
    default:
      return state;
  }
};

const setIsLoading = dispacth => async isLoading => {
  dispacth({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const getAllCustomers = dispacth => async () => {
  const data = await apiHelper.get('/users');

  dispacth({ type: ACTIONS.SET_CUSTOMERS, payload: data.data.data });
};

const updateCustomer =
  dispacth =>
  async ({ _id: id, name, email, role, active }) => {
    const data = await apiHelper.patch(`/users/${id}`, {
      name,
      email,
      role,
      active,
    });

    const newData = await apiHelper.get('/users');

    dispacth({ type: ACTIONS.SET_CUSTOMERS, payload: newData.data.data });
  };

const deleteCustomer =
  dispacth =>
  async ({ _id: id }) => {
    const data = await apiHelper.delete(`/users/${id}`);

    const newData = await apiHelper.get('/users');

    dispacth({ type: ACTIONS.SET_CUSTOMERS, payload: newData.data.data });
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
    customers: undefined,
  },
);
