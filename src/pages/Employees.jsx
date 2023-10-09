import React, { useContext, useEffect } from 'react';
import { Button, Checkbox, Table } from 'flowbite-react';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as EmployeeContext } from '../contexts/EmployeeContext';

import { EditEmployeeModal, EmployeeTable, Header } from '../components';
import { EMPLOYEE_COLUMNS } from '../constants';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Employees = () => {
  const { currentColor } = useContext(StateContext);
  const { employees, getAllEmployees } = useContext(EmployeeContext);

  useEffect(() => {
    getAllEmployees();
  }, []);

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-gray-800 dark:border-gray-700">
      <Header title="Employees" />

      <div class="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full mb-1">
          <div class="sm:flex">
            <div class="items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700">
              <form class="lg:pr-3" action="#" method="GET">
                <label for="users-search" class="sr-only">
                  Search
                </label>
                <div class="relative mt-1 lg:w-64 xl:w-96">
                  <input
                    type="text"
                    name="email"
                    id="users-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Search for users"
                  />
                </div>
              </form>
              <div class="flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0"></div>
            </div>
            <div class="flex items-center ml-auto space-x-2 sm:space-x-3">
              <button
                type="button"
                data-modal-toggle="add-user-modal"
                style={{ background: currentColor }}
                class="inline-flex items-center justify-center w-1/2 px-3 py-2 text-sm font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Add user
              </button>
            </div>
          </div>
        </div>
      </div>

      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="p-4">
            <Checkbox style={{ color: currentColor }} />
          </Table.HeadCell>
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
              <Table.Cell className="p-4">
                <Checkbox style={{ color: currentColor }} />
              </Table.Cell>
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {employee._id}
              </Table.Cell>
              <Table.Cell>{employee.name}</Table.Cell>
              <Table.Cell>{employee.email}</Table.Cell>
              <Table.Cell>{employee.role}</Table.Cell>
              <Table.Cell>{employee.active.toString()}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button style={{ background: currentColor }} size="sm">
                    <BiEdit className="mr-2" />
                    Update
                  </Button>
                  <Button size="sm" className="bg-red-700">
                    <RiDeleteBin6Line className="mr-2" />
                    Delete item
                  </Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Employees;
