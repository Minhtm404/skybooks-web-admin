import React, { useContext, useState } from 'react';
import { Button, Label, TextInput, ToggleSwitch } from 'flowbite-react';

import { Context as StateContext } from '../../contexts/StateContext';
import { Context as CustomerContext } from '../../contexts/CustomerContext';

const EditCustomerForm = ({ customer, closeModalAfterSubmit }) => {
  const { currentColor } = useContext(StateContext);
  const { updateCustomer } = useContext(CustomerContext);

  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const [active, setActive] = useState(customer.active);

  const handleUpdate = async () => {
    await updateCustomer({
      _id: customer._id,
      name,
      email,
      active,
    });

    closeModalAfterSubmit();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit customer</h3>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type customer name"
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
          placeholder="Type customer email"
          required
        />
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
          Edit customer
        </Button>
      </div>
    </div>
  );
};

export default EditCustomerForm;
