import contextFactory from './ContextFactory';

import { ACTIONS } from '../constants';
import apiHelper from '../utils/apiHelper';

const productReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PRODUCTS:
      return { ...state, products: action.payload };
    default:
      return state;
  }
};

const getAllProducts = dispacth => async () => {
  const data = await apiHelper.get('/products');

  dispacth({ type: ACTIONS.SET_PRODUCTS, payload: data.data.data });
};

const addProduct =
  dispacth =>
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
  }) => {
    const data = await apiHelper.post('/products', {
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
    });

    const newData = await apiHelper.get('/products');

    dispacth({ type: ACTIONS.SET_PRODUCTS, payload: newData.data.data });
  };

const updateProduct =
  dispacth =>
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
  }) => {
    const data = await apiHelper.patch(`/products/${id}`, {
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
    });

    const newData = await apiHelper.get('/products');

    dispacth({ type: ACTIONS.SET_PRODUCTS, payload: newData.data.data });
  };

const deleteProduct =
  dispacth =>
  async ({ _id: id }) => {
    const data = await apiHelper.delete(`/products/${id}`);

    const newData = await apiHelper.get('/products');

    dispacth({ type: ACTIONS.SET_PRODUCTS, payload: newData.data.data });
  };

export const { Provider, Context } = contextFactory(
  productReducer,
  {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  },
  {
    products: [],
  },
);
