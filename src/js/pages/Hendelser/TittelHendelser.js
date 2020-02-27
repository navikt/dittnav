import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage as F } from 'react-intl';
import React from 'react';

const TittelHendelser = () => (
  <div className="hendelser__tittel-box">
    <Innholdstittel className="hendelser__tittel">
      <F id="hendelser.tittel" />
    </Innholdstittel>
  </div>
);

export default TittelHendelser;
