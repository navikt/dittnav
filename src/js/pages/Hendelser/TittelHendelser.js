import { Innholdstittel } from 'nav-frontend-typografi';
import { FormattedMessage as F } from 'react-intl';
import React from 'react';

const TittelHendelser = () => (
  <div className="testpage-panel__tittel-box">
    <Innholdstittel className="testpage-panel__tittel">
      <F id="hendelser.tittel" />
    </Innholdstittel>
  </div>
);

export default TittelHendelser;
