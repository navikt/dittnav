import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import 'intl';
import './css/index.css';
import App from './App';
import { checkAuth, checkApiStatus, redirectToLogin } from './Api';
import { initializeAmplitude } from './utils/amplitudeUtils';
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

initializeAmplitude();
enableHotModuleReplacement();
checkAuthThenRenderApp();
