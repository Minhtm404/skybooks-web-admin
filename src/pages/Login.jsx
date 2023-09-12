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

      <form className="px-8 py-14 bg-white border border-solid border-gray-100 rounded-md">
        <div className="flex flex-col gap-2 px-4 py-0">
          <label className="font-medium">
            Email address
            <input
              className="border border-solid border-gray-300 bg-gray-50 rounded-sm px-3 py-4 shadow-sm"
              type="email"
              id="email"
            />
          </label>

          <label className="font-medium">
            Password
            <input
              className="border border-solid border-gray-300 bg-gray-50 rounded-sm px-3 py-4 shadow-sm"
              type="password"
              id="password"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default Login;
