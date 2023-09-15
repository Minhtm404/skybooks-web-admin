import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context as StateContext } from '../contexts/StateContext';
import { Context as AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { setIsLoading, isLoading } = useContext(StateContext);
  const { localLogin, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    localLogin();

    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
