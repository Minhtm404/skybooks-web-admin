import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider as StateProvider } from './contexts/StateContext';
import { Provider as AuthProvider } from './contexts/AuthContext';
import { Provider as EmployeeProvider } from './contexts/EmployeeContext';
import { Provider as CollectionProvider } from './contexts/CollectionContext';
import { Provider as ProductProvider } from './contexts/ProductContext';
import { Provider as CustomerProvider } from './contexts/CustomerContext';
import { Provider as OrderProvider } from './contexts/OrderContext';
import { Provider as StatsProvider } from './contexts/StatsContext';

import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <StateProvider>
    <AuthProvider>
      <EmployeeProvider>
        <CollectionProvider>
          <ProductProvider>
            <CustomerProvider>
              <OrderProvider>
                <StatsProvider>
                  <App />
                </StatsProvider>
              </OrderProvider>
            </CustomerProvider>
          </ProductProvider>
        </CollectionProvider>
      </EmployeeProvider>
    </AuthProvider>
  </StateProvider>,
);
