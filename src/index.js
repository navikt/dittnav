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
    </NavApp>, document.getElementById('app'),
  );
}

const checkAuthThenRenderApp = () => {
  api.checkAuth()
    .then(() => api.checkApiStatus())
    .then(() => renderApp())
    .catch((e) => {
      if (Config.ENVIRONMENT === 'local') {
        renderApp();
        return;
      }
      if (e.message === 'not authenticated') {
        api.redirectToLogin();
        return;
      }
      if (e.status === 401) {
        api.redirectToLogin();
        return;
      }

      console.log(`Unexpected backend error, some page content may be unavailable: ${e}`);
      renderApp();
    });
};

const params = new URLSearchParams(window.location.search);

if (params.has('hendelser') && Config.IS_DEV) {
  const testApp = (
    <NavApp defaultSprak="nb" messages={loadMessages()}>
      <div className="hendelser-content">
        <HendelserTestGui />
      </div>
    </NavApp>
  );

  api.checkAuth()
    .then(() => {
      ReactDOM.render(testApp, document.getElementById('app'));
    })
    .catch((e) => {
      if (Config.ENVIRONMENT === 'local') {
        ReactDOM.render(testApp, document.getElementById('app'));
        return;
      }
      if (e.message === 'not authenticated') {
        api.redirectToLogin();
      }
    });
} else {
  checkAuthThenRenderApp();
}
