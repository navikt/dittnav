const getServicesUrl = () => {
  const host = window.location.hostname;
  if (host.indexOf('t6') > -1 || host.indexOf('t1') > -1) {
    return window.location.origin;
  }
  if (host.indexOf('person-q') > -1) {
    return 'https://tjenester-q0.nav.no';
  }
  return 'https://tjenester.nav.no';
};

const getLoginUrl = () => {
  const host = window.location.hostname;
  if (host.indexOf('t6') > -1 || host.indexOf('t1') > -1) {
    return 'https://loginservice-q.nav.no/login';
  }
  if (host.indexOf('person-q') > -1) {
    return 'https://loginservice.nais.preprod.local/login';
  }
  return 'https://loginservice.nais.adeo.no/login';
};

const props = (window.dittnav || { // eslint-disable-line no-undef
  SERVICES_URL: getServicesUrl(),
  LOGINSERVICE: getLoginUrl(),
  DITTNAV_API_URL: `${window.location.hostname}/dittnav-api/tjenester/person/personinfo`,
  SAKSOVERSIKT_API_URL: '/saksoversikt/tjenester/saker/paabegynte',
  SAKSOVERSIKT_URL: '/saksoversikt',
  MIN_INNBOKS_URL: '/mininnboks',
  REG_STATUS_LINK: 'https://nav.no/sbl/nav_security_check',
  CONTEXT_PATH: '/dittnav',
  ARBEIDSGIVER_LOGIN_URL: 'https://www.nav.no/no/Bedrift/Tjenester+og+skjemaer/NAV-+og+Altinn-tjenester',
});

export default {
  dittNav: props,
  MELDINGER_NAV_PATH: '/sbl/as/minside/meldinger/meldingerNAV.do',
  ARBEID_PATH: '/sbl/nav_security_check',
  MELDEKORT_PATH: '/meldekort/',
  MININNBOKS_UBEHANDLET_URL: '/tjenester/sporsmal/ubehandlet',
  ARBEID_LOGIN_LINK_URL: '/sbl/arbeid/innlogging',
  PSELV_LOGIN_LINK_URL: '/pselv/tilleggsfunksjonalitet/innlogging.jsf',
  PSELV_LOGIN_LINK_UT_URL: '/pselv/tilleggsfunksjonalitet/innlogging.jsf?context=ut',
};
