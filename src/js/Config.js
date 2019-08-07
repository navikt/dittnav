const getDittNavBaseApiUrl = () => {
  const host = window.location.hostname;
  if (host.indexOf('localhost') > -1) {
    return process.env.REACT_APP_DITT_NAV_BASE_API_URL;
  }
  return `https://${window.location.hostname}/person`;
};

const getUrl = () => {
  const host = window.location.hostname;
  if (host.indexOf('localhost') > -1) {
    return 'https://www-t1.nav.no';
  }
  if (host.indexOf('www-q0') > -1) {
    return 'https://www-q0.nav.no';
  }
  if (host.indexOf('www-q1') > -1) {
    return 'https://www-q1.nav.no';
  }
  return 'https://www.nav.no';
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

const lenker = {
  ledigeStillinger: { tittel: 'Ledige stillinger', url: 'https://arbeidsplassen.nav.no/stillinger' },
  uforetrygd: { tittel: 'Uføretrygd', url: `${getServicesUrl()}/pselv/publisering/uforetrygd.jsf?context=ut` },
  dineForeldrepenger: { tittel: 'Dine foreldrepenger', url: 'https://foreldrepenger.nav.no' },
  aktivitetsplan: { tittel: 'Aktivitetsplan', url: `${getServicesUrl()}/aktivitetsplan/` },
  dinProfil: { tittel: 'Din profil', url: `${getServicesUrl()}/brukerprofil/` },
  personopplysninger: { tittel: 'Personopplysninger', url: `${getUrl()}/person/personopplysninger` },
  skjemaer: { tittel: 'Skjemaer', url: `${getUrl()}/no/person/skjemaer-for-privatpersoner` },
  dinPensjon: { tittel: 'Din pensjon', url: `${getServicesUrl()}/pselv/publisering/dinpensjon.jsf` },
  dineStillingssok: { tittel: 'Dine stillingssøk', url: 'https://stillingsok.nav.no/pam-stillingsok/lagrede-sok' },
  registrerDegSomArbeidssoker: { tittel: 'Registrer deg som arbeidssøker', url: `${getServicesUrl()}/veiledearbeidssoker/mistet-jobben/registrering` },
  dittSykefravaer: { tittel: 'Ditt sykefravær', url: `${getServicesUrl()}/sykefravaer/` },
};

const generelleLenker = [
  lenker.ledigeStillinger,
  lenker.uforetrygd,
  lenker.dineForeldrepenger,
  lenker.aktivitetsplan,
  lenker.dinProfil,
  lenker.registrerDegSomArbeidssoker,
  lenker.dineStillingssok,
  lenker.personopplysninger,
];

const oppfolgingsLenker = [
  lenker.dittSykefravaer,
  lenker.skjemaer,
  lenker.dineForeldrepenger,
  lenker.dinPensjon,
  lenker.uforetrygd,
  lenker.dinProfil,
  lenker.personopplysninger,
];

export default {
  UNLEASH_TIMEOUT: 3000,
  dittNav: {
    SERVICES_URL: getServicesUrl(),
    LOGINSERVICE: getLoginUrl(),
    DITTNAV_API_URL: `${getDittNavBaseApiUrl()}/dittnav-api/person/personinfo`,
    DITTNAV_SAKER_URL: `${getDittNavBaseApiUrl()}/dittnav-api/saker/paabegynte`,
    DITNTAV_MELDINGER_URL: `${getDittNavBaseApiUrl()}/dittnav-api/meldinger/ubehandlede`,
    DITTNAV_API_PING_URL: `${getDittNavBaseApiUrl()}/dittnav-api/ping`,
    REG_STATUS_LINK: 'https://nav.no/sbl/nav_security_check',
    CONTEXT_PATH: '/person/dittnav',
    ARBEIDSGIVER_LOGIN_URL: 'https://www.nav.no/no/Bedrift/Tjenester+og+skjemaer/NAV-+og+Altinn-tjenester',
    GENERELLE_LENKER: generelleLenker,
    OPPFOLGINGS_LENKER: oppfolgingsLenker,
  },
  VTA_PATH: getVtaPath(),
  INNLOGGINGSLINJE_AUTH: `${getServicesUrl()}/innloggingslinje-api/auth`,
  MELDINGER_NAV_PATH: '/sbl/as/minside/meldinger/meldingerNAV.do',
  ARBEID_PATH: '/sbl/nav_security_check',
  MELDEKORT_PATH: '/meldekort/',
  ETTERREGISTRERT_PATH: '/meldekort/etterregistrert',
  PSELV_LOGIN_LINK_URL: '/pselv/tilleggsfunksjonalitet/innlogging.jsf',
  PSELV_LOGIN_LINK_UT_URL: '/pselv/tilleggsfunksjonalitet/innlogging.jsf?context=ut',
};
