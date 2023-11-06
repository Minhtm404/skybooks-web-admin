import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const StatsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_STATS:
      return { ...state, stats: action.payload };
    default:
      return state;
  }
};

const getStats = dispacth => async () => {
  const data = await apiHelper.get('/stats');

  dispacth({ type: ACTIONS.SET_STATS, payload: data.data.data });
};

export const { Provider, Context } = contextFactory(
  StatsReducer,
  {
    getStats,
  },
  {
    stats: {},
  },
);
