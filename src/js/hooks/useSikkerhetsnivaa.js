import React from 'react';
import { FormattedMessage } from 'react-intl';
import Config from '../globalConfig';

const useSikkerhetsnivaa = (brukernotifikasjon, type, innlogging) => {
  const erMaskert = brukernotifikasjon.sikkerhetsnivaa === 4 && innlogging.securityLevel === '3';

  const tekst = erMaskert
    ? <FormattedMessage id={`${type}.maskert.tekst`} />
    : brukernotifikasjon.tekst;

  const lenke = erMaskert
    ? `${Config.dittNav.LOGINSERVICE_LEVEL_4}`
    : brukernotifikasjon.link;

  return {
    erMaskert,
    tekst,
    lenke,
  };
};

export default useSikkerhetsnivaa;
