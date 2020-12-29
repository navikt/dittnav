import React from 'react';
import { node } from 'prop-types';
import { QueryClientProvider } from 'react-query';
import queryClient from '../utils/query';
import StoreProvider from './StoreProvider';
import LanguageProvider from './LanguageProvider';

import nbMessages from '../language/nb.json';
import enMessages from '../language/en.json';

const loadMessages = () => ({
  nb: nbMessages,
  en: enMessages,
});

const Providers = ({ children }) => (
  <LanguageProvider defaultSprak="nb" messages={loadMessages()}>
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        {children}
      </StoreProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

Providers.propTypes = {
  children: node.isRequired,
};

export default Providers;
