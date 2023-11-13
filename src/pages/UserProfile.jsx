import React, { useContext } from 'react';
import { Spinner } from 'flowbite-react';

import { Context as AuthContext } from '../contexts/AuthContext';

import { Header } from '../components';

const UserProfile = () => {
  const { user, isLoading } = useContext(AuthContext);

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
      </div>
    );
  }
};

export default UserProfile;
