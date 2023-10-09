import React, { useContext, useEffect, useState } from 'react';
import { Button, Label, TextInput, Dropdown, ToggleSwitch } from 'flowbite-react';

import { Context as StateContext } from '../../contexts/StateContext';
import { Context as CollectionContext } from '../../contexts/CollectionContext';

const AddCollectionForm = ({ closeModalAfterSubmit }) => {
  const { currentColor } = useContext(StateContext);
  const { collections, getAllCollections, addCollection } = useContext(CollectionContext);

  const [name, setName] = useState(undefined);
  const [mainCollection, setMainCollection] = useState(undefined);
  const [parentCollection, setParentCollection] = useState(undefined);

  useEffect(() => {
    getAllCollections();
  }, []);

  const handleUpdate = async () => {
    await addCollection({
      name,
      mainCollection,
      parentCollection,
    });

    closeModalAfterSubmit();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">
        Edit collection
      </h3>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Name" />
        </div>
        <TextInput
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Type collection name"
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="main-collection" value="Main collection" />
        </div>
        <ToggleSwitch
          checked={mainCollection}
          onChange={e => {
            setMainCollection(e);
            console.log(mainCollection);
          }}
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="sub-collection" value="Sub collection" />
        </div>

        <Dropdown
          disabled={mainCollection}
          label={
            collections.find(c => c._id === setParentCollection)?.name ??
            'Select parent collection'
          }
          color="gray"
        >
          {collections
            .filter(c => c.mainCollection)
            .map(collection => (
              <Dropdown.Item onClick={() => setParentCollection(collection._id)}>
                {collection.name}
              </Dropdown.Item>
            ))}
        </Dropdown>
      </div>

      <div className="w-full">
        <Button
          onClick={() => {
            handleUpdate();
          }}
          style={{ background: currentColor }}
        >
          Edit collection
        </Button>
      </div>
    </div>
  );
};

export default AddCollectionForm;
