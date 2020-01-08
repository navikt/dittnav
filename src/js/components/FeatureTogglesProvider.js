import React, { useState, useEffect } from 'react';
import Config from '../Config';
import features from '../utils/features';

export const FeatureToggles = React.createContext({});

const FeatureTogglesProvider = ({ children }) => {
  const [toggles, setToggles] = useState([]);

  useEffect(() => {
    const URL = `${Config.dittNav.CONTEXT_PATH}/api/feature`;
    const featureString = features.map(f => `feature=${f}`);

    fetch(`${URL}?${featureString.join('&')}`, { method: 'GET' })
      .then(r => r.json())
      .then(response => {
        setToggles(response);
      })
      // eslint-disable-next-line no-console
      .catch(err => console.log(err));
  }, []);

  return (
    <FeatureToggles.Provider value={{ toggles }}>
      {children}
    </FeatureToggles.Provider>
  );
};

export default FeatureTogglesProvider;
