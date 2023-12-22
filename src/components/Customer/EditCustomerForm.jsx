import React, { useContext, useState } from 'react';
import { Button, Label, TextInput, ToggleSwitch } from 'flowbite-react';

import { Context as StateContext } from '../../contexts/StateContext';
import { Context as CustomerContext } from '../../contexts/CustomerContext';

const EditCustomerForm = ({ customer, removeCurrent, closeModalAfterSubmit }) => {
  const { currentColor } = useContext(StateContext);
  const { updateCustomer } = useContext(CustomerContext);

  const [name, setName] = useState(customer.name);
  const [email, setEmail] = useState(customer.email);
  const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);
  const [address, setAddress] = useState(customer.address);
  const [active, setActive] = useState(customer.active);

  const handleUpdate = async () => {
    await updateCustomer({
      _id: customer._id,
      name,
      email,
      phoneNumber,
      address,
      active,
    });

    removeCurrent();

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
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit customer</h3>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          name="name"
          placeholder="Type customer name"
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
          placeholder="Type customer email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="phoneNumber" value="Phone number" />
        </div>
        <TextInput
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Type customer phone number"
          type="text"
          value={phoneNumber}
          onChange={e => setPhoneNumber(e.target.value)}
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="address" value="Address" />
        </div>
        <TextInput
          id="address"
          name="address"
          placeholder="Type customer address"
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
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
          Edit customer
        </Button>
      </div>
    </form>
  );
};

export default EditCustomerForm;
