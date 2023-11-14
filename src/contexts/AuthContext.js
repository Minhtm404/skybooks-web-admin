import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ACTIONS.SET_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ACTIONS.SET_LOGIN:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case ACTIONS.SET_LOGOUT:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        token: undefined,
        user: undefined,
        isAuthenticated: false,
      };
    case ACTIONS.UPDATE_DATA:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        user: action.payload,
      };
    case ACTIONS.UPDATE_PASSWORD:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        token: action.payload.token,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

const setIsLoading = dispatch => async isLoading => {
  dispatch({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const login =
  dispatch =>
  async ({ email, password }) => {
    try {
      const { data } = await apiHelper.post('/admins/login', {
        email,
        password,
      });

      localStorage.setItem('token', data.token);

      dispatch({
        type: ACTIONS.SET_LOGIN,
        payload: { token: data.token, user: data.data.user },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const localLogin = dispatch => async () => {
  try {
    const token = localStorage.getItem('token');

    if (token) {
      const { data } = await apiHelper.get('/admins/me');

      dispatch({ type: ACTIONS.SET_LOGIN, payload: { token, user: data.data } });
    }
  } catch (err) {
    localStorage.removeItem('token');

    dispatch({ type: ACTIONS.SET_LOGOUT });
  }
};

const logout = dispatch => async () => {
  localStorage.removeItem('token');

  dispatch({ type: ACTIONS.SET_LOGOUT });
};

const updateMe =
  dispatch =>
  async ({ name, email }) => {
    try {
      const { data } = await apiHelper.patch('/admins/me', {
        name,
        email,
      });

      dispatch({ type: ACTIONS.UPDATE_DATA, payload: data.data.user });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const updatePassword =
  dispatch =>
  async ({ passwordCurrent, password, passwordConfirm }) => {
    try {
      const { data } = await apiHelper.post('/admins/update-password', {
        passwordCurrent,
        password,
        passwordConfirm,
      });

      localStorage.setItem('token', data.token);

      dispatch({
        type: ACTIONS.UPDATE_PASSWORD,
        payload: { token: data.token, user: data.data.user },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

export const { Provider, Context } = contextFactory(
  authReducer,
  {
    setIsLoading,
    login,
    localLogin,
    logout,
    updateMe,
    updatePassword,
  },
  {
    isLoading: false,
    error: undefined,
    token: undefined,
    user: undefined,
    isAuthenticated: false,
  },
);
