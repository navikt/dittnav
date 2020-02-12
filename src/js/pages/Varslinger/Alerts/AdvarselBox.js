import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';

const AdvarselBox = () => (
  <AlertStripe type="advarsel" className="infomelding">
    <Undertittel>
      <FormattedMessage id="varslinger.under.utvikling.advarsel.tittel" />
    </Undertittel>
    <Normaltekst>
      <FormattedMessage id="varslinger.under.utvikling.advarsel.ingress" />
    </Normaltekst>
  </AlertStripe>
);

export default AdvarselBox;
