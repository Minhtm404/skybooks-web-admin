import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, Modal, Label, TextInput, Spinner } from 'flowbite-react';
import { BiEdit } from 'react-icons/bi';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as EmployeeContext } from '../contexts/EmployeeContext';

import { EMPLOYEE_COLUMNS } from '../constants';

import { AddEmployeeForm, EditEmployeeForm, Header } from '../components';

const Employees = () => {
  const { currentColor } = useContext(StateContext);
  const { employees, getAllEmployees, deleteEmployee, isLoading, setIsLoading } =
    useContext(EmployeeContext);

  const [openAddEmployeeModal, setOpenAddEmployeeModal] = useState(false);
  const [openUpdateEmployeeModal, setOpenUpdateEmployeeModal] = useState(false);
  const [openDeleteEmployeeModal, setOpenDeleteEmployeeModal] = useState(false);

  const [currentEmployee, setCurrentEmployee] = useState(undefined);

  useEffect(() => {
    if (!employees) {
      setIsLoading(true);
      getAllEmployees();
    }
  }, [employees]);

  const handleOpenUpdateModal = employee => {
    setCurrentEmployee(employee);
    setOpenUpdateEmployeeModal(true);
  };

  const handleOpenDeleteModal = employee => {
    setCurrentEmployee(employee);
    setOpenDeleteEmployeeModal(true);
  };

  const handleDelete = async () => {
    await deleteEmployee(currentEmployee);
    setOpenDeleteEmployeeModal(false);
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (employees) {
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-gray-800 dark:border-gray-700">
        <Header title="Employees" />

        <div class="p-4 bg-white block sm:flex Dropdown.Items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
          <div class="w-full mb-1">
            <div class="Dropdown.Items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
              <div class="flex Dropdown.Items-center mb-4 sm:mb-0">
                <Label htmlFor="employees-search" className="sr-only" />
                <div class="relative w-48 mt-1 sm:w-64 xl:w-96">
                  <TextInput
                    name="employees-search"
                    id="employees-search"
                    placeholder="Search for employees"
                  />
                </div>
              </div>

              <Button
                onClick={() => setOpenAddEmployeeModal(true)}
                style={{ background: currentColor }}
              >
                Add new employee
              </Button>
            </div>
          </div>
        </div>
        <Table hoverable>
          <Table.Head>
            {EMPLOYEE_COLUMNS.map(column => (
              <Table.HeadCell>{column.headerText}</Table.HeadCell>
            ))}
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {employees.map(employee => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {employee._id}
                </Table.Cell>
                <Table.Cell>{employee.name}</Table.Cell>
                <Table.Cell>{employee.email}</Table.Cell>
                <Table.Cell>{employee.role === 'admin' ? 'Admin' : 'Staff'}</Table.Cell>
                <Table.Cell>{employee.active ? 'Active' : 'Deactive'}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button
                      onClick={() => handleOpenUpdateModal(employee)}
                      style={{ background: currentColor }}
                      size="sm"
                    >
                      <BiEdit className="mr-2" />
                      Update
                    </Button>
                    <Button
                      onClick={() => handleOpenDeleteModal(employee)}
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
          show={openAddEmployeeModal === true}
          size="2xl"
          popup
          onClose={() => setOpenAddEmployeeModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <AddEmployeeForm closeModalAfterSubmit={() => setOpenAddEmployeeModal(false)} />
          </Modal.Body>
        </Modal>

        <Modal
          dismissible
          show={openUpdateEmployeeModal === true}
          size="2xl"
          popup
          onClose={() => setOpenUpdateEmployeeModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <EditEmployeeForm
              employee={currentEmployee}
              closeModalAfterSubmit={() => setOpenUpdateEmployeeModal(false)}
            />
          </Modal.Body>
        </Modal>

        <Modal
          dismissible
          show={openDeleteEmployeeModal === true}
          size="md"
          popup
          onClose={() => setOpenDeleteEmployeeModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this employee?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => handleDelete()}>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setOpenDeleteEmployeeModal(false)}>
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

export default Employees;
