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

  const printContent = (
    <div className="w-full flex flex-col gap-4">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Order #{order._id}</h3>

      <div className="flex justify-between">
        <div>Customer: {order.user.name}</div>
        <div>{new Date(order.createdAt).toLocaleString()}</div>
      </div>

      <div className="flex flex-col gap-2">
        <div>Products:</div>
        {order.products.map(item => (
          <div key={item.id} className="flex justify-between">
            <div className="w-400 min-[w]:400 overflow-hidden">{item.product.name}</div>
            <div className="grid grid-cols-2">
              <div className="col-span-1">{item.quantity}</div>
              <div className="col-span-1 text-right">
                {item.product.price.toLocaleString().concat('₫')}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <div>Total</div>
        <div>{order.price.toLocaleString().concat('₫')}</div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="hidden print:flex">{printContent}</div>

      <form
        className="space-y-6 print:hidden"
        onSubmit={e => {
          e.preventDefault();
          handleUpdate();
          closeModalAfterSubmit();
        }}
      >
        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update order</h3>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="userName" value="Customer" />
          </div>
          <TextInput id="userName" name="userName" type="text" value={order.user.name} readOnly />
        </div>

        {order.products.map(item => (
          <div className="flex flex-col space-y-6">
            <div>
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

            <div className="grid gap-4 mb-4 sm:grid-cols-4">
              <div className="col-span-3">
                <div className="mb-2 block">
                  <Label htmlFor="productPrice" value="Price" />
                </div>
                <TextInput
                  id="productPrice"
                  name="productPrice"
                  type="text"
                  value={item.product.price}
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
          </div>
        ))}

        <div className="grid gap-4 mb-4 sm:grid-cols-2">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="price" value="Price" />
            </div>
            <TextInput id="price" name="price" type="number" value={order.price} readOnly />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="createdAt" value="Created At" />
            </div>
            <TextInput
              id="createdAt"
              name="createdAt"
              type="text"
              value={new Date(order.createdAt).toLocaleString()}
              readOnly
            />
          </div>
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

        <div className="w-full flex gap-2">
          <Button style={{ background: currentColor }} type="submit">
            Edit order
          </Button>
          <Button color="light" onClick={() => window.print()}>
            Print
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditOrderForm;
