import { buildApiUrl, buildNavNoUrl, buildTestProducerUrl, buildLoginserviceUrl } from './utils/api';

export const NAV_NO_URL = buildNavNoUrl();

export const Dittnav = Object.freeze({
  API_AUTH_URL:
    buildApiUrl('/authPing'),
  OPPFOLGING_URL:
    buildApiUrl('/oppfolging'),
  MELDEKORT_URL:
    buildApiUrl('/meldekortinfo'),
  PERSON_NAVN_URL:
    buildApiUrl('/personalia/navn'),
  PERSON_IDENT_URL:
    buildApiUrl('/personalia/ident'),
  SAKER_URL:
    buildApiUrl('/saker/paabegynte'),
  MELDINGER_URL:
    buildApiUrl('/meldinger/ubehandlede'),
  SAKSTEMA_URL:
    buildApiUrl('/saker/sakstema'),
  BESKJED_URL:
    buildApiUrl('/beskjed'),
  OPPGAVE_URL:
    buildApiUrl('/oppgave'),
  INNBOKS_URL:
    buildApiUrl('/innboks'),
  BESKJED_INAKTIV_URL:
    buildApiUrl('/beskjed/inaktiv'),
  OPPGAVE_INAKTIV_URL:
    buildApiUrl('/oppgave/inaktiv'),
  INNBOKS_INAKTIV_URL:
    buildApiUrl('/innboks/inaktiv'),
  VARSLINGER_URL:
    buildNavNoUrl('/person/dittnav/varslinger'),
  DONE_URL:
    buildApiUrl('/produce/done'),
});

export const TestProducer = Object.freeze({
  URL:
    buildTestProducerUrl(),
  DONE_ALL_URL:
    buildTestProducerUrl('/produce/done/all'),
});

export const Innlogging = Object.freeze({
  LOGINSERVICE_URL:
    buildLoginserviceUrl(),
  LOGINSERVICE_LEVEL_4_URL:
    buildLoginserviceUrl(4),
  INNLOGGINGSLINJE_AUTH_URL:
    `${window.env.INNLOGGINGSLINJE_API_URL}/auth`,
});

export const Path = Object.freeze({
  CONTEXT: '/person/dittnav',
  VTA: window.env.VTA_URL,
  MELDEKORT: '/meldekort',
  ETTERREGISTRERT: '/meldekort/etterregistrer-meldekort',
});

export const Format = Object.freeze({
  SAKSTEMA: 'YYYY-MM-DD-hh:mm:ss+Z',
  BRUKERNOTIFIKASJONER: 'YYYY-MM-DDTHH:mm:ss:SSS[Z]',
});

export const Toggle = Object.freeze({
  FEATURE_TOGGLES: '', // a,b,c etc..
  TEST_SIDE: window.env.TEST_SIDE_FEATURE_TOGGLE === 'true',
  IS_DEV: window.env.ER_DEV === 'true',
  IS_TEST: process.env.NODE_ENV === 'test',
});
