import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { string } from 'prop-types';

const Sekvens = ({ tekst, className }) => (
  <div className={className}>
    <div className={`${className}__tekst`}>
      <Normaltekst>
        {tekst}
      </Normaltekst>
    </div>
  </div>
);

Sekvens.propTypes = {
  tekst: string,
  className: string,
};

Sekvens.defaultProps = {
  tekst: null,
  className: null,
};

export default Sekvens;
