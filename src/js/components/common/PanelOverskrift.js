import React from 'react';
import { Element, Undertittel } from 'nav-frontend-typografi';

const PanelOverskrift = ({ overskrift, type }) => {
  if (type === 'Undertittel') {
    return (
      <Undertittel className="lenkepanel__heading">
        {overskrift}
      </Undertittel>
    );
  }

  if (type === 'Element') {
    return (
      <Element className="lenkepanel__heading">
        {overskrift}
      </Element>
    );
  }
  return overskrift;
};

export default PanelOverskrift;
