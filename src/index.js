import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import 'intl';
import NavApp from './js/NavApp';

import Config from './js/Config';
import App from './js/App';
import api from './js/Api';

import './css/index.css';

import nbMessages from './translations/nb.json';
import enMessages from './translations/en.json';

const loadMessages = () => ({ nb: nbMessages, en: enMessages });

function renderApp() {
  ReactDOM.render(
    <NavApp defaultSprak="nb" messages={loadMessages()}>
      <App api={api} />
    </NavApp>, document.getElementById('app'),
  );
}

const checkAuthThenRenderApp = () => {
  console.log('Checking auth service status...');
  api.checkAuth()
    .then(() => {
      console.log('Checking backend access...');
      return api.checkApiStatus();
    })
    .then(() => {
      console.log('All auth checks passed, rendering app');
      renderApp();
    })
    .catch((e) => {
      if (Config.ENVIRONMENT === 'local') {
        console.log('Errors caught, rendering anyway in local environment');
        renderApp();
        return;
      }
      if (e.message === 'not authenticated') {
        console.log('Not logged in, redirecting to login service');
        api.redirectToLogin();
        return;
      }
      if (e.status === 401) {
        console.log('Backend auth error, redirecting to login service');
        api.redirectToLogin();
        return;
      }

      console.log(`Unexpected backend error, some page content may be unavailable: ${e}`);
      renderApp();
    });
};

checkAuthThenRenderApp();
