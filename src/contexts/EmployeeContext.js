import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const employeeReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case ACTIONS.SET_EMPLOYEES:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        employees: action.payload.employees,
        totalEmployees: action.payload.totalEmployees,
      };
    default:
      return state;
  }
};

const setIsLoading = dispatch => async isLoading => {
  dispatch({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const getAllEmployees =
  dispatch =>
  async ({ keyword = '', page = 1, limit = 100 }) => {
    try {
      const { data } = await apiHelper.get(
        `/admins?keyword=${keyword}&page=${page}&limit=${limit}`,
      );

      dispatch({
        type: ACTIONS.SET_EMPLOYEES,
        payload: { employees: data.data, totalEmployees: data.results },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const addEmployee =
  dispatch =>
  async ({ name, email, password, passwordConfirm, role, active }) => {
    try {
      await apiHelper.post('/admins', {
        name,
        email,
        password,
        passwordConfirm,
        role,
        active,
      });

      const { data } = await apiHelper.get('/admins');

      dispatch({
        type: ACTIONS.SET_EMPLOYEES,
        payload: { employees: data.data, totalEmployees: data.results },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const updateEmployee =
  dispatch =>
  async ({ _id: id, name, email, role, active }) => {
    try {
      await apiHelper.patch(`/admins/${id}`, {
        name,
        email,
        role,
        active,
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const deleteEmployee =
  dispatch =>
  async ({ _id: id }) => {
    try {
      await apiHelper.delete(`/admins/${id}`);

      const { data } = await apiHelper.get('/admins');

      dispatch({
        type: ACTIONS.SET_EMPLOYEES,
        payload: { employees: data.data, totalEmployees: data.results },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
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
    error: undefined,
    employees: undefined,
    totalEmployees: undefined,
  },
);
