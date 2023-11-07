import React from 'react';
import { Label, TextInput } from 'flowbite-react';

const EditOrderForm = ({ order }) => {
  return (
    <form className="space-y-6">
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

      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Price" />
          </div>
          <TextInput id="price" name="price" type="number" value={order.price} readOnly />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="paid" value="Payment Status" />
          </div>
          <TextInput
            id="paid"
            name="paid"
            type="text"
            value={order.paid ? 'Paid' : 'Unpaid'}
            readOnly
          />
        </div>
      </div>
    </form>
  );
};

export default EditOrderForm;
