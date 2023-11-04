import React, { useContext, useEffect, useState } from 'react';
import { Button, Label, TextInput, Dropdown, Textarea, Datepicker } from 'flowbite-react';

import { Context as StateContext } from '../../contexts/StateContext';
import { Context as CollectionContext } from '../../contexts/CollectionContext';
import { Context as ProductContext } from '../../contexts/ProductContext';

const EditProductForm = ({ product, closeModalAfterSubmit }) => {
  const { currentColor } = useContext(StateContext);
  const { collections, getAllCollections } = useContext(CollectionContext);
  const { updateProduct } = useContext(ProductContext);

  const [name, setName] = useState(product.name);
  const [mainCollection, setMainCollection] = useState(product.mainCollection);
  const [subCollection, setSubCollection] = useState(product.subCollection);
  const [price, setPrice] = useState(product.price);
  const [discount, setDiscount] = useState(product.discount);
  const [sku, setSku] = useState(product.sku);
  const [vendor, setVendor] = useState(product.vendor);
  const [author, setAuthor] = useState(product.author);
  const [format, setFormat] = useState(product.format);
  const [dimensions, setDimensions] = useState(product.dimensions);
  const [publishDate, setPublishDate] = useState(product.publishDate);
  const [quantity, setQuantity] = useState(product.quantity);
  const [description, setDescription] = useState(product.description);

  useEffect(() => {
    getAllCollections();
  }, []);

  const handleUpdate = async () => {
    await updateProduct({
      _id: product._id,
      name,
      mainCollection,
      subCollection,
      price,
      discount,
      sku,
      vendor,
      author,
      format,
      dimensions,
      publishDate,
      quantity,
      description,
    });

    closeModalAfterSubmit();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit product</h3>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type product name"
          required
        />
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="main-collection" value="Main collection" />
          </div>
          <Dropdown
            label={
              collections.find(c => c._id === mainCollection)?.name ??
              'Select main collection'
            }
            color="gray"
          >
            {collections
              .filter(c => c.mainCollection)
              .map(collection => (
                <Dropdown.Item
                  onClick={() => {
                    setMainCollection(collection._id);
                    setSubCollection(undefined);
                  }}
                >
                  {collection.name}
                </Dropdown.Item>
              ))}
          </Dropdown>
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="sub-collection" value="Sub collection" />
          </div>
          <Dropdown
            label={
              collections.find(c => c._id === subCollection)?.name ??
              'Select sub collection'
            }
            color="gray"
          >
            {collections
              .filter(c => c.parentCollection === mainCollection)
              .map(collection => (
                <Dropdown.Item onClick={() => setSubCollection(collection._id)}>
                  {collection.name}
                </Dropdown.Item>
              ))}
          </Dropdown>
        </div>
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="price" value="Price" />
          </div>
          <TextInput
            id="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="100000"
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="discount" value="Discount" />
          </div>
          <TextInput
            id="discount"
            value={discount}
            onChange={e => setDiscount(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="sku" value="SKU" />
          </div>
          <TextInput id="sku" value={sku} onChange={e => setSku(e.target.value)} />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="vendor" value="Vendor" />
          </div>
          <TextInput
            id="vendor"
            value={vendor}
            onChange={e => setVendor(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="author" value="Author" />
          </div>
          <TextInput
            id="author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="format" value="Format" />
          </div>
          <TextInput
            id="format"
            value={format}
            onChange={e => setFormat(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="dimensions" value="Dimensions" />
          </div>
          <TextInput
            id="dimensions"
            value={dimensions}
            onChange={e => setDimensions(e.target.value)}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="publish-date" value="Publish date" />
          </div>
          <Datepicker
            id="publish-date"
            value={publishDate}
            onSelectedDateChanged={e => {
              setPublishDate(e.toDateString());
            }}
          />
        </div>
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="quantity" value="Quantity" />
          </div>
          <TextInput
            id="quantity"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
          />
        </div>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <Textarea
          id="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Enter product description here"
          required
          rows={4}
        />
      </div>

      <div className="w-full">
        <Button
          onClick={() => {
            handleUpdate();
          }}
          style={{ background: currentColor }}
        >
          Edit product
        </Button>
      </div>
    </div>
  );
};

export default EditProductForm;
