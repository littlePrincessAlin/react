import React from 'react';
import { createRoot } from 'react-dom/client';
// ssr待添加
// import { hydrateRoot } from 'react-dom/client'
// redux全局注入
import { Provider } from 'react-redux';
import store from 'src/store/index';
import App from './App';

const preloadedState = {}; // window.__PRELOADED_STATE__
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store} serverState={preloadedState}>
      <App />
    </Provider>
  </React.StrictMode>,
);
