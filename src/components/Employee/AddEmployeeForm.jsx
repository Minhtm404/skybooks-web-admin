import React, { useContext, useEffect, useState } from 'react';
import { Button, Label, TextInput, Dropdown, ToggleSwitch } from 'flowbite-react';

import { Context as StateContext } from '../../contexts/StateContext';
import { Context as EmployeeContext } from '../../contexts/EmployeeContext';

const AddEmployeeForm = ({ closeModalAfterSubmit }) => {
  const { currentColor } = useContext(StateContext);
  const { employees, getAllEmployees, addEmployee } = useContext(EmployeeContext);

  const [name, setName] = useState(undefined);
  const [mainemployee, setMainemployee] = useState(undefined);
  const [parentemployee, setParentemployee] = useState(undefined);

  useEffect(() => {
    getAllEmployees();
  }, []);

  const handleUpdate = async () => {
    await addEmployee({
      name,
      mainemployee,
      parentemployee,
    });

    closeModalAfterSubmit();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit employee</h3>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type product name"
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="main-employee" value="Main employee" />
        </div>
        <ToggleSwitch
          checked={mainemployee}
          onChange={e => {
            setMainemployee(e);
            console.log(mainemployee);
          }}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="sub-employee" value="Sub employee" />
        </div>

        <Dropdown
          disabled={mainemployee}
          label={
            employees.find(c => c._id === setParentemployee)?.name ??
            'Select parent employee'
          }
          color="gray"
        >
          {employees
            .filter(c => c.mainemployee)
            .map(employee => (
              <Dropdown.Item onClick={() => setParentemployee(employee._id)}>
                {employee.name}
              </Dropdown.Item>
            ))}
        </Dropdown>
      </div>

      <div className="w-full">
        <Button
          onClick={() => {
            handleUpdate();
          }}
          style={{ background: currentColor }}
        >
          Edit employee
        </Button>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
