import { contextFactory } from './contextFactory';
import { ACTIONS } from '../constants';

const stateReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_COLOR:
      return { currentColor: action.payload, ...state };
    case ACTIONS.SET_MODE:
      return { currentMode: action.payload, ...state };
    default:
      return state;
  }
};

const setMode = mode => {
  dispatch({ type: ACTIONS.SET_COLOR, payload: mode });
};

const setColor = color => {
  dispatch({ type: ACTIONS.SET_COLOR, payload: color });
};

export const { Provider, Context } = contextFactory(
  stateReducer,
  {
    setMode,
    setColor
  },
  {
    currentColor: '#03C9D7',
    currentMode: 'Light',
    activeMenu: true,
    screenSize: undefined,
    themeSettings: false
  }
);
