import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { objectOf, any } from 'prop-types';

const Future = ({ element }) => (
  <div className="future">
    <div className="future__ikon">
      {}
    </div>
    <div className="future__tekst">
      <Normaltekst>
        {element.tekst}
      </Normaltekst>
    </div>
  </div>
);

Future.propTypes = {
  // TODO: use PropTypes.oneOfType([PropTypes.object], ...)
  element: objectOf(any),
};

Future.defaultProps = {
  element: null,
};

export default Future;
