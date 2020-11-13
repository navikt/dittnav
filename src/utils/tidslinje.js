import { FormattedMessage } from 'react-intl';
import React from 'react';

export const forventninger = [
  'Dersom søknaden din blir godkjent vil du bli bedt om å sende meldekort, og du vil få første utbetaling 2-3 virkedager etter fristen for innsending av meldekort',
  'Vi vil gi deg svar på søknaden din innen 6 uker etter at du har lastet opp all nødvendig dokumentasjon',
];

export const formattedMessage = (id) => (
  <FormattedMessage id={id} />
);
