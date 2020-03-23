import React from 'react';
import { FormattedMessage } from 'react-intl';
import Config from '../globalConfig';

export const skalMaskeres = (brukernotifikasjon, innlogging) => (
  brukernotifikasjon.sikkerhetsnivaa === 4 && innlogging.securityLevel === '3'
);

export const finnTekstForSikkerhetsnivaa = (brukernotifikasjon, type, innlogging) => {
  const id = `brukernotifikasjoner.${type}.maskert.tekst`;
  const maskertTekst = <FormattedMessage id={id} />;

  return skalMaskeres(brukernotifikasjon, innlogging) ? maskertTekst : brukernotifikasjon.tekst;
};

export const finnLenkeForSikkerhetsnivaa = (brukernotifikasjon, innlogging) => {
  const stepUpLenke = `${Config.dittNav.LOGINSERVICE_LEVEL_4}`;

  return skalMaskeres(brukernotifikasjon, innlogging) ? stepUpLenke : brukernotifikasjon.link;
};

export const finnLenkeTekstIdForSikkerhetsnivaa = (brukernotifikasjon, innlogging) => {
  const lenkeTekstId = 'brukernotifikasjoner.beskjed.lenke.tekst';
  const stepUpLenkeTekstId = 'brukernotifikasjoner.beskjed.stepup.lenke.tekst';

  return skalMaskeres(brukernotifikasjon, innlogging) ? stepUpLenkeTekstId : lenkeTekstId;
};
