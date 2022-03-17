import React from 'react';
import { Element, Normaltekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

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

  if (type === 'Normaltekst') {
    return (
      <Normaltekst className="lenkepanel__heading">
        {overskrift}
      </Normaltekst>
    );
  }

  if (type === 'LoginLenke') {
    return (
      <Element className="lenkepanel__heading">
        {overskrift}
        <Lenke> Logg inn med høyere sikkerhetsnivå for å se meldingen.</Lenke>
      </Element>
    );
  }
  return overskrift;
};

export default PanelOverskrift;
