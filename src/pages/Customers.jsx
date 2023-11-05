import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, Modal, Label, TextInput } from 'flowbite-react';
import { BiEdit } from 'react-icons/bi';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as CustomerContext } from '../contexts/CustomerContext';

import { CUSTOMER_COLUMNS } from '../constants';
import { Header, EditCustomerForm } from '../components';

const Customers = () => {
  const { currentColor } = useContext(StateContext);
  const { customers, getAllCustomers, deleteCustomer } = useContext(CustomerContext);

  const [openUpdateCustomerModal, setOpenUpdateCustomerModal] = useState(false);
  const [openDeleteCustomerModal, setOpenDeleteCustomerModal] = useState(false);

  const [currentCustomer, setCurrentCustomer] = useState({});

  useEffect(() => {
    getAllCustomers();
  }, []);

  const handleOpenUpdateModal = customer => {
    setCurrentCustomer(customer);
    setOpenUpdateCustomerModal(true);
  };

  const handleOpenDeleteModal = customer => {
    setCurrentCustomer(customer);
    setOpenDeleteCustomerModal(true);
  };

  const handleDelete = async () => {
    await deleteCustomer(currentCustomer);
    setOpenDeleteCustomerModal(false);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-gray-800 dark:border-gray-700">
      <Header title="Customers" />

      <div class="p-4 bg-white block sm:flex Dropdown.Items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full mb-1">
          <div class="Dropdown.Items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div class="flex Dropdown.Items-center mb-4 sm:mb-0">
              <Label htmlFor="customers-search" className="sr-only" />
              <div class="relative w-48 mt-1 sm:w-64 xl:w-96">
                <TextInput
                  name="customers-search"
                  id="customers-search"
                  placeholder="Search for customers"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Table hoverable>
        <Table.Head>
          {CUSTOMER_COLUMNS.map(column => (
            <Table.HeadCell>{column.headerText}</Table.HeadCell>
          ))}
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {customers.map(customer => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {customer._id}
              </Table.Cell>
              <Table.Cell>{customer.name}</Table.Cell>
              <Table.Cell>{customer.email}</Table.Cell>
              <Table.Cell>{customer.active ? 'Active' : 'Deactive'}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button
                    onClick={() => handleOpenUpdateModal(customer)}
                    style={{ background: currentColor }}
                    size="sm"
                  >
                    <BiEdit className="mr-2" />
                    Update
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteModal(customer)}
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
        show={openUpdateCustomerModal === true}
        size="2xl"
        popup
        onClose={() => setOpenUpdateCustomerModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <EditCustomerForm
            customer={currentCustomer}
            closeModalAfterSubmit={() => setOpenUpdateCustomerModal(false)}
          />
        </Modal.Body>
      </Modal>

      <Modal
        dismissible
        show={openDeleteCustomerModal === true}
        size="md"
        popup
        onClose={() => setOpenDeleteCustomerModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this customer?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete()}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpenDeleteCustomerModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Customers;
