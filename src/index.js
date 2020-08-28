import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import 'intl';
import './js/Polyfills';
import NavApp from './js/NavApp';
import App from './js/App';
import Api from './js/Api';

import './css/index.css';

import nbMessages from './translations/nb.json';
import enMessages from './translations/en.json';

import { initializeGoogleAnalytics } from './js/utils/GoogleAnalytics';
import BeskjedStoreProvider from './js/context/BeskjedStoreProvider';
import enableHotModuleReplacement from './js/utils/Parcel';

const loadMessages = () => ({
  nb: nbMessages,
  en: enMessages,
});

function renderApp() {
  ReactDOM.render(
    <NavApp defaultSprak="nb" messages={loadMessages()}>
      <BeskjedStoreProvider>
        <App api={Api} />
      </BeskjedStoreProvider>
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
