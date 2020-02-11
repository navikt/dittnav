import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';
import Config from '../../../globalConfig';

const AdvarselBox = () => (
  <AlertStripe type="advarsel" className="infomelding">
    <Undertittel>
      <FormattedMessage id="varslinger.under.utvikling.tittel" />
    </Undertittel>
    <Normaltekst>
      <FormattedMessage
        id="varslinger.under.utvikling.ingress"
        values={{
          innboks: <Lenke id="alert-lenke-id" href={Config.LENKER.innboks.url}>innboksen</Lenke>,
          saksoversikt: <Lenke id="alert-lenke-id" href={Config.LENKER.saksoversikt.url}>Dine saker</Lenke>,
        }}
      />
    </Normaltekst>
  </AlertStripe>
);

export default AdvarselBox;
