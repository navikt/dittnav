import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Config from '../Config';

export const FeatureToggles = React.createContext({});

export const FeatureToggleWrapper = ({ toggle, children }) => {
  const { featureToggles } = useContext(FeatureToggles);
  return (
    <>{featureToggles != null
      ? React.cloneElement(children, { isFeatureEnabled: featureToggles[toggle] })
      : React.cloneElement(children, { isFeatureEnabled: false })}
    </>
  );
};

FeatureToggleWrapper.propTypes = {
  toggle: PropTypes.string,
  children: PropTypes.node,
};

FeatureToggleWrapper.defaultProps = {
  toggle: '',
  children: {},
};

const FeatureTogglesProvider = ({ children }) => {
  const [featureToggles, setFeatureToggles] = useState({});

  useEffect(() => {
    const createURL = () => {
      const toggles = Config.dittNav.FEATURE_TOGGLES.split(',');
      const togglePath = toggles.reduce((accumulatedToggles, currentToggle) => `${accumulatedToggles}&feature=${currentToggle}`);
      return `${Config.dittNav.CONTEXT_PATH}/api/feature?feature=${togglePath}`;
    };

    fetch(createURL(), { method: 'GET' })
      .then(r => r.json())
      .then(response => setFeatureToggles(response))
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  }, []);

  return (
    <FeatureToggles.Provider value={{ featureToggles }}>
      {children}
    </FeatureToggles.Provider>
  );
};

FeatureTogglesProvider.propTypes = {
  children: PropTypes.node,
};

FeatureTogglesProvider.defaultProps = {
  children: {},
};

export default FeatureTogglesProvider;
