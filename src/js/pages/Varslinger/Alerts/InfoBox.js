import React from 'react';
import AlertStripe from 'nav-frontend-alertstriper';
import { Normaltekst } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { FormattedMessage } from 'react-intl';
import Config from '../../../globalConfig';

const InfoBox = () => (
  <AlertStripe type="info" className="infomelding">
    <Normaltekst>
      <FormattedMessage
        id="varslinger.under.utvikling.info"
        values={{
          innboks: <Lenke id="alert-lenke-id" href={Config.LENKER.innboks.url}>innboksen</Lenke>,
          saksoversikt: <Lenke id="alert-lenke-id" href={Config.LENKER.saksoversikt.url}>Dine saker</Lenke>,
        }}
      />
    </Normaltekst>
  </AlertStripe>
);

export default InfoBox;
