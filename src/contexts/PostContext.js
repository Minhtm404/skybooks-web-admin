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
        error: undefined,
        posts: action.payload.posts,
        totalPosts: action.payload.totalPosts,
      };
    default:
      return state;
  }
};

const parseFormData = ({ title, content, imageCover }) => {
  const formData = new FormData();

  if (title) {
    formData.append('title', title);
  }
  if (content) {
    formData.append('content', content);
  }
  if (imageCover) {
    formData.append('imageCover', imageCover);
  }

  return formData;
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
  async ({ title, content, imageCover }) => {
    try {
      await apiHelper.post('/posts', parseFormData({ title, content, imageCover }));

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
  async ({ _id: id, title, content, imageCover }) => {
    try {
      await apiHelper.patch(
        `/posts/${id}`,
        parseFormData({
          title,
          content,
          imageCover,
        }),
      );
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
