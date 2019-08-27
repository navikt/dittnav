const getDittNavBaseApiUrl = () => {
  const host = window.location.hostname;
  if (host.indexOf('localhost') > -1) {
    return process.env.REACT_APP_DITT_NAV_BASE_API_URL;
  }
  return `https://${window.location.hostname}/person`;
};

const getServicesUrl = () => {
  const host = window.location.hostname;
  if (host.indexOf('localhost') > -1) {
    return 'http://localhost:9222';
  }
  if (host.indexOf('t6') > -1 || host.indexOf('t1') > -1) {
    return window.location.origin;
  }
  if (host.indexOf('www-q0') > -1) {
    return 'https://tjenester-q0.nav.no';
  }
  if (host.indexOf('www-q1') > -1) {
    return 'https://tjenester-q1.nav.no';
  }
  return 'https://tjenester.nav.no';
};

const getNavUrl = () => {
  const host = window.location.hostname;
  if (host.indexOf('localhost') > -1) {
    return 'http://localhost:9222';
  }
  if (host.indexOf('t6') > -1 || host.indexOf('t1') > -1) {
    return window.location.origin;
  }
  if (host.indexOf('www-q0') > -1) {
    return 'https://www-q0.nav.no';
  }
  if (host.indexOf('www-q1') > -1) {
    return 'https://www-q1.nav.no';
  }
  return 'https://www.nav.no';
};

const getLoginUrl = () => {
  const host = window.location.hostname;
  if (host.indexOf('localhost') > -1) {
    return 'http://localhost:9111/login?level=Level3';
  }
  if (host.indexOf('t6') > -1 || host.indexOf('t1') > -1) {
    return 'https://loginservice.nav.no/login?level=Level3';
  }
  if (host.indexOf('www-q') > -1) {
    return 'https://loginservice-q.nav.no/login?level=Level3';
  }
  return 'https://loginservice.nav.no/login?level=Level3';
};

const getVtaPath = () => {
  return window.location.hostname.indexOf('localhost') > -1 ? 'http://127.0.0.1:3002' : `https://${window.location.hostname}/person/dittnav/veientilarbeid`;
};

export default {
  UNLEASH_TIMEOUT: 3000,
  dittNav: {
    SERVICES_URL: getServicesUrl(),
    NAV_URL: getNavUrl(),
    LOGINSERVICE: getLoginUrl(),
    DITTNAV_API_URL: `${getDittNavBaseApiUrl()}/dittnav-api/person/personinfo`,
    DITTNAV_SAKER_URL: `${getDittNavBaseApiUrl()}/dittnav-api/saker/paabegynte`,
    DITNTAV_MELDINGER_URL: `${getDittNavBaseApiUrl()}/dittnav-api/meldinger/ubehandlede`,
    DITTNAV_SAKSOVERSIKT_URL: `${getDittNavBaseApiUrl()}/dittnav-api/saker/oversikt`,
    DITTNAV_API_PING_URL: `${getDittNavBaseApiUrl()}/dittnav-api/ping`,
    REG_STATUS_LINK: 'https://nav.no/sbl/nav_security_check',
    CONTEXT_PATH: '/person/dittnav',
    ARBEIDSGIVER_LOGIN_URL: 'https://www.nav.no/no/Bedrift/Tjenester+og+skjemaer/NAV-+og+Altinn-tjenester',
  },
  VTA_PATH: getVtaPath(),
  INNLOGGINGSLINJE_AUTH: `${getServicesUrl()}/innloggingslinje-api/auth`,
  MELDINGER_NAV_PATH: '/sbl/as/minside/meldinger/meldingerNAV.do',
  ARBEID_PATH: '/sbl/nav_security_check',
  MELDEKORT_PATH: '/meldekort/',
  ETTERREGISTRERT_PATH: '/meldekort/etterregistrer-meldekort/',
  PSELV_LOGIN_LINK_URL: '/pselv/tilleggsfunksjonalitet/innlogging.jsf',
  PSELV_LOGIN_LINK_UT_URL: '/pselv/tilleggsfunksjonalitet/innlogging.jsf?context=ut',
};
