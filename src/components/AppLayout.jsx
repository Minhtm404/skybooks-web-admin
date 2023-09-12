import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { Context as StateContext } from '../contexts/StateContext';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiSettings } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

const AppLayout = () => {
  const {
    currentColor,
    currentMode,
    activeMenu,
    screenSize,
    themeSettings,
    setMode,
    setColor,
    setActiveMenu,
    setScreenSize,
    setThemeSettings
  } = useContext(StateContext);

  return (
    <div className="flex relative dark:bg-main-dark-bg">
      <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
        <TooltipComponent content="Settings" position="Top">
          <button
            type="button"
            className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            style={{ background: 'blue', borderRadius: '50%' }}
          >
            <FiSettings />
          </button>
        </TooltipComponent>
      </div>

      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0 dark:bg-secondary-dark-bg">
          <Sidebar />
        </div>
      )}

      <div
        className={
          activeMenu
            ? 'dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full'
            : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2'
        }
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
          <Navbar />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;