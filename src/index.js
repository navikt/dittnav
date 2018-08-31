import React from 'react';
import ReactDOM from 'react-dom';
import NavApp from 'frontshell';

import App from 'js/App';
import api from 'js/Api';

import 'css/index.css';
import 'css/old.css';

import nbMessages from './translations/nb.json';
import enMessages from './translations/en.json';

const loadMessages = () => {
  return {
    nb: nbMessages,
    en: enMessages,
  };
};

ReactDOM.render(<NavApp defaultSprak='nb' loadMessages={loadMessages}><App api={api} /></NavApp>, document.getElementById('app'));
