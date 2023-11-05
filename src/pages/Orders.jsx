import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, Modal, Label, TextInput } from 'flowbite-react';
import { BiEdit } from 'react-icons/bi';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as OrderContext } from '../contexts/OrderContext';

import { ORDER_COLUMNS } from '../constants';

import { Header, EditOrderForm } from '../components';

const Orders = () => {
  const { currentColor } = useContext(StateContext);
  const { orders, getAllOrders } = useContext(OrderContext);

  const [openUpdateOrderModal, setOpenUpdateOrderModal] = useState(false);

  const [currentOrder, setCurrentOrder] = useState({});

  useEffect(() => {
    getAllOrders();
  }, []);

  const handleOpenUpdateModal = order => {
    setCurrentOrder(order);
    setOpenUpdateOrderModal(true);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-gray-800 dark:border-gray-700">
      <Header title="Orders" />

      <div class="p-4 bg-white block sm:flex Dropdown.Items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full mb-1">
          <div class="Dropdown.Items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div class="flex Dropdown.Items-center mb-4 sm:mb-0">
              <Label htmlFor="orders-search" className="sr-only" />
              <div class="relative w-48 mt-1 sm:w-64 xl:w-96">
                <TextInput
                  name="orders-search"
                  id="orders-search"
                  placeholder="Search for orders"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Table hoverable>
        <Table.Head>
          {ORDER_COLUMNS.map(column => (
            <Table.HeadCell>{column.headerText}</Table.HeadCell>
          ))}
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {orders.map(order => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {order._id}
              </Table.Cell>
              <Table.Cell>{order.user.name}</Table.Cell>
              <Table.Cell>
                {order.products.map(({ product }) => product.name).join(', ')}
              </Table.Cell>
              <Table.Cell>{order.price}</Table.Cell>
              <Table.Cell>{order.paid ? 'Paid' : 'Unpaid'}</Table.Cell>
              <Table.Cell>
                <Button
                  onClick={() => handleOpenUpdateModal(order)}
                  style={{ background: currentColor }}
                  size="sm"
                >
                  <BiEdit className="mr-2" />
                  View
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal
        dismissible
        show={openUpdateOrderModal === true}
        size="2xl"
        popup
        onClose={() => setOpenUpdateOrderModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <EditOrderForm order={currentOrder} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Orders;
