import React from 'react';
import { FormattedMessage } from 'react-intl';
import Config from '../globalConfig';

export const harSensitivTekst = (brukernotifikasjon, innlogging) => (
  brukernotifikasjon.sikkerhetsnivaa === 4 && innlogging.securityLevel === '3'
);

export const finnTekstForSikkerhetsnivaa = (brukernotifikasjon, innlogging) => {
  const id = `brukernotifikasjoner.${brukernotifikasjon.type.toLowerCase()}.alternativ.tekst`;
  const alternativTekst = <FormattedMessage id={id} />;

  return harSensitivTekst(brukernotifikasjon, innlogging) ? alternativTekst : brukernotifikasjon.tekst;
};

export const finnLenkeForSikkerhetsnivaa = (brukernotifikasjon, innlogging) => {
  const stepUpLenke = `${Config.dittNav.LOGINSERVICE_LEVEL_4}`;

  return harSensitivTekst(brukernotifikasjon, innlogging) ? stepUpLenke : brukernotifikasjon.link;
};
