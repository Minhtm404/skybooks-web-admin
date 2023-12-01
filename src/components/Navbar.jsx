import React, { useContext, useEffect, useState } from 'react';
import { Avatar } from 'flowbite-react';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as AuthContext } from '../contexts/AuthContext';

import UserProfile from '../components/UserProfile';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => {
  return (
    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={() => customFunc()}
        style={{ color }}
        className="relative text-xl rounded-full p-3 hover:bg-light-gray"
      >
        <span
          style={{ background: dotColor }}
          className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
        />
        {icon}
      </button>
    </TooltipComponent>
  );
};

const Navbar = () => {
  const { currentColor, activeMenu, screenSize, setActiveMenu, setScreenSize } =
    useContext(StateContext);

  const { user } = useContext(AuthContext);

  const [openUserProfile, setOpenUserProfile] = useState(false);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative print:hidden">
      <NavButton
        title="Menu"
        customFunc={() => {
          setActiveMenu(!activeMenu);
        }}
        icon={<AiOutlineMenu />}
        color={currentColor}
      />
      <div className="flex">
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => setOpenUserProfile(true)}
          >
            <Avatar rounded size="sm" />
            <p>
              <span className="text-gray-400 text-14">Hi,</span>
              <span className="text-gray-400 font-semibold ml-1 text-14">{user.name}</span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {openUserProfile && <UserProfile closeUserProfile={() => setOpenUserProfile(false)} />}
      </div>
    </div>
  );
};

export default Navbar;
