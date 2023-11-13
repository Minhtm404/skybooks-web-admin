import React, { useContext, useState } from 'react';
import { Button, Dropdown, Label, TextInput, ToggleSwitch } from 'flowbite-react';

import { Context as StateContext } from '../../contexts/StateContext';
import { Context as EmployeeContext } from '../../contexts/EmployeeContext';

const AddEmployeeForm = ({ closeModalAfterSubmit }) => {
  const { currentColor } = useContext(StateContext);
  const { addEmployee } = useContext(EmployeeContext);

  const [name, setName] = useState(undefined);
  const [email, setEmail] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [passwordConfirm, setPasswordConfirm] = useState(undefined);
  const [role, setRole] = useState('staff');
  const [active, setActive] = useState(true);

  const handleCreate = async () => {
    await addEmployee({
      name,
      email,
      password,
      passwordConfirm,
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
        handleCreate();
      }}
    >
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add employee</h3>

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
          <Label htmlFor="password" value="Password" />
        </div>
        <TextInput
          id="password"
          name="password"
          placeholder="Type employee password"
          type="password"
          value={password}
          minLength="8"
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="passwordConfirm" value="Confirm Password" />
        </div>
        <TextInput
          id="passwordConfirm"
          name="passwordConfirm"
          placeholder="Type employee confirm password"
          type="password"
          value={passwordConfirm}
          minLength="8"
          onChange={e => setPasswordConfirm(e.target.value)}
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
          Add employee
        </Button>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
