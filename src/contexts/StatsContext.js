import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const StatsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case ACTIONS.SET_STATS:
      return { ...state, isLoading: false, error: undefined, stats: action.payload };
    default:
      return state;
  }
};

const setIsLoading = dispatch => async isLoading => {
  dispatch({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const getStats = dispatch => async range => {
  try {
    const { data } = range
      ? await apiHelper.get(`/stats?range=${range}`)
      : await apiHelper.get('/stats');

    dispatch({ type: ACTIONS.SET_STATS, payload: data.data });
  } catch (err) {
    dispatch({
      type: ACTIONS.SET_ERROR,
      payload: err.response ? err.response.data.message : err.message,
    });
  }
};

export const { Provider, Context } = contextFactory(
  StatsReducer,
  {
    setIsLoading,
    getStats,
  },
  {
    isLoading: false,
    error: undefined,
    stats: undefined,
  },
);
