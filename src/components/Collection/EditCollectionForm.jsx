import React, { useContext, useState } from 'react';
import { Button, Dropdown, Label, TextInput, ToggleSwitch } from 'flowbite-react';

import { Context as StateContext } from '../../contexts/StateContext';
import { Context as CollectionContext } from '../../contexts/CollectionContext';

const EditCollectionForm = ({ collection, removeCurrent, closeModalAfterSubmit }) => {
  const { currentColor } = useContext(StateContext);
  const { collections, updateCollection } = useContext(CollectionContext);

  const [name, setName] = useState(collection.name);
  const [mainCollection, setMainCollection] = useState(collection.mainCollection);
  const [parentCollection, setParentCollection] = useState(collection.parentCollection);

  const handleUpdate = async () => {
    await updateCollection({
      _id: collection._id,
      name,
      mainCollection,
      parentCollection,
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
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit collection</h3>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          name="name"
          placeholder="Type collection name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="mainCollection" value="Main collection" />
        </div>
        <ToggleSwitch
          id="mainCollection"
          name="mainCollection"
          checked={mainCollection}
          onChange={e => {
            setMainCollection(e);
          }}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="parentCollection" value="Parent collection" />
        </div>
        <Dropdown
          id="parentCollection"
          name="parentCollection"
          color="gray"
          disabled={mainCollection}
          label={
            collections.find(c => c._id === parentCollection)?.name ?? 'Select parent collection'
          }
        >
          {collections
            .filter(c => c.mainCollection)
            .map(c => (
              <Dropdown.Item onClick={() => setParentCollection(c._id)}>{c.name}</Dropdown.Item>
            ))}
        </Dropdown>
      </div>

      <div className="w-full">
        <Button style={{ background: currentColor }} type="submit">
          Edit collection
        </Button>
      </div>
    </form>
  );
};

export default EditCollectionForm;
