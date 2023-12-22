import React, { useContext, useEffect, useState } from 'react';
import { Button, Table, Modal, Label, TextInput, Spinner, Toast, Pagination } from 'flowbite-react';
import { BiEdit } from 'react-icons/bi';
import { HiExclamation, HiOutlineExclamationCircle } from 'react-icons/hi';
import { RiDeleteBin6Line } from 'react-icons/ri';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as PostContext } from '../contexts/PostContext';

import { POST_COLUMNS } from '../constants';

import { AddPostForm, EditPostForm, Header } from '../components';

const Posts = () => {
  const { currentColor } = useContext(StateContext);
  const { posts, totalPosts, getAllPosts, deletePost, isLoading, setIsLoading, error } =
    useContext(PostContext);

  const [openAddPostModal, setOpenAddPostModal] = useState(false);
  const [openUpdatePostModal, setOpenUpdatePostModal] = useState(false);
  const [openDeletePostModal, setOpenDeletePostModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [keyword, setKeyword] = useState('');
  const [currentPost, setCurrentPost] = useState(undefined);

  useEffect(() => {
    setIsLoading(true);
    getAllPosts({ keyword, page: currentPage, limit: 5 });
  }, [currentPage, totalPosts, openUpdatePostModal]);

  const handleOpenUpdateModal = post => {
    setCurrentPost(post);
    setOpenUpdatePostModal(true);
  };

  const handleOpenDeleteModal = post => {
    setCurrentPost(post);
    setOpenDeletePostModal(true);
  };

  const handleDelete = async () => {
    await deletePost(currentPost);
    setOpenDeletePostModal(false);
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (posts) {
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-gray-800 dark:border-gray-700">
        {error ? (
          <Toast className="absolute top-4 left-4">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{error}</div>
            <Toast.Toggle />
          </Toast>
        ) : (
          <></>
        )}

        <Header title="Posts" />

        <div class="p-4 bg-white block sm:flex Dropdown.Items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
          <div class="w-full mb-1">
            <div class="Dropdown.Items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700">
              <div class="flex Dropdown.Items-center mb-4 sm:mb-0">
                <Label htmlFor="Posts-search" className="sr-only" />
                <div class="relative w-48 mt-1 sm:w-64 xl:w-96">
                  <TextInput
                    id="posts-search"
                    name="posts-search"
                    placeholder="Search by title or creator"
                    type="search"
                    value={keyword}
                    onChange={e => {
                      setKeyword(e.target.value);
                      setCurrentPage(1);
                      getAllPosts({ keyword: e.target.value, page: 1, limit: 5 });
                    }}
                  />
                </div>
              </div>

              <Button
                style={{ background: currentColor }}
                onClick={() => setOpenAddPostModal(true)}
              >
                Add new post
              </Button>
            </div>
          </div>
        </div>

        <Table hoverable>
          <Table.Head>
            {POST_COLUMNS.map(column => (
              <Table.HeadCell>{column.headerText}</Table.HeadCell>
            ))}
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
          </Table.Head>

          <Table.Body className="divide-y">
            {posts.map(post => (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {post._id}
                </Table.Cell>
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  <img
                    src={`${post.imageCover}/-/scale_crop/300x300/-/format/auto/-/quality/smart_retina/`}
                    alt=""
                  />
                </Table.Cell>
                <Table.Cell>{post.title}</Table.Cell>
                <Table.Cell>{post.user.name}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button
                      size="sm"
                      style={{ background: currentColor }}
                      onClick={() => handleOpenUpdateModal(post)}
                    >
                      <BiEdit className="mr-2" />
                      Update
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-700"
                      onClick={() => handleOpenDeleteModal(post)}
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

        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalPosts / 5)}
            onPageChange={page => setCurrentPage(page)}
            showIcons
          />
        </div>

        <Modal
          dismissible
          popup
          show={openAddPostModal === true}
          size="2xl"
          onClose={() => setOpenAddPostModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <AddPostForm closeModalAfterSubmit={() => setOpenAddPostModal(false)} />
          </Modal.Body>
        </Modal>

        <Modal
          dismissible
          popup
          show={openUpdatePostModal === true}
          size="2xl"
          onClose={() => setOpenUpdatePostModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <EditPostForm
              post={currentPost}
              closeModalAfterSubmit={() => setOpenUpdatePostModal(false)}
            />
          </Modal.Body>
        </Modal>

        <Modal
          dismissible
          popup
          show={openDeletePostModal === true}
          size="md"
          onClose={() => setOpenDeletePostModal(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this post?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={() => handleDelete()}>
                  Yes, I'm sure
                </Button>
                <Button color="gray" onClick={() => setOpenDeletePostModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
};

export default Posts;
