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
  const [loaded, setLoaded] = useState(false);

  const UNLEASH_TIMEOUT = 1000;

  useEffect(() => {
    const createURL = () => {
      const toggles = Config.dittNav.FEATURE_TOGGLES.split(',');
      const togglePath = toggles.reduce((accumulatedToggles, currentToggle) => `${accumulatedToggles}&feature=${currentToggle}`);
      return `${Config.dittNav.CONTEXT_PATH}/api/feature?feature=${togglePath}`;
    };

    Promise.race([
      fetch(createURL(), { method: 'GET' })
        .then(r => r.json()),
      new Promise((_, reject) => setTimeout(() => {
        const message = `Couldnt wait for unleash longer than ${UNLEASH_TIMEOUT} msec`;
        return reject(new Error(message));
      }, UNLEASH_TIMEOUT))])
      .then(response => setFeatureToggles(response))
      .catch(err => {
        // eslint-disable-next-line no-console
        console.log(err);
      })
      .finally(() => setLoaded(true));
  }, []);

  if (loaded) {
    return (
      <FeatureToggles.Provider value={{ featureToggles }}>
        {children}
      </FeatureToggles.Provider>
    );
  } return null;
};

FeatureTogglesProvider.propTypes = {
  children: PropTypes.node,
};

FeatureTogglesProvider.defaultProps = {
  children: {},
};

export default FeatureTogglesProvider;
