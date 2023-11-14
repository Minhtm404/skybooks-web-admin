import React, { useContext, useState } from 'react';
import { Button, Label, Spinner, TextInput, Toast } from 'flowbite-react';
import { HiExclamation } from 'react-icons/hi';

import { Context as AuthContext } from '../contexts/AuthContext';

const UserProfile = () => {
  const { user, updateMe, updatePassword, isLoading, setIsLoading, error } =
    useContext(AuthContext);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [passwordCurrent, setPasswordCurrent] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [passwordConfirm, setPasswordConfirm] = useState(undefined);

  const handleUpdateData = async () => {
    setIsLoading(true);
    await updateMe({ name, email });
    setName(user.name);
    setEmail(user.email);
  };

  const handleUpdatePassword = async () => {
    setIsLoading(true);
    await updatePassword({ passwordCurrent, password, passwordConfirm });
    setPasswordCurrent(undefined);
    setPassword(undefined);
    setPasswordConfirm(undefined);
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (user) {
    return (
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10">
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

        <div className="flex flex-wrap justify-center gap-1">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-xl w-full p-16 pt-16 m-6">
            <form className="space-y-6" onSubmit={handleUpdateData}>
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                Update user data
              </h3>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Your name" />
                </div>
                <TextInput
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="md:w-1/2 sm:w-full"
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
                  className="md:w-1/2 sm:w-full"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-row justify-end">
                <Button type="submit" className="self-end">
                  Update data
                </Button>
              </div>
            </form>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-xl w-full p-16 pt-16 m-6">
            <form className="space-y-6" onSubmit={handleUpdatePassword}>
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white">
                Update password
              </h3>

              <div>
                <div className="mb-2 block">
                  <Label htmlFor="currentPassword" value="Current pasword" />
                </div>
                <TextInput
                  id="currentPassword"
                  type="password"
                  placeholder="Enter your current password"
                  className="md:w-1/2 sm:w-full"
                  value={passwordCurrent}
                  onChange={e => setPasswordCurrent(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="newPassword" value="New password" />
                </div>
                <TextInput
                  id="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  className="md:w-1/2 sm:w-full"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="confirmPassword" value="Confirm password" />
                </div>
                <TextInput
                  id="confirmPassword"
                  type="password"
                  placeholder="Enter your confirm password"
                  className="md:w-1/2 sm:w-full"
                  value={passwordConfirm}
                  onChange={e => setPasswordConfirm(e.target.value)}
                  required
                />
              </div>

              <div className="flex flex-row justify-end">
                <Button type="submit">Update password</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default UserProfile;
