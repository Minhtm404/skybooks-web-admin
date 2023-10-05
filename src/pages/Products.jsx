import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Table,
  Modal,
  Label,
  TextInput,
  Dropdown,
  Textarea,
} from 'flowbite-react';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as CollectionContext } from '../contexts/CollectionContext';
import { Context as ProductContext } from '../contexts/ProductContext';

import { Header } from '../components';
import { PRODUCT_COLUMNS } from '../constants';

const Products = () => {
  const { currentColor } = useContext(StateContext);
  const { collections, getAllCollections } = useContext(CollectionContext);
  const { products, getAllProducts } = useContext(ProductContext);

  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openUpdateProductModal, setOpenUpdateProductModal] = useState(false);

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
              <Table.Cell>{product.mainCollection}</Table.Cell>
              <Table.Cell>{product.sku}</Table.Cell>
              <Table.Cell>{product.price}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button style={{ background: currentColor }} size="sm">
                    <BiEdit className="mr-2" />
                    Update
                  </Button>
                  <Button size="sm" className="bg-red-700">
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
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              Add product
            </h3>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Name" />
              </div>
              <TextInput id="name" placeholder="Type product name" required />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="mainCollection" value="Main collection" />
              </div>
              <Dropdown label="Select main collection" color="gray">
                {collections.map(collection => (
                  <Dropdown.Item>{collection.name}</Dropdown.Item>
                ))}
              </Dropdown>
            </div>

            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="price" value="Price" />
                </div>
                <TextInput id="price" placeholder="100000" required />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="discount" value="Discount" />
                </div>
                <TextInput id="discount" />
              </div>
            </div>

            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="sku" value="SKU" />
                </div>
                <TextInput id="sku" />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="vendor" value="Vendor" />
                </div>
                <TextInput id="vendor" />
              </div>
            </div>

            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="author" value="Author" />
                </div>
                <TextInput id="author" />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="format" value="Format" />
                </div>
                <TextInput id="format" />
              </div>
            </div>

            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="dimensions" value="Dimensions" />
                </div>
                <TextInput id="dimensions" />
              </div>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="pub_date" value="Publish date" />
                </div>
                <TextInput id="pub_date" />
              </div>
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Description" />
              </div>
              <Textarea
                id="description"
                placeholder="Enter product description here"
                required
                rows={4}
              />
            </div>

            <div className="w-full">
              <Button style={{ background: currentColor }}>Add product</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Products;
