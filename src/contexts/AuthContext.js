import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const authReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOGIN:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case ACTIONS.SET_LOGIN_LOCAL:
      return {
        ...state,
        token: action.payload.token,
        isAuthenticated: true,
      };
    case ACTIONS.SET_LOGOUT:
      return {
        ...state,
        token: undefined,
        user: undefined,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

const login =
  dispatch =>
  async ({ email, password }) => {
    const { data } = await apiHelper.post('/admins/login', {
      email,
      password,
    });

    localStorage.setItem('token', data.token);

    dispatch({
      type: ACTIONS.SET_LOGIN,
      payload: { token: data.token, user: data.data.user },
    });
  };

const localLogin = dispatch => async () => {
  const token = localStorage.getItem('token');

  if (token) {
    dispatch({ type: ACTIONS.SET_LOGIN_LOCAL, payload: { token } });
  }
};

const logout = dispatch => async () => {
  localStorage.removeItem('token');

  dispatch({ type: ACTIONS.SET_LOGIN_LOCAL });
};

export const { Provider, Context } = contextFactory(
  authReducer,
  {
    login,
    localLogin,
    logout,
  },
  {
    token: undefined,
    user: undefined,
    isAuthenticated: false,
  },
);
