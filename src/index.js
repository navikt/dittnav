import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import 'intl';
import { ReactQueryCacheProvider } from 'react-query';
import NavApp from './NavApp';
import App from './App';
import Api from './Api';

import './css/index.css';

import nbMessages from './language/nb.json';
import enMessages from './language/en.json';

import { initializeGoogleAnalytics } from './utils/googleAnalytics';
import StoreProvider from './context/StoreProvider';
import enableHotModuleReplacement from './utils/parcel';
import queryCache from './utils/query';

const loadMessages = () => ({
  nb: nbMessages,
  en: enMessages,
});

function renderApp() {
  ReactDOM.render(
    <NavApp defaultSprak="nb" messages={loadMessages()}>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <StoreProvider>
          <App />
        </StoreProvider>
      </ReactQueryCacheProvider>
    </NavApp>, document.getElementById('app'),
  );
}

const checkAuthThenRenderApp = () => {
  Api.checkAuth()
    .then(() => Api.checkApiStatus())
    .then(() => renderApp())
    .catch((e) => {
      if (e.message === 'not authenticated') {
        Api.redirectToLogin();
        return;
      }
      if (e.status === 401) {
        Api.redirectToLogin();
        return;
      }
      renderApp();
    });
};

initializeGoogleAnalytics();
enableHotModuleReplacement();
checkAuthThenRenderApp();
