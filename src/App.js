import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Context as StateContext } from './contexts/StateContext';

import {
  Login,
  Dashboard,
  Employees,
  Collections,
  Products,
  Customers,
  Orders,
  PageNotFound,
  Posts,
} from './pages';
import { ProtectedRoute, AppLayout } from './components/index';
import './App.css';

const App = () => {
  const { currentMode } = useContext(StateContext);

  return (
    <div className={currentMode === 'dark' ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/collections" element={<Collections />} />
            <Route path="/products" element={<Products />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/posts" element={<Posts />} />
          </Route>

          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
