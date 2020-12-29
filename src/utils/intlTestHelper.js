import React from 'react';
import { IntlProvider } from 'react-intl';
import nbMessages from 'language/nb.json';
global.Intl = require('intl');

const wrapIntl = (children, props = { locale: 'nb' }) => (
  <IntlProvider {...props} messages={nbMessages}>
    {children}
  </IntlProvider>
);

export default wrapIntl;
