import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const StatsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_STATS:
      return { ...state, isLoading: false, stats: action.payload };
    default:
      return state;
  }
};

const setIsLoading = dispacth => async isLoading => {
  dispacth({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const getStats = dispacth => async () => {
  const data = await apiHelper.get('/stats');

  dispacth({ type: ACTIONS.SET_STATS, payload: data.data.data });
};

export const { Provider, Context } = contextFactory(
  StatsReducer,
  { setIsLoading, getStats },
  {
    isLoading: false,
    stats: undefined,
  },
);
