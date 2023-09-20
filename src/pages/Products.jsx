import React from 'react';

import { Header, Table } from '../components';

import { PRODUCT_COLUMNS } from '../constants';

const Products = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Products" />

      <Table headers={PRODUCT_COLUMNS} data={[]} />
    </div>
  );
};

export default Products;
