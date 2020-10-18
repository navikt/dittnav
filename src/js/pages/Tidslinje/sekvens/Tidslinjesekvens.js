import React from 'react';
import { string } from 'prop-types';
import Sekvens from './Sekvens';
import SekvensMedIkon from './SekvensMedIkon';

const components = (type) => ({
  sekvens: Sekvens,
  sekvensMedIkon: SekvensMedIkon,
}[type]);

const TidslinjeSekvens = ({ type, ...props }) => {
  const Component = components(type);

  if (!type) {
    return null;
  }

  return (
    <Component {...props} />
  );
};

TidslinjeSekvens.propTypes = {
  type: string,
};

TidslinjeSekvens.defaultProps = {
  type: null,
};

export default TidslinjeSekvens;
