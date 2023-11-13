import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Button } from 'flowbite-react';
import { BsShield } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as AuthContext } from '../contexts/AuthContext';

const UserProfile = ({ closeUserProfile }) => {
  const { currentColor } = useContext(StateContext);

  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    logout();
  };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <button
          type="button"
          onClick={() => closeUserProfile()}
          style={{ color: '#99abb4' }}
          className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray rounded-full"
        >
          <MdOutlineCancel />
        </button>
      </div>

      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <Avatar rounded size="lg" />
        <div>
          <p className="font-semibold text-xl dark:text-gray-200">{user.name}</p>
          <p className="text-gray-500 text-sm dark:text-gray-400">
            {user.role === 'admin' ? 'Administrator' : 'Staff'}
          </p>
          <p className="text-gray-500 text-sm font-semibold dark:text-gray-400">{user.email}</p>
        </div>
      </div>

      <div>
        <NavLink
          to={`/my-profile`}
          onClick={() => closeUserProfile()}
          className="flex gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]"
        >
          <div
            style={{ color: '#00c292', backgroundColor: '#ebfaf2' }}
            className=" text-xl rounded-lg p-3 hover:bg-light-gray"
          >
            <BsShield />
          </div>

          <div>
            <p className="font-semibold dark:text-gray-200 ">My Profile</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">Account Settings</p>
          </div>
        </NavLink>
      </div>

      <div className="mt-5">
        <Button
          onClick={() => {
            handleLogout();
          }}
          style={{ backgroundColor: currentColor }}
          className="w-full"
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
