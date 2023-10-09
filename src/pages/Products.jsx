import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Table,
  Modal,
  Label,
  TextInput,
} from 'flowbite-react';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as CollectionContext } from '../contexts/CollectionContext';
import { Context as ProductContext } from '../contexts/ProductContext';

import { AddProductForm, EditProductForm, Header } from '../components';
import { PRODUCT_COLUMNS } from '../constants';

const Products = () => {
  const { currentColor } = useContext(StateContext);
  const { collections, getAllCollections } = useContext(CollectionContext);
  const { products, getAllProducts } = useContext(ProductContext);

  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openUpdateProductModal, setOpenUpdateProductModal] = useState(false);
  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);

  const [currentProduct, setCurrentProduct] = useState({});

  const handleOpenUpdateModal = product => {
    setCurrentProduct(product);
    setOpenUpdateProductModal(true);
  };

  const handleOpenDeleteModal = product => {
    setCurrentProduct(product);
    setOpenDeleteProductModal(true);
  };

  useEffect(() => {
    getAllCollections();
    getAllProducts();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Products" />

      <div class="p-4 bg-white block sm:flex Dropdown.Items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full mb-1">
          <div class="Dropdown.Items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div class="flex Dropdown.Items-center mb-4 sm:mb-0">
              <Label htmlFor="products-search" className="sr-only" />
              <div class="relative w-48 mt-1 sm:w-64 xl:w-96">
                <TextInput
                  name="products-search"
                  id="products-search"
                  placeholder="Search for products"
                />
              </div>
            </div>

            <Button
              onClick={() => setOpenAddProductModal(true)}
              style={{ background: currentColor }}
            >
              Add new product
            </Button>
          </div>
        </div>
      </div>

      <Table hoverable>
        <Table.Head>
          {PRODUCT_COLUMNS.map(column => (
            <Table.HeadCell>{column.headerText}</Table.HeadCell>
          ))}
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {products.map(product => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {product._id}
              </Table.Cell>
              <Table.Cell>{product.name.slice(0, 30)}...</Table.Cell>
              <Table.Cell>
                {collections.find(c => c._id === product.mainCollection)?.name}
              </Table.Cell>
              <Table.Cell>{product.sku}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button
                    onClick={() => handleOpenUpdateModal(product)}
                    style={{ background: currentColor }}
                    size="sm"
                  >
                    <BiEdit className="mr-2" />
                    Update
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteModal(product)}
                    size="sm"
                    className="bg-red-700"
                  >
                    <RiDeleteBin6Line className="mr-2" />
                    Delete
                  </Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal
        dismissible
        show={openAddProductModal === true}
        size="2xl"
        popup
        onClose={() => setOpenAddProductModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <AddProductForm />
        </Modal.Body>
      </Modal>

      <Modal
        dismissible
        show={openUpdateProductModal === true}
        size="2xl"
        popup
        onClose={() => setOpenUpdateProductModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <EditProductForm product={currentProduct} />
        </Modal.Body>
      </Modal>

      <Modal
        dismissible
        show={openDeleteProductModal === true}
        size="md"
        popup
        onClose={() => setOpenDeleteProductModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this product?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenDeleteProductModal(false)}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpenDeleteProductModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Products;
