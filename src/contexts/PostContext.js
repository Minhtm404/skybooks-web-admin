import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const postReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case ACTIONS.SET_POSTS:
      return {
        ...state,
        isLoading: false,
        posts: action.payload.posts,
        totalPosts: action.payload.totalPosts,
      };
    default:
      return state;
  }
};

const setIsLoading = dispatch => async isLoading => {
  dispatch({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const getAllPosts =
  dispatch =>
  async ({ keyword = '', page = 1, limit = 100 }) => {
    try {
      const { data } = await apiHelper.get(`/posts?keyword=${keyword}&page=${page}&limit=${limit}`);

      dispatch({
        type: ACTIONS.SET_POSTS,
        payload: {
          posts: data.data,
          totalPosts: data.results,
        },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const addPost =
  dispatch =>
  async ({ title, content }) => {
    try {
      await apiHelper.post('/posts', {
        title,
        content,
      });

      const { data } = await apiHelper.get('/posts');

      dispatch({
        type: ACTIONS.SET_POSTS,
        payload: {
          posts: data.data,
          totalPosts: data.results,
        },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const updatePost =
  dispatch =>
  async ({ _id: id, title, content }) => {
    try {
      await apiHelper.patch(`/posts/${id}`, {
        title,
        content,
      });

      const { data } = await apiHelper.get('/posts');

      dispatch({
        type: ACTIONS.SET_POSTS,
        payload: {
          posts: data.data,
          totalPosts: data.results,
        },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const deletePost =
  dispatch =>
  async ({ _id: id }) => {
    try {
      await apiHelper.delete(`/posts/${id}`);

      const { data } = await apiHelper.get('/posts');

      dispatch({
        type: ACTIONS.SET_POSTS,
        payload: {
          posts: data.data,
          totalPosts: data.results,
        },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

export const { Provider, Context } = contextFactory(
  postReducer,
  {
    setIsLoading,
    getAllPosts,
    addPost,
    updatePost,
    deletePost,
  },
  {
    isLoading: false,
    error: undefined,
    posts: undefined,
    totalPosts: undefined,
  },
);
