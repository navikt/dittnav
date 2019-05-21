import React from 'react';
import ReactDOM from 'react-dom';
import NavApp from 'frontshell';
import LoginWrapper from 'js/components/LoginWrapper';
import conf from 'js/Config';

import App from 'js/App';
import api from 'js/Api';

import 'css/index.css';
import 'css/old.css';

import nbMessages from './translations/nb.json';
import enMessages from './translations/en.json';

const loadMessages = () => ({ nb: nbMessages, en: enMessages });
const loginPath = `${conf.dittNav.CONTEXT_PATH}/login`;

function renderApp(path) {
  ReactDOM.render(<NavApp defaultSprak="nb" messages={loadMessages()}>{path === loginPath ? <LoginWrapper /> : <App api={api} path={path} />}</NavApp>, document.getElementById('app'));
}

api.checkAuth()
  .then(() => renderApp(window.location.pathname))
  .catch((e) => {
    if (e && e.message && e.message === 'Unauthorized') {
      return;
    }
    renderApp(window.location.pathname);
  });
