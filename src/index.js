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
  ReactDOM.render(<NavApp defaultSprak="nb" messages={loadMessages()}><App api={api} /></NavApp>, document.getElementById('app'));
}

api.checkAuth()
  .then(() => renderApp())
  .catch((e) => {
    if (Config.ENVIRONMENT === 'local') {
      renderApp();
      return;
    }

    if (e.message === 'not authenticated') {
      api.redirectToLogin();
    } else {
      // eslint-disable-next-line no-console
      console.log(`Error: Authentication could not be verified. ${e}`);
      // TODO: Hva bør gjøres her, dersom innloggingslinje feiler?!
    }
  });
