import { legacy_createStore as createStore } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reducer from './redux/reducer';
import App from './components/app/app';

import './index.css';

const store = createStore(reducer);

window.store = store;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
