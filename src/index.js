import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import en from 'react-intl/locale-data/en';

import App from 'js/App';
import api from 'js/Api';

import 'css/index.css';
import 'css/old.css';

import nbMessages from './translations/nb.json';
import enMessages from './translations/en.json';

const messages = {
  nb: nbMessages,
  en: enMessages,
};

const defaultSprak = 'nb';

addLocaleData([...nb, ...en]);

ReactDOM.render(<IntlProvider locale={defaultSprak} messages={messages[defaultSprak]}>
  <App api={api} />
</IntlProvider>, document.getElementById('app')); // eslint-disable-line
