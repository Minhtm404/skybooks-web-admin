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
        isAuthenticated: true
      };
    default:
      return state;
  }
};

const login =
  dispatch =>
  async ({ email, password }) => {
    const data = await apiHelper.post('/users/login', {
      email,
      password
    });

    dispatch({
      type: ACTIONS.SET_LOGIN,
      payload: { token: data.data.token, user: data.data.data.user }
    });
  };

export const { Provider, Context } = contextFactory(
  authReducer,
  {
    login
  },
  {
    token: undefined,
    user: undefined,
    isAuthenticated: false
  }
);
