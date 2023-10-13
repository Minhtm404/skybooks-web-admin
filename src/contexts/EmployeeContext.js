import contextFactory from './ContextFactory';
import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const employeeReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_EMPLOYEES:
      return { ...state, employees: action.payload };
    default:
      return state;
  }
};

const getAllEmployees = dispacth => async () => {
  const data = await apiHelper.get('/admins');

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
    getAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  },
  {
    employees: [],
  },
);
