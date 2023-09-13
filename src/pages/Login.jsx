import React from 'react';
import { SiSass } from 'react-icons/si';

const Login = () => {
  return (
    <div
      className="min-h-screen grid content-center justify-center gap-9 bg-gray-50"
      style={{ 'grid-template-columns': '30rem' }}
    >
      <div className="text-center">
        <SiSass className="h-36 w-auto m-auto" />
      </div>

      <h4 className="text-4xl font-semibold text-center">Log in to your account</h4>

      <form className="px-14 py-8 bg-white border border-solid border-gray-100 rounded-md overflow-hidden text-xl">
        <div className="flex flex-col gap-2 px-0 py-4">
          <label className="font-medium">Email address</label>
          <input
            className="border border-solid border-gray-300 bg-gray-50 rounded-md px-4 py-3 shadow-sm"
            type="email"
            id="email"
          />
        </div>

        <div className="flex flex-col gap-2 px-0 py-4">
          <label className="font-medium">Password</label>
          <input
            className="border border-solid border-gray-300 bg-gray-50 rounded-md px-4 py-3 shadow-sm"
            type="password"
            id="password"
          />
        </div>

        <div className="flex flex-col gap-2 px-0 py-4">
          <button className="border-none rounded-md shadow-sm text-sky-50 bg-sky-600 text-2xl px-9 py-4 font-medium">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
