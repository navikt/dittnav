import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import 'intl';
import App from './App';
import Api from './Api';
import './css/index.css';
import { initializeGoogleAnalytics } from './utils/googleAnalytics';
import enableHotModuleReplacement from './utils/parcel';
import Providers from './context/Providers';

function renderApp() {
  ReactDOM.render(
    <Providers>
      <App />
    </Providers>, document.getElementById('app'),
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
