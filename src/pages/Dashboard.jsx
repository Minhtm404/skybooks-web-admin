import React, { useContext, useEffect } from 'react';
import { Button, Spinner } from 'flowbite-react';
import { BsBoxSeam, BsCurrencyDollar } from 'react-icons/bs';
import { FiBarChart } from 'react-icons/fi';
import { MdOutlineSupervisorAccount } from 'react-icons/md';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as StatsContext } from '../contexts/StatsContext';

const Dashboard = () => {
  const { currentColor } = useContext(StateContext);
  const { stats, getStats, isLoading, setIsLoading } = useContext(StatsContext);

  useEffect(() => {
    if (!stats) {
      setIsLoading(true);
      getStats();
    }
  }, [stats]);

  if (isLoading) {
    return (
      <div className="relative w-full h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (stats) {
    return (
      <div className="mt-24">
        <div className="flex flex-wrap lg:flex-nowrap justify-center ">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-gray-400">Earnings</p>
                <p className="text-2xl">{stats.totalPrice.toLocaleString().concat('₫')}</p>
              </div>
              <button
                type="button"
                style={{ backgroundColor: currentColor }}
                className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-4"
              >
                <BsCurrencyDollar />
              </button>
            </div>
            <div className="mt-6">
              <Button style={{ background: currentColor }}>Download</Button>
            </div>
          </div>
          <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
            <div
              key="Customers"
              className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-2xl md:w-56 p-4 pt-9"
            >
              <button
                type="button"
                style={{ color: '#03c9d7', backgroundColor: '#e5fafb' }}
                className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-4"
              >
                <MdOutlineSupervisorAccount />
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">
                  {stats.totalCustomer.toLocaleString()}
                </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">Customers</p>
            </div>
            <div
              key="Products"
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: '#fff4e5', backgroundColor: '#fec90f' }}
                className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-4"
              >
                <BsBoxSeam />
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{stats.totalProduct.toLocaleString()}</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">Products</p>
            </div>
            <div
              key="Orders"
              className="bg-white h-44 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: '#e46a76', backgroundColor: '#fff4e5' }}
                className="text-2xl opacity-0.9 text-white hover:drop-shadow-xl rounded-full p-4"
              >
                <FiBarChart />
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{stats.totalOrder.toLocaleString()}</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">Orders</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
