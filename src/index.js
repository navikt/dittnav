import 'core-js/stable';
import 'regenerator-runtime/runtime';

import React from 'react';
import ReactDOM from 'react-dom';
import 'intl';
import NavApp from './js/NavApp';
import Config from './js/globalConfig';
import enableHotModuleReplacement from './js/utils/Parcel';
import App from './js/App';
import Api from './js/Api';

import './css/index.css';

import nbMessages from './translations/nb.json';
import enMessages from './translations/en.json';

const loadMessages = () => ({
  nb: nbMessages,
  en: enMessages,
});

function renderApp() {
  ReactDOM.render(
    <NavApp defaultSprak="nb" messages={loadMessages()}>
      <App api={Api} />
    </NavApp>, document.getElementById('app'),
  );
}

const checkAuthThenRenderApp = () => {
  Api.checkAuth()
    .then(() => Api.checkApiStatus())
    .then(() => renderApp())
    .catch((e) => {
      if (Config.IS_DEV) {
        renderApp();
        return;
      }
      if (e.message === 'not authenticated') {
        Api.redirectToLogin();
        return;
      }
      if (e.status === 401) {
        Api.redirectToLogin();
        return;
      }
      console.log(`Unexpected backend error, some page content may be unavailable: ${e}`);
      renderApp();
    });
};

enableHotModuleReplacement();
checkAuthThenRenderApp();
