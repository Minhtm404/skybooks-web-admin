import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react';
import { BsBoxSeam, BsCurrencyDollar } from 'react-icons/bs';
import { FiBarChart } from 'react-icons/fi';
import { MdOutlineSupervisorAccount } from 'react-icons/md';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as AuthContext } from '../contexts/AuthContext';

import { Context as StatsContext } from '../contexts/StatsContext';

import { Pie, SparkLine } from '../components';

const Dashboard = () => {
  const { currentColor } = useContext(StateContext);
  const { user } = useContext(AuthContext);
  const { stats, getStats, isLoading, setIsLoading } = useContext(StatsContext);

  const [range, setRange] = useState('All time');

  const navigate = useNavigate();

  useEffect(() => {
    if (user.role === 'staff') {
      navigate('/collections');
    }
    setIsLoading(true);
    getStats();
  }, []);

  const handleClick = async key => {
    if (key === 'today') {
      setRange('Today');
      setIsLoading(true);
      getStats(key);
    } else if (key === 'last-7-days') {
      setRange('Last 7 days');
      setIsLoading(true);
      getStats(key);
    } else if (key === 'last-month') {
      setRange('Last month');
      setIsLoading(true);
      getStats(key);
    } else {
      setRange('All time');
      setIsLoading(true);
      getStats();
    }
  };

  if (isLoading) {
    return (
      <div className="relative w-full h-screen flex justify-center items-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (stats) {
    return (
      <div className="my-24">
        <div className="flex justify-between items-center mb-4 mx-28">
          <p className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {range}
          </p>

          <Button.Group>
            <Button color="light" onClick={() => handleClick('today')}>
              Today
            </Button>
            <Button color="light" onClick={() => handleClick('last-7-days')}>
              Last 7 Days
            </Button>
            <Button color="light" onClick={() => handleClick('last-month')}>
              Last Month
            </Button>
            <Button color="light" onClick={() => handleClick()}>
              All Time
            </Button>
          </Button.Group>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap justify-center">
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

        <div className="flex gap-10 flex-wrap justify-center">
          <div className=" rounded-2xl md:w-400 p-4 m-3" style={{ backgroundColor: currentColor }}>
            <div className="flex justify-between items-center ">
              <p className="font-semibold text-white text-2xl">Earnings</p>

              <div>
                <p className="text-2xl text-white font-semibold mt-8">
                  {Math.round(
                    stats.orderStats.reduce((sum, month) => sum + month.totalAmount, 0) / 6,
                  )
                    .toLocaleString()
                    .concat('₫')}
                </p>
                <p className="text-gray-200">Monthly revenue</p>
              </div>
            </div>

            <div className="mt-4">
              <SparkLine
                currentColor={currentColor}
                id="column-sparkLine"
                height="100px"
                type="Column"
                data={[
                  {
                    x: 0,
                    xval: '2023-07',
                  },
                  {
                    x: 1,
                    xval: '2023-08',
                  },
                  {
                    x: 2,
                    xval: '2023-09',
                  },
                  {
                    x: 3,
                    xval: '2023-10',
                  },
                  {
                    x: 4,
                    xval: '2023-11',
                  },
                  {
                    x: 5,
                    xval: '2023-12',
                  },
                ].map(item => {
                  item.yval = stats.orderStats.find(m => m.month === item.xval)?.totalAmount ?? 0;

                  return item;
                })}
                width="320"
                color="#f2fcfd"
              />
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg rounded-2xl md:w-400 p-8 m-3 flex justify-center items-center gap-10">
            <div>
              <p className="text-2xl font-semibold">
                {stats.collectionStats.reduce((count, c) => count + c.count, 0)}
              </p>
              <p className="text-gray-400">Products sold</p>
            </div>

            <div className="w-40">
              <Pie
                id="pie-chart"
                data={[{ x: 'Books' }, { x: 'Posters' }, { x: 'Souvenirs' }].map(item => {
                  item.y = stats.collectionStats.find(c => c.collectionName === item.x)?.count ?? 0;
                  item.text = `${(
                    (item.y / stats.collectionStats.reduce((count, c) => count + c.count, 0)) *
                    100
                  ).toFixed(2)}%`;

                  return item;
                })}
                legendVisiblity={false}
                height="160px"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-10 m-4 flex-wrap justify-center">
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
            <div className="flex justify-between items-center gap-2">
              <p className="text-xl font-semibold">Top Performers</p>
            </div>

            <div className="mt-10 w-72 md:w-400">
              {stats.topPerformers.map(item => (
                <div key={item.productName} className="flex justify-between mt-4">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl rounded-lg hover:drop-shadow-xl">
                      <img
                        src={`${item.productImage}/-/scale_crop/300x300/-/format/auto/-/quality/smart_retina/`}
                        alt=""
                        className="w-10 h-10"
                      />
                    </div>
                    <div>
                      <p className="text-md font-semibold">{item.productName}</p>
                      <p className="text-sm text-gray-400">{item.productCollectionName}</p>
                    </div>
                  </div>
                  <p className="text-green-600">{item.totalSold}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg p-6 rounded-2xl">
            <div className="flex justify-between items-center gap-2">
              <p className="text-xl font-semibold">Low Performers</p>
            </div>

            <div className="mt-10 w-72 md:w-400">
              {stats.lowPerformers.map(item => (
                <div key={item.productName} className="flex justify-between mt-4">
                  <div className="flex items-start gap-4">
                    <div className="text-2xl rounded-lg hover:drop-shadow-xl">
                      <img
                        src={`${item.productImage}/-/scale_crop/300x300/-/format/auto/-/quality/smart_retina/`}
                        alt=""
                        className="w-10 h-10"
                      />
                    </div>
                    <div>
                      <p className="text-md font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-400">{item.productCollectionName}</p>
                    </div>
                  </div>
                  <p className="text-red-600">{item.totalSold}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;
