import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Innlogging } from '../constants';

const useSikkerhetsnivaa = (brukernotifikasjon, type, innloggingsstatus) => {
  const skalMaskeres = brukernotifikasjon.sikkerhetsnivaa === 4 && innloggingsstatus.authLevel === 3;

  const tekst = skalMaskeres
    ? <FormattedMessage id={`${type}.maskert.tekst`} />
    : brukernotifikasjon.tekst;

  const lenke = skalMaskeres
    ? `${Innlogging.LOGINSERVICE_LEVEL_4_URL}`
    : brukernotifikasjon.link;

  return {
    skalMaskeres,
    tekst,
    lenke,
  };
};

export default useSikkerhetsnivaa;
