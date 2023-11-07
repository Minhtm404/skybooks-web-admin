import React, { useContext, useState } from 'react';
import { Button, Dropdown, Label, TextInput, ToggleSwitch } from 'flowbite-react';

import { Context as StateContext } from '../../contexts/StateContext';
import { Context as EmployeeContext } from '../../contexts/EmployeeContext';

const EditEmployeeForm = ({ employee, closeModalAfterSubmit }) => {
  const { currentColor } = useContext(StateContext);
  const { updateEmployee } = useContext(EmployeeContext);

  const [name, setName] = useState(employee.name);
  const [email, setEmail] = useState(employee.email);
  const [role, setRole] = useState(employee.role);
  const [active, setActive] = useState(employee.active);

  const handleUpdate = async () => {
    await updateEmployee({
      _id: employee._id,
      name,
      email,
      role,
      active,
    });

    closeModalAfterSubmit();
  };

  return (
    <form
      className="space-y-6"
      onSubmit={e => {
        e.preventDefault();
        handleUpdate();
      }}
    >
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit employee</h3>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          name="name"
          placeholder="Type employee name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Email" />
        </div>
        <TextInput
          id="email"
          name="email"
          placeholder="Type employee email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="role" value="Role" />
        </div>
        <Dropdown
          id="role"
          name="role"
          color="gray"
          label={(role === 'admin' ? 'Admin' : 'Staff') ?? 'Select role'}
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
          id="status"
          name="status"
          checked={active}
          onChange={e => {
            setActive(e);
          }}
        />
      </div>

      <div className="w-full">
        <Button style={{ background: currentColor }} type="submit">
          Edit employee
        </Button>
      </div>
    </form>
  );
};

export default EditEmployeeForm;
