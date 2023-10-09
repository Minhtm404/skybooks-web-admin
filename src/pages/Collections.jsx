import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, Modal, Label, TextInput } from 'flowbite-react';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as CollectionContext } from '../contexts/CollectionContext';

import { Header, AddCollectionForm, EditCollectionForm } from '../components';

import { COLLECTIONS_COLUMNS } from '../constants';

const Collections = () => {
  const { currentColor } = useContext(StateContext);
  const { collections, getAllCollections, deleteCollection } =
    useContext(CollectionContext);

  const [openAddCollectionModal, setOpenAddCollectionModal] = useState(false);
  const [openUpdateCollectionModal, setOpenUpdateCollectionModal] = useState(false);
  const [openDeleteCollectionModal, setOpenDeleteCollectionModal] = useState(false);

  const [currentCollection, setCurrentCollection] = useState({});

  useEffect(() => {
    getAllCollections();
  }, []);

  const handleOpenUpdateModal = collection => {
    setCurrentCollection(collection);
    setOpenUpdateCollectionModal(true);
  };

  const handleOpenDeleteModal = collection => {
    setCurrentCollection(collection);
    setOpenDeleteCollectionModal(true);
  };

  const handleDelete = async () => {
    await deleteCollection(currentCollection);
    setOpenDeleteCollectionModal(false);
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header title="Collections" />

      <div class="p-4 bg-white block sm:flex Dropdown.Items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
        <div class="w-full mb-1">
          <div class="Dropdown.Items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
            <div class="flex Dropdown.Items-center mb-4 sm:mb-0">
              <Label htmlFor="collections-search" className="sr-only" />
              <div class="relative w-48 mt-1 sm:w-64 xl:w-96">
                <TextInput
                  name="collections-search"
                  id="collections-search"
                  placeholder="Search for collections"
                />
              </div>
            </div>

            <Button
              onClick={() => setOpenAddCollectionModal(true)}
              style={{ background: currentColor }}
            >
              Add new collection
            </Button>
          </div>
        </div>
      </div>
      <Table hoverable>
        <Table.Head>
          {COLLECTIONS_COLUMNS.map(column => (
            <Table.HeadCell>{column.headerText}</Table.HeadCell>
          ))}
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y">
          {collections.map(collection => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {collection._id}
              </Table.Cell>
              <Table.Cell>
                {collection.name.length > 30
                  ? collection.name.slice(0, 30).concat('...')
                  : collection.name}
              </Table.Cell>
              <Table.Cell>{collection.mainCollection === true ? 'Yes' : 'No'}</Table.Cell>
              <Table.Cell>
                {collections.find(c => c._id === collection.parentCollection)?.name}
              </Table.Cell>
              <Table.Cell>{collection.price}</Table.Cell>
              <Table.Cell>
                <Button.Group>
                  <Button
                    onClick={() => handleOpenUpdateModal(collection)}
                    style={{ background: currentColor }}
                    size="sm"
                  >
                    <BiEdit className="mr-2" />
                    Update
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteModal(collection)}
                    size="sm"
                    className="bg-red-700"
                  >
                    <RiDeleteBin6Line className="mr-2" />
                    Delete
                  </Button>
                </Button.Group>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Modal
        dismissible
        show={openAddCollectionModal === true}
        size="2xl"
        popup
        onClose={() => setOpenAddCollectionModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <AddCollectionForm
            closeModalAfterSubmit={() => setOpenAddCollectionModal(false)}
          />
        </Modal.Body>
      </Modal>

      <Modal
        dismissible
        show={openUpdateCollectionModal === true}
        size="2xl"
        popup
        onClose={() => setOpenUpdateCollectionModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <EditCollectionForm
            collection={currentCollection}
            closeModalAfterSubmit={() => setOpenUpdateCollectionModal(false)}
          />
        </Modal.Body>
      </Modal>

      <Modal
        dismissible
        show={openDeleteCollectionModal === true}
        size="md"
        popup
        onClose={() => setOpenUpdateCollectionModal(false)}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this collection?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => handleDelete()}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpenDeleteCollectionModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Collections;
