import React, { useContext, useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Context as StateContext } from './contexts/StateContext';
import {
  ProtectedRoute,
  AppLayout,
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings,
} from './components/index';
import {
  Login,
  Dashboard,
  Employees,
  Collections,
  Products,
  Customers,
  Orders,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorMapping,
  Pyramid,
  Stacked,
  PageNotFound,
} from './pages';
import './App.css';

const App = () => {
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
    setThemeSettings,
  } = useContext(StateContext);

  return (
    <div className={currentMode === 'dark' ? 'dark' : ''}>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />

          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="collections" element={<Collections />} />
            <Route path="products" element={<Products />} />
            <Route path="customers" element={<Customers />} />
            <Route path="orders" element={<Orders />} />

            <Route path="line" element={<Line />} />
            <Route path="area" element={<Area />} />
            <Route path="bar" element={<Bar />} />
            <Route path="pie" element={<Pie />} />
            <Route path="financial" element={<Financial />} />
            <Route path="color-mapping" element={<ColorMapping />} />
            <Route path="pyramid" element={<Pyramid />} />
            <Route path="stacked" element={<Stacked />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
