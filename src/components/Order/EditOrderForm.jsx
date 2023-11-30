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
    <div>
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update order</h3>

      {/* Print Customer */}
      <div>
        <Label htmlFor="userName" value="Customer" />
        <TextInput id="userName" name="userName" type="text" value={order.user.name} readOnly />
      </div>

      {/* Print Products */}
      {order.products.map(item => (
        <div key={item.id}>
          <Label htmlFor="productName" value="Product" />
          <TextInput
            id="productName"
            name="productName"
            type="text"
            value={item.product.name}
            readOnly
          />

          <Label htmlFor="productQuantity" value="Quantity" />
          <TextInput
            id="productQuantity"
            name="productQuantity"
            type="number"
            value={item.quantity}
            readOnly
          />
        </div>
      ))}

      {/* Print Price */}
      <div>
        <Label htmlFor="price" value="Price" />
        <TextInput id="price" name="price" type="number" value={order.price} readOnly />
      </div>

      {/* Print Payment and Order Status */}
      <div>
        <Label htmlFor="paymentStatus" value="Payment Status" />
        <Select id="paymentStatus" name="paymentStatus" value={paymentStatus} disabled>
          <option value={false}>Unpaid</option>
          <option value={true}>Paid</option>
        </Select>

        <Label htmlFor="orderStatus" value="Order Status" />
        <Select id="orderStatus" name="orderStatus" value={orderStatus} disabled>
          <option value="new">New</option>
          <option value="delivery">Delivery</option>
          <option value="complete">Complete</option>
        </Select>
      </div>
    </div>
  );

  return (
    <div>
      <div className="hidden print:block">{printContent}</div>

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

        <div className="w-full flex gap-2">
          <Button style={{ background: currentColor }} type="submit">
            Edit order
          </Button>
          <Button style={{ background: currentColor }} onClick={() => window.print()}>
            Print
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditOrderForm;
