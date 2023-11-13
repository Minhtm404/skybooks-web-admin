import React, { useContext, useState } from 'react';
import { Button, Label, Spinner, TextInput } from 'flowbite-react';

import { Context as AuthContext } from '../contexts/AuthContext';

import { Header } from '../components';

const UserProfile = () => {
  const { user, isLoading } = useContext(AuthContext);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  if (isLoading) {
    return (
      <div className="relative w-full h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl dark:bg-gray-800 dark:border-gray-700">
        <Header title="User Profile" />

        <div>
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Your name" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email" value="Your email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit">Update data</Button>
          </form>
        </div>
      </div>
    );
  }
};

export default UserProfile;
