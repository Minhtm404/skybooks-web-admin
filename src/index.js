import React from 'react';
import { createRoot } from 'react-dom/client';

import { Provider as StateProvider } from './contexts/StateContext';
import { Provider as CollectionContext } from './contexts/CollectionContext';
import './index.css';
import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
  <StateProvider>
    <CollectionContext>
      <App />
    </CollectionContext>
  </StateProvider>
);
