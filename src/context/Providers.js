import React from 'react';
import { node } from 'prop-types';
import { QueryClientProvider } from 'react-query';
import queryClient from '../utils/query';
import StoreProvider from './StoreProvider';
import LanguageProvider from './LanguageProvider';
import FeatureToggleProvider from '../components/FeatureToggles'

const Providers = ({ children }) => (
  <LanguageProvider defaultSprak="nb">
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <FeatureToggleProvider>
          {children}
        </FeatureToggleProvider>
      </StoreProvider>
    </QueryClientProvider>
  </LanguageProvider>
);

Providers.propTypes = {
  children: node.isRequired,
};

export default Providers;
