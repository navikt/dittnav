import React from 'react';
import ReactDOM from 'react-dom';
import NavApp from 'frontshell';

import App from 'js/App';
import api from 'js/Api';

import 'css/index.css';
import 'css/old.css';

import nbMessages from './translations/nb.json';
import enMessages from './translations/en.json';

const loadMessages = () => ({ nb: nbMessages, en: enMessages });

function renderApp(path) {
  document.body.style.display = 'block';
  ReactDOM.render(<NavApp defaultSprak="nb" messages={loadMessages()}><App api={api} path={path} /></NavApp>, document.getElementById('app'));
}

window.addEventListener('popstate', () => {
  renderApp(window.location.pathname);
});

api.pingDittnavBackend()
  .then(() => renderApp(window.location.pathname))
  .catch((e) => {
    if (e && e.message && e.message === 'Unauthorized') {
      return;
    }
    renderApp(window.location.pathname)
  });
