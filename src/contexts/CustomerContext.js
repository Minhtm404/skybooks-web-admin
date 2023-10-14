import contextFactory from './ContextFactory';
import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const CustomerReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_CUSTOMERS:
      return { ...state, customers: action.payload };
    default:
      return state;
  }
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
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
  },
  {
    customers: [],
  },
);
