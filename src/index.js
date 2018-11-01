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
  ReactDOM.render(<NavApp defaultSprak="nb" messages={loadMessages()}><App api={api} path={path} /></NavApp>, document.getElementById('app'));
}

window.addEventListener('popstate', () => {
  renderApp(window.location.pathname);
});

renderApp(window.location.pathname);
