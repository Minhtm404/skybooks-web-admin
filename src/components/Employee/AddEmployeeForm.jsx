import React, { useContext, useState } from 'react';
import { Button, Label, TextInput, Dropdown, ToggleSwitch } from 'flowbite-react';

import { Context as StateContext } from '../../contexts/StateContext';
import { Context as EmployeeContext } from '../../contexts/EmployeeContext';

const AddEmployeeForm = ({ closeModalAfterSubmit }) => {
  const { currentColor } = useContext(StateContext);
  const { addEmployee } = useContext(EmployeeContext);

  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [role, setRole] = useState('staff');
  const [active, setActive] = useState(true);

  const handleUpdate = async () => {
    await addEmployee({
      name,
      email,
      role,
      active,
    });

    closeModalAfterSubmit();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add employee</h3>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type employee name"
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Type employee email"
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="role" value="Role" />
        </div>

        <Dropdown
          label={(role === 'admin' ? 'Admin' : 'Staff') ?? 'Select role'}
          color="gray"
        >
          <Dropdown.Item onClick={() => setRole('admin')}>Admin</Dropdown.Item>
          <Dropdown.Item onClick={() => setRole('staff')}>Staff</Dropdown.Item>
        </Dropdown>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="status" value="Status" />
        </div>
        <ToggleSwitch
          checked={active}
          onChange={e => {
            setActive(e);
          }}
        />
      </div>

      <div className="w-full">
        <Button
          onClick={() => {
            handleUpdate();
          }}
          style={{ background: currentColor }}
        >
          Add employee
        </Button>
      </div>
    </div>
  );
};

export default AddEmployeeForm;
