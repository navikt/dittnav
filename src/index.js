import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import 'intl';
import { ReactQueryCacheProvider } from 'react-query';
import NavApp from './js/NavApp';
import App from './js/App';
import Api from './js/Api';

import './css/index.css';

import nbMessages from './translations/nb.json';
import enMessages from './translations/en.json';

import { initializeGoogleAnalytics } from './js/utils/GoogleAnalytics';
import StoreProvider from './js/context/StoreProvider';
import enableHotModuleReplacement from './js/utils/Parcel';
import queryCache from './js/utils/query';

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
