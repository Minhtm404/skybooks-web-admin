import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel } from 'react-icons/md';
import { SiSass } from 'react-icons/si';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as AuthContext } from '../contexts/AuthContext';

import { LINKS } from '../constants';

const Sidebar = () => {
  const { currentColor, activeMenu, screenSize, setActiveMenu } = useContext(StateContext);
  const { user } = useContext(AuthContext);

  const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <SiSass /> <span>Skybooks</span>
            </Link>
            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={handleCloseSideBar}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-10">
            {LINKS.map(link => {
              if (user.role !== 'staff' || link.staff) {
                return (
                  <NavLink
                    to={`/${link.name !== 'dashboard' ? link.name : ''}`}
                    key={link.name}
                    onClick={!link.staff ? handleCloseSideBar : () => {}}
                    style={({ isActive }) => ({
                      background: isActive ? currentColor : '',
                    })}
                    className={({ isActive }) => (isActive ? activeLink : normalLink)}
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                );
              }

              return <></>;
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
