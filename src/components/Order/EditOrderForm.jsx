import React from 'react';
import { Label, TextInput } from 'flowbite-react';

const EditOrderForm = ({ order }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">View order</h3>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="userName" value="Customer" />
        </div>
        <TextInput id="userName" value={order.user.name} disabled />
      </div>

      {order.products.map(item => (
        <div className="grid gap-4 mb-4 sm:grid-cols-4">
          <div className="col-span-3">
            <div className="mb-2 block">
              <Label htmlFor="productName" value="Product" />
            </div>
            <TextInput id="productName" value={item.product.name} disabled />
          </div>

          <div>
            <div className="mb-2 block">
              <Label htmlFor="productQuantity" value="Quantity" />
            </div>
            <TextInput id="productQuantity" value={item.quantity} disabled />
          </div>
        </div>
      ))}

      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Price" />
          </div>
          <TextInput id="price" value={order.price} disabled />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="paid" value="Payment Status" />
          </div>
          <TextInput id="paid" value={order.paid ? 'Paid' : 'Unpaid'} disabled />
        </div>
      </div>
    </div>
  );
};

export default EditOrderForm;
