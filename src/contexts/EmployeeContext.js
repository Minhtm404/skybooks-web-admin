import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const employeeReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_EMPLOYEES:
      return { ...state, isLoading: false, employees: action.payload };
    default:
      return state;
  }
};

const setIsLoading = dispacth => async isLoading => {
  dispacth({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const getAllEmployees = dispacth => async keyword => {
  const data = keyword
    ? await apiHelper.get(`/admins?keyword=${keyword}`)
    : await apiHelper.get('/admins');

  dispacth({ type: ACTIONS.SET_EMPLOYEES, payload: data.data.data });
};

const addEmployee =
  dispacth =>
  async ({ name, email, password, passwordConfirm, role, active }) => {
    const data = await apiHelper.post('/admins', {
      name,
      email,
      password,
      passwordConfirm,
      role,
      active,
    });

    const newData = await apiHelper.get('/admins');

    dispacth({ type: ACTIONS.SET_EMPLOYEES, payload: newData.data.data });
  };

const updateEmployee =
  dispacth =>
  async ({ _id: id, name, email, role, active }) => {
    const data = await apiHelper.patch(`/admins/${id}`, {
      name,
      email,
      role,
      active,
    });

    const newData = await apiHelper.get('/admins');

    dispacth({ type: ACTIONS.SET_EMPLOYEES, payload: newData.data.data });
  };

const deleteEmployee =
  dispacth =>
  async ({ _id: id }) => {
    const data = await apiHelper.delete(`/admins/${id}`);

    const newData = await apiHelper.get('/admins');

    dispacth({ type: ACTIONS.SET_EMPLOYEES, payload: newData.data.data });
  };

export const { Provider, Context } = contextFactory(
  employeeReducer,
  {
    setIsLoading,
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  },
  {
    isLoading: false,
    employees: undefined,
  },
);
