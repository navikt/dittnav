import React from 'react';
import { node, string } from 'prop-types';
import { IntlProvider } from 'react-intl';
import nbMessages from '../language/nb.json';
import enMessages from '../language/en.json';

const loadMessages = (sprak) => ({
  nb: nbMessages,
  en: enMessages,
}[sprak]);

const LanguageProvider = ({ defaultSprak, children }) => (
  <IntlProvider locale={defaultSprak} messages={loadMessages(defaultSprak)}>
    {children}
  </IntlProvider>
);

LanguageProvider.propTypes = {
  defaultSprak: string.isRequired,
  children: node.isRequired,
};

export default LanguageProvider;
