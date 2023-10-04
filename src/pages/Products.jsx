import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Table,
  Modal,
  Label,
  TextInput,
  Dropdown,
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

  const [openModal, setOpenModal] = useState();
  const [email, setEmail] = useState('');
  const props = { openModal, setOpenModal, email, setEmail };

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
            <Button
              onClick={() => props.setOpenModal('form-elements')}
              style={{ background: currentColor }}
            >
              Add new product
            </Button>
          </div>
        </div>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox style={{ color: currentColor }} />
          </Table.HeadCell>
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
              <Table.Cell className="p-4">
                <Checkbox style={{ color: currentColor }} />
              </Table.Cell>
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
                    Delete Dropdown.Item
                  </Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal
        dismissible
        show={props.openModal === 'form-elements'}
        size="2xl"
        popup
        onClose={() => props.setOpenModal(undefined)}
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

            <div>
              <div className="mb-2 block">
                <Label htmlFor="sku" value="SKU" />
              </div>
              <TextInput id="sku" />
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
