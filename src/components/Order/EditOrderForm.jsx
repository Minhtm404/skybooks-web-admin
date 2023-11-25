import React, { useContext, useState } from 'react';
import { Button, Label, Select, TextInput } from 'flowbite-react';

import { Context as StateContext } from '../../contexts/StateContext';
import { Context as OrderContext } from '../../contexts/OrderContext';

const EditOrderForm = ({ order, closeModalAfterSubmit }) => {
  const { currentColor } = useContext(StateContext);
  const { updateOrder, isLoading, setIsLoading, error } = useContext(OrderContext);

  const [paymentStatus, setPaymentStatus] = useState(order.paymentStatus);
  const [orderStatus, setOrderStatus] = useState(order.orderStatus);

  const handleUpdate = async () => {
    await updateOrder({ orderId: order._id, paymentStatus, orderStatus });
  };

  return (
    <form
      className="space-y-6"
      onSubmit={e => {
        e.preventDefault();
        handleUpdate();
        closeModalAfterSubmit();
      }}
    >
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">View order</h3>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="userName" value="Customer" />
        </div>
        <TextInput id="userName" name="userName" type="text" value={order.user.name} readOnly />
      </div>

      {order.products.map(item => (
        <div className="grid gap-4 mb-4 sm:grid-cols-4">
          <div className="col-span-3">
            <div className="mb-2 block">
              <Label htmlFor="productName" value="Product" />
            </div>
            <TextInput
              id="productName"
              name="productName"
              type="text"
              value={item.product.name}
              readOnly
            />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="productQuantity" value="Quantity" />
            </div>
            <TextInput
              id="productQuantity"
              name="productQuantity"
              type="number"
              value={item.quantity}
              readOnly
            />
          </div>
        </div>
      ))}

      <div>
        <div className="mb-2 block">
          <Label htmlFor="price" value="Price" />
        </div>
        <TextInput id="price" name="price" type="number" value={order.price} readOnly />
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="paymentStatus" value="Payment Status" />
          </div>
          <Select
            id="paymentStatus"
            name="paymentStatus"
            onChange={e => {
              setPaymentStatus(e.target.value);
            }}
            required
          >
            <option value={false} selected={paymentStatus === false}>
              Unpaid
            </option>
            <option value={true} selected={paymentStatus === true}>
              Paid
            </option>
          </Select>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="orderStatus" value="Order Status" />
          </div>
          <Select
            id="orderStatus"
            name="orderStatus"
            onChange={e => {
              setOrderStatus(e.target.value);
            }}
            required
          >
            <option value="new" selected={orderStatus === 'new'}>
              New
            </option>
            <option value="delivery" selected={orderStatus === 'delivery'}>
              Delivery
            </option>
            <option value="complete" selected={orderStatus === 'complete'}>
              Complete
            </option>
          </Select>
        </div>
      </div>

      <div className="w-full">
        <Button style={{ background: currentColor }} type="submit">
          Edit order
        </Button>
      </div>
    </form>
  );
};

export default EditOrderForm;
