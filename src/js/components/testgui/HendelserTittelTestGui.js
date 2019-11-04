import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage as F } from 'react-intl';
import Hjelpetekst from 'nav-frontend-hjelpetekst';
import React from 'react';

const HendelserTittelTestGui = () => (
  <div className="hendelser__tittel-box">
    <Innholdstittel className="hendelser__tittel">
      <F id="hendelser.tittel" />
    </Innholdstittel>
    <Hjelpetekst className="hendelser__hjelp" tittel="">
      Denne komponenten støtter kun eventtypen Informasjon.
    </Hjelpetekst>
  </div>
);

export default HendelserTittelTestGui;
