import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const productReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_IS_LOADING:
      return { ...state, isLoading: action.payload };
    case ACTIONS.SET_ERROR:
      return { ...state, isLoading: false, error: action.payload };
    case ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        isLoading: false,
        error: undefined,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts,
      };
    default:
      return state;
  }
};

const parseFormData = ({
  name,
  mainCollection,
  subCollection,
  price,
  discount,
  sku,
  vendor,
  author,
  format,
  dimensions,
  publishDate,
  quantity,
  description,
  imageCover,
}) => {
  const formData = new FormData();

  if (name) {
    formData.append('name', name);
  }
  if (mainCollection) {
    formData.append('mainCollection', mainCollection);
  }
  if (subCollection) {
    formData.append('subCollection', subCollection);
  }
  if (price) {
    formData.append('price', price);
  }
  if (discount) {
    formData.append('discount', discount);
  }
  if (sku) {
    formData.append('sku', sku);
  }
  if (vendor) {
    formData.append('vendor', vendor);
  }
  if (author) {
    formData.append('author', author);
  }
  if (format) {
    formData.append('format', format);
  }
  if (dimensions) {
    formData.append('dimensions', dimensions);
  }
  if (publishDate) {
    formData.append('publishDate', publishDate);
  }
  if (quantity) {
    formData.append('quantity', quantity);
  }
  if (description) {
    formData.append('description', description);
  }
  if (imageCover) {
    formData.append('imageCover', imageCover);
  }

  return formData;
};

const setIsLoading = dispatch => async isLoading => {
  dispatch({ type: ACTIONS.SET_IS_LOADING, payload: isLoading });
};

const getAllProducts =
  dispatch =>
  async ({ keyword = '', page = 1, limit = 100 }) => {
    try {
      const { data } = await apiHelper.get(
        `/products?keyword=${keyword}&page=${page}&limit=${limit}`,
      );

      dispatch({
        type: ACTIONS.SET_PRODUCTS,
        payload: { products: data.data, totalProducts: data.results },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const addProduct =
  dispatch =>
  async ({
    name,
    mainCollection,
    subCollection,
    price,
    discount,
    sku,
    vendor,
    author,
    format,
    dimensions,
    publishDate,
    quantity,
    description,
    imageCover,
  }) => {
    try {
      await apiHelper.post(
        '/products',
        parseFormData({
          name,
          mainCollection,
          subCollection,
          price,
          discount,
          sku,
          vendor,
          author,
          format,
          dimensions,
          publishDate,
          quantity,
          description,
          imageCover,
        }),
      );

      const { data } = await apiHelper.get('/products');

      dispatch({
        type: ACTIONS.SET_PRODUCTS,
        payload: { products: data.data, totalProducts: data.results },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

const updateProduct =
  dispatch =>
  async ({
    _id: id,
    name,
    mainCollection,
    subCollection,
    price,
    discount,
    sku,
    vendor,
    author,
    format,
    dimensions,
    publishDate,
    quantity,
    description,
    imageCover,
  }) => {
    try {
      await apiHelper.patch(
        `/products/${id}`,
        parseFormData({
          name,
          mainCollection,
          subCollection,
          price,
          discount,
          sku,
          vendor,
          author,
          format,
          dimensions,
          publishDate,
          quantity,
          description,
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

const deleteProduct =
  dispatch =>
  async ({ _id: id }) => {
    try {
      await apiHelper.delete(`/products/${id}`);

      const { data } = await apiHelper.get('/products');

      dispatch({
        type: ACTIONS.SET_PRODUCTS,
        payload: { products: data.data, totalProducts: data.results },
      });
    } catch (err) {
      dispatch({
        type: ACTIONS.SET_ERROR,
        payload: err.response ? err.response.data.message : err.message,
      });
    }
  };

export const { Provider, Context } = contextFactory(
  productReducer,
  {
    setIsLoading,
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  },
  {
    isLoading: false,
    error: undefined,
    products: undefined,
    totalProducts: undefined,
  },
);
