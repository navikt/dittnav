import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { string } from 'prop-types';

const Sekvens = ({ tekst }) => (
  <div className="sekvens">
    <div className="sekvens__tekst">
      <Normaltekst>
        {tekst}
      </Normaltekst>
    </div>
  </div>
);

Sekvens.propTypes = {
  tekst: string,
};

Sekvens.defaultProps = {
  tekst: null,
};

export default Sekvens;
