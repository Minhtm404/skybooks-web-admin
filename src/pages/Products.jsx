import React, { useContext, useEffect } from 'react';

import { Context as ProductContext } from '../contexts/ProductContext';

import { Header, Table } from '../components';
import { PRODUCT_COLUMNS } from '../constants';

const Products = () => {
  const { products, getAllProducts } = useContext(ProductContext);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Products" />

      <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full mb-1">
          <div class="items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div class="flex items-center mb-4 sm:mb-0">
              <form class="sm:pr-3" action="#" method="GET">
                <label for="products-search" class="sr-only">
                  Search
                </label>
                <div class="relative w-48 mt-1 sm:w-64 xl:w-96">
                  <input
                    type="text"
                    name="email"
                    id="products-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search for products"
                  />
                </div>
              </form>
            </div>
            <button
              id="createProductButton"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-primary-800"
              type="button"
              data-drawer-target="drawer-create-product-default"
              data-drawer-show="drawer-create-product-default"
              aria-controls="drawer-create-product-default"
              data-drawer-placement="right"
            >
              Add new product
            </button>
          </div>
        </div>
      </div>

      <Table headers={PRODUCT_COLUMNS} dataSource={products} />
    </div>
  );
};

export default Products;
