import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, Modal, Label, TextInput, Spinner, Toast } from 'flowbite-react';
import { BiEdit } from 'react-icons/bi';
import { HiExclamation, HiOutlineExclamationCircle } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as CollectionContext } from '../contexts/CollectionContext';
import { Context as ProductContext } from '../contexts/ProductContext';

import { PRODUCT_COLUMNS } from '../constants';

import { AddProductForm, EditProductForm, Header } from '../components';

const Products = () => {
  const { currentColor } = useContext(StateContext);
  const {
    collections,
    getAllCollections,
    isLoading: isLoadingCollection,
    setIsLoading: setIsLoadingCollection,
  } = useContext(CollectionContext);
  const {
    products,
    getAllProducts,
    deleteProduct,
    isLoading: isLoadingProduct,
    setIsLoading: setIsLoadingProduct,
    error,
  } = useContext(ProductContext);

  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openUpdateProductModal, setOpenUpdateProductModal] = useState(false);
  const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);

  const [keyword, setKeyword] = useState('');
  const [currentProduct, setCurrentProduct] = useState(undefined);

  useEffect(() => {
    setIsLoadingCollection(true);
    getAllCollections();
    setIsLoadingProduct(true);
    getAllProducts();
  }, []);

  const handleOpenUpdateModal = product => {
    setCurrentProduct(product);
    setOpenUpdateProductModal(true);
  };

  const handleOpenDeleteModal = product => {
    setCurrentProduct(product);
    setOpenDeleteProductModal(true);
  };

  const handleDelete = async () => {
    await deleteProduct(currentProduct);
    setOpenDeleteProductModal(false);
  };

  if (isLoadingCollection || isLoadingProduct) {
    return (
      <div className="relative w-full h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (collections && products) {
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-gray-800 dark:border-gray-700">
        {error ? (
          <Toast className="absolute top-4 left-4">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{error}</div>
            <Toast.Toggle />
          </Toast>
        ) : (
          <></>
        )}

        <Header title="Products" />

        <div class="p-4 bg-white block sm:flex Dropdown.Items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
          <div class="w-full mb-1">
            <div class="Dropdown.Items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
              <div class="flex Dropdown.Items-center mb-4 sm:mb-0">
                <Label htmlFor="products-search" className="sr-only" />
                <div class="relative w-48 mt-1 sm:w-64 xl:w-96">
                  <TextInput
                    id="products-search"
                    name="products-search"
                    placeholder="Search by name, collection or sku"
                    type="search"
                    value={keyword}
                    onChange={e => {
                      setKeyword(e.target.value);
                      getAllProducts(e.target.value);
                    }}
                  />
                </div>
              </div>

              <Button
                style={{ background: currentColor }}
                onClick={() => setOpenAddProductModal(true)}
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
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <img
                    src={`${product.imageCover}/-/scale_crop/300x300/-/format/auto/-/quality/smart_retina/`}
                    alt=""
                  />
                </Table.Cell>
                <Table.Cell>{product.name}</Table.Cell>
                <Table.Cell>{product.mainCollection?.name}</Table.Cell>
                <Table.Cell>{product.sku}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button
                      size="sm"
                      style={{ background: currentColor }}
                      onClick={() => handleOpenUpdateModal(product)}
                    >
                      <BiEdit className="mr-2" />
                      Update
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-700"
                      onClick={() => handleOpenDeleteModal(product)}
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
          popup
          show={openAddProductModal === true}
          size="2xl"
          onClose={() => setOpenAddProductModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <AddProductForm closeModalAfterSubmit={() => setOpenAddProductModal(false)} />
          </Modal.Body>
        </Modal>

        <Modal
          dismissible
          popup
          show={openUpdateProductModal === true}
          size="2xl"
          onClose={() => setOpenUpdateProductModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <EditProductForm
              product={currentProduct}
              closeModalAfterSubmit={() => setOpenUpdateProductModal(false)}
            />
          </Modal.Body>
        </Modal>

        <Modal
          dismissible
          popup
          show={openDeleteProductModal === true}
          size="md"
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
                <Button color="failure" onClick={() => handleDelete()}>
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
  }
};

export default Products;
