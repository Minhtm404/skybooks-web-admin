import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider as StateProvider } from './contexts/StateContext';
import { Provider as AuthProvider } from './contexts/AuthContext';
import { Provider as CollectionProvider } from './contexts/CollectionContext';
import { Provider as ProductProvider } from './contexts/ProductContext';
import './index.css';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <StateProvider>
    <AuthProvider>
      <CollectionProvider>
        <ProductProvider>
          <App />
        </ProductProvider>
      </CollectionProvider>
    </AuthProvider>
  </StateProvider>,
);
