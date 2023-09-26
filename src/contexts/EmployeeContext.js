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
  const data = await apiHelper.get('/users');

  dispacth({ type: ACTIONS.SET_EMPLOYEES, payload: data.data.data });
};

export const { Provider, Context } = contextFactory(
  employeeReducer,
  {
    getAllEmployees,
  },
  {
    employees: [],
  },
);
