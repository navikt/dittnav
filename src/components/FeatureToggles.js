import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Path, Toggle } from '../constants';

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
  // const loaded = false;
  // const featureToggles = {};
  /*
  TODO: Utkommentert i påvente av at vi skriver vår egen unleash-toggle-provider istedenfor å bruke Unleash gjennom pus-dekoratør.
  */
  const [featureToggles, setFeatureToggles] = useState({});
  const [loaded, setLoaded] = useState(false);

  const UNLEASH_TIMEOUT = 1000;

  useEffect(() => {
    const createURL = () => {
      const toggles = Toggle.FEATURE_TOGGLES.split(',');
      const togglePath = toggles.reduce((accumulatedToggles, currentToggle) => `${accumulatedToggles}&feature=${currentToggle}`);
      return `${Path.CONTEXT}/api/feature?feature=${togglePath}`;
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
