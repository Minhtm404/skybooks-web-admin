import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Table,
  Modal,
  Label,
  TextInput,
  Spinner,
  Toast,
  Badge,
  Pagination,
} from 'flowbite-react';
import { BiEdit } from 'react-icons/bi';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as OrderContext } from '../contexts/OrderContext';

import { ORDER_COLUMNS } from '../constants';

import { EditOrderForm, Header } from '../components';
import { HiExclamation } from 'react-icons/hi';

const Orders = () => {
  const { currentColor } = useContext(StateContext);
  const { orders, totalOrders, getAllOrders, isLoading, setIsLoading, error } =
    useContext(OrderContext);

  const [openUpdateOrderModal, setOpenUpdateOrderModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [currentOrder, setCurrentOrder] = useState(undefined);

  useEffect(() => {
    setIsLoading(true);
    getAllOrders({ keyword, page: currentPage, limit: 5 });
  }, [currentPage]);

  const handleOpenUpdateModal = order => {
    setCurrentOrder(order);
    setOpenUpdateOrderModal(true);
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (orders) {
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-gray-800 dark:border-gray-700 print:hidden">
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

        <Header title="Orders" />

        <div class="p-4 bg-white block sm:flex Dropdown.Items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
          <div class="w-full mb-1">
            <div class="Dropdown.Items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
              <div class="flex Dropdown.Items-center mb-4 sm:mb-0">
                <Label htmlFor="orders-search" className="sr-only" />
                <div class="relative w-48 mt-1 sm:w-64 xl:w-96">
                  <TextInput
                    id="orders-search"
                    name="orders-search"
                    placeholder="Search by customer or product"
                    type="search"
                    value={keyword}
                    onChange={e => {
                      setKeyword(e.target.value);
                      setCurrentPage(1);
                      getAllOrders({ keyword: e.target.value, page: 1, limit: 5 });
                    }}
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
                <Table.Cell>{order.price.toLocaleString().concat('₫')}</Table.Cell>
                <Table.Cell>
                  <Badge color={order.paymentStatus ? 'success' : 'failure'} className="w-fit">
                    {order.paymentStatus ? 'Paid' : 'Unpaid'}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="capitalize">
                  <Badge
                    color={
                      order.orderStatus === 'new'
                        ? 'info'
                        : order.orderStatus === 'delivery'
                        ? 'indigo'
                        : 'success'
                    }
                    className="w-fit"
                  >
                    {order.orderStatus}
                  </Badge>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    size="sm"
                    style={{ background: currentColor }}
                    onClick={() => handleOpenUpdateModal(order)}
                  >
                    <BiEdit className="mr-2" />
                    Update
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>

        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalOrders / 5)}
            onPageChange={page => setCurrentPage(page)}
            showIcons
          />
        </div>

        <Modal
          dismissible
          popup
          show={openUpdateOrderModal === true}
          size="2xl"
          onClose={() => setOpenUpdateOrderModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <EditOrderForm
              order={currentOrder}
              closeModalAfterSubmit={() => setOpenUpdateOrderModal(false)}
            />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default Orders;
