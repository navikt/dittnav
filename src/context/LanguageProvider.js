import React from 'react';
import { any, node, objectOf, shape, string } from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import nb from 'react-intl/locale-data/nb';
import en from 'react-intl/locale-data/en';
import nn from 'react-intl/locale-data/nn';

addLocaleData([...nb, ...en, ...nn]);

const LanguageProvider = ({ defaultSprak, messages, children }) => (
  <IntlProvider locale={defaultSprak} messages={messages[defaultSprak]}>
    {children}
  </IntlProvider>
);

LanguageProvider.propTypes = {
  defaultSprak: string.isRequired,
  messages: shape({
    nb: objectOf(any),
    en: objectOf(any),
  }).isRequired,
  children: node.isRequired,
};

export default LanguageProvider;
