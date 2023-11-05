import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SiSass } from 'react-icons/si';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as AuthContext } from '../contexts/AuthContext';

import { MiniSpinner } from '../components/index';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setIsLoading, isLoading } = useContext(StateContext);
  const { login, isAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email || !password) return;

    setIsLoading(true);

    await login({ email, password });

    setIsLoading(false);

    navigate('/');
  };

  return (
    <div
      className="min-h-screen grid content-center justify-center gap-9 bg-gray-50"
      style={{ 'grid-template-columns': '30rem' }}
    >
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
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 px-0 py-3">
          <button className="border-none rounded-md shadow-sm text-sky-50 bg-sky-600 text-base px-6 py-3 font-medium">
            {!isLoading ? 'Login' : <MiniSpinner />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
