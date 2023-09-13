import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Context as AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  if (isAuthenticated) return children;
};

export default ProtectedRoute;
