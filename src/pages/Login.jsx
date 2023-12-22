import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spinner, Toast } from 'flowbite-react';
import { HiExclamation } from 'react-icons/hi';
import { SiSass } from 'react-icons/si';

import { Context as AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, isAuthenticated, isLoading, setIsLoading, error } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(false);
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email || !password) return;

    setIsLoading(true);
    await login({ email, password });

    navigate('/');
  };

  return (
    <div
      className="min-h-screen grid content-center justify-center gap-9 bg-gray-50"
      style={{ 'grid-template-columns': '30rem' }}
    >
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

      <div className="text-center">
        <SiSass className="h-28 w-auto m-auto" />
      </div>

      <h4 className="text-3xl font-semibold text-center">Log in to your account</h4>

      <form
        className="px-10 py-6 bg-white border border-solid border-gray-100 rounded-md overflow-hidden text-sm"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-2 px-0 py-3">
          <label className="font-medium">Email address</label>
          <input
            className="border border-solid border-gray-300 bg-gray-50 rounded-md px-3 py-2 shadow-sm"
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 px-0 py-3">
          <label className="font-medium">Password</label>
          <input
            className="border border-solid border-gray-300 bg-gray-50 rounded-md px-3 py-2 shadow-sm"
            type="password"
            id="password"
            value={password}
            minLength="8"
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 px-0 py-3">
          <button className="border-none rounded-md shadow-sm text-sky-50 bg-sky-600 text-base px-6 py-3 font-medium">
            {!isLoading ? (
              'Login'
            ) : (
              <Spinner aria-label="Alternate spinner button example" size="sm" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
