import React, { useContext, useState } from 'react';
import { Button, Label, TextInput, Textarea } from 'flowbite-react';

import { Context as StateContext } from '../../contexts/StateContext';
import { Context as PostContext } from '../../contexts/PostContext';

const AddPostForm = ({ closeModalAfterSubmit }) => {
  const { currentColor } = useContext(StateContext);
  const { addPost } = useContext(PostContext);

  const [title, setTitle] = useState(undefined);
  const [content, setContent] = useState(undefined);

  const handleCreate = async () => {
    await addPost({
      title,
      content,
    });

    closeModalAfterSubmit();
  };

  return (
    <form
      className="space-y-6"
      onSubmit={e => {
        e.preventDefault();
        handleCreate();
      }}
    >
      <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add post</h3>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="title" value="Title" />
        </div>
        <TextInput
          id="title"
          name="title"
          placeholder="Type post title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="content" value="Content" />
        </div>
        <Textarea
          id="content"
          name="content"
          placeholder="Type post content"
          rows={20}
          value={content}
          onChange={e => setContent(e.target.value)}
          required
        />
      </div>

      <div className="w-full">
        <Button style={{ background: currentColor }} type="submit">
          Add post
        </Button>
      </div>
    </form>
  );
};

export default AddPostForm;
