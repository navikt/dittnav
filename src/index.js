import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import 'intl';
//import './css/index.css';
import './less/index.less';
import App from './App';
import { checkAuth, checkApiStatus, redirectToLogin } from './Api';
import { initializeAmplitude } from './utils/amplitudeUtils';
import { initializeSentry } from './utils/logger';
import enableHotModuleReplacement from './utils/parcel';
import Providers from './context/Providers';
import './utils/polyfills';

function renderApp() {
  ReactDOM.render(
    <Providers>
      <App />
    </Providers>, document.getElementById('app'),
  );
}

const checkAuthThenRenderApp = () => {
  checkAuth()
    .then(() => checkApiStatus())
    .then(() => renderApp())
    .catch((e) => {
      if (e.message === 'not authenticated') {
        redirectToLogin();
        return;
      }
      if (e.status === 401) {
        redirectToLogin();
        return;
      }
      renderApp();
    });
};

if (window.env.IS_PROD) {
  initializeSentry();
  initializeAmplitude();
}

enableHotModuleReplacement();
checkAuthThenRenderApp();
