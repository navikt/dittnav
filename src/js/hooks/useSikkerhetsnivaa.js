import React from 'react';
import { FormattedMessage } from 'react-intl';
import Config from '../globalConfig';

const useSikkerhetsnivaa = (brukernotifikasjon, type, innloggingsstatus) => {
  const skalMaskeres = brukernotifikasjon.sikkerhetsnivaa === 4 && innloggingsstatus.securityLevel === '3';

  const tekst = skalMaskeres
    ? <FormattedMessage id={`${type}.maskert.tekst`} />
    : brukernotifikasjon.tekst;

  const lenke = skalMaskeres
    ? `${Config.dittNav.LOGINSERVICE_LEVEL_4}`
    : brukernotifikasjon.link;

  return {
    skalMaskeres,
    tekst,
    lenke,
  };
};

export default useSikkerhetsnivaa;
