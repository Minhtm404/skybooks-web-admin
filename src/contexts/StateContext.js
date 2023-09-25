import contextFactory from './ContextFactory';
import { ACTIONS } from '../constants';

const stateReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_COLOR:
      return { ...state, currentColor: action.payload.color };
    case ACTIONS.SET_MODE:
      return { ...state, currentMode: action.payload.mode };
    case ACTIONS.SET_ACTIVE_MENU:
      return { ...state, activeMenu: action.payload.activeMenu };
    case ACTIONS.SET_SCREEN_SIZE:
      return { ...state, screenSize: action.payload.screenSize };
    case ACTIONS.SET_THEME_SETTINGS:
      return { ...state, themeSettings: action.payload.themeSettings };
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload.isLoading };
    default:
      return state;
  }
};

const setMode = dispatch => async mode => {
  dispatch({ type: ACTIONS.SET_MODE, payload: { mode } });
};

const setColor = dispatch => async color => {
  dispatch({ type: ACTIONS.SET_COLOR, payload: { color } });
};

const setActiveMenu = dispatch => async activeMenu => {
  dispatch({ type: ACTIONS.SET_ACTIVE_MENU, payload: { activeMenu } });
};

const setScreenSize = dispatch => async screenSize => {
  dispatch({ type: ACTIONS.SET_SCREEN_SIZE, payload: { screenSize } });
};

const setThemeSettings = dispatch => async themeSettings => {
  dispatch({ type: ACTIONS.SET_THEME_SETTINGS, payload: { themeSettings } });
};

const setIsLoading = dispatch => async isLoading => {
  dispatch({ type: ACTIONS.SET_IS_LOADING, payload: { isLoading } });
};

export const { Provider, Context } = contextFactory(
  stateReducer,
  {
    setMode,
    setColor,
    setActiveMenu,
    setScreenSize,
    setThemeSettings,
    setIsLoading,
  },
  {
    currentColor: '#1a97f5',
    currentMode: 'light',
    activeMenu: true,
    screenSize: undefined,
    themeSettings: false,
    isLoading: false,
  },
);
