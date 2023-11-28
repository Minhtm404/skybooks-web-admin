import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Datepicker,
  Dropdown,
  FileInput,
  Label,
  Textarea,
  TextInput,
} from 'flowbite-react';

import { Context as StateContext } from '../../contexts/StateContext';
import { Context as CollectionContext } from '../../contexts/CollectionContext';
import { Context as ProductContext } from '../../contexts/ProductContext';

const EditProductForm = ({ product, closeModalAfterSubmit }) => {
  const { currentColor } = useContext(StateContext);
  const { collections, getAllCollections } = useContext(CollectionContext);
  const { updateProduct } = useContext(ProductContext);

  const [name, setName] = useState(product.name);
  const [mainCollection, setMainCollection] = useState(product.mainCollection?._id);
  const [subCollection, setSubCollection] = useState(product.subCollection?._id);
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
  const [imageCover, setImageCover] = useState(undefined);

  useEffect(() => {
    getAllCollections({});
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
      imageCover,
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
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit product</h3>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          name="name"
          placeholder="Type product name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="mainCollection" value="Main collection" />
          </div>
          <Dropdown
            id="mainCollection"
            name="mainCollection"
            label={
              collections.find(c => c._id === mainCollection)?.name ?? 'Select main collection'
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
            <Label htmlFor="subCollection" value="Sub collection" />
          </div>
          <Dropdown
            id="subCollection"
            name="subCollection"
            disabled={!mainCollection}
            label={collections.find(c => c._id === subCollection)?.name ?? 'Select sub collection'}
            color="gray"
          >
            {collections
              .filter(c => c.parentCollection?._id === mainCollection)
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
            name="price"
            placeholder="100000"
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="discount" value="Discount" />
          </div>
          <TextInput
            id="discount"
            name="discount"
            placeholder="5"
            type="number"
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
          <TextInput
            id="sku"
            name="sku"
            placeholder="9781782143703"
            type="text"
            value={sku}
            onChange={e => setSku(e.target.value)}
            required
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="vendor" value="Vendor" />
          </div>
          <TextInput
            id="vendor"
            name="vendor"
            placeholder="Anness Publishing"
            type="text"
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
            name="author"
            placeholder="H. Rider Haggard"
            type="text"
            value={author}
            onChange={e => setAuthor}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="format" value="Format" />
          </div>
          <TextInput
            id="format"
            name="format"
            placeholder="Hardback | 256 pages"
            type="text"
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
            name="dimensions"
            placeholder="242 x 309 x 23mm | 1,682.83g"
            type="text"
            value={dimensions}
            onChange={e => setDimensions(e.target.value)}
          />
        </div>

        <div>
          <div className="mb-2 block">
            <Label htmlFor="publish-date" value="Publish date" />
          </div>
          <Datepicker
            id="publishDate"
            name="publishDate"
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
            name="quantity"
            placeholder="1000"
            type="number"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Description" />
        </div>
        <Textarea
          id="description"
          name="description"
          placeholder="Enter product description here"
          rows={4}
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="imageCover" value="Upload cover image" />
        </div>
        <FileInput
          id="imageCover"
          name="imageCover"
          onChange={e => {
            setImageCover(e.target.files[0]);
          }}
        />
      </div>

      <div className="w-full">
        <Button style={{ background: currentColor }} type="submit">
          Edit product
        </Button>
      </div>
    </form>
  );
};

export default EditProductForm;
