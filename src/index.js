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
import HendelserTestGui from './js/components/testgui/HendelserTestGui';

const loadMessages = () => ({
  nb: nbMessages,
  en: enMessages,
});

function renderApp() {
  ReactDOM.render(
    <NavApp defaultSprak="nb" messages={loadMessages()}>
      <App api={api} />
    </NavApp>,
    document.getElementById('app'),
  );
}

function handleAuthError(e) {
  if (e.message === 'not authenticated') {
    api.redirectToLogin();
    return;
  }
  // eslint-disable-next-line no-console
  console.log(`Error: Authentication could not be verified. ${e}`);

  api.checkApiStatus()
    .then(() => renderApp())
    .catch(e2 => {
      if (e2.status === 401) {
        api.redirectToLogin();
      } else {
        // eslint-disable-next-line no-console
        console.log(`Error: Could not retrieve API data. App will not render. ${e2}`);
      }
    });
}

const params = new URLSearchParams(window.location.search);

if (params.has('hendelser') && Config.ENVIRONMENT !== 'PROD') {
  ReactDOM.render(
    <NavApp defaultSprak="nb" messages={loadMessages()}>
      <div className="hendelser-content">
        <HendelserTestGui />
      </div>
    </NavApp>,
    document.getElementById('app'),
  );
} else {
  api.checkAuth()
    .then(() => renderApp())
    .catch((e) => {
      if (Config.ENVIRONMENT === 'local') {
        renderApp();
        return;
      }

      handleAuthError(e);
    });
}
