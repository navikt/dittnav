const envLabelsToEnvs = {
  'localhost': 'local',
  '127': 'local',
  '': 'local',
  'www-q0': 'q0',
  'www-q1': 'q1',
  'www-q6': 'q6',
  'www-t1': 't1',
  'www-t6': 't6',
};

const getEnvironment = () => {
  const envLabel = window.location.hostname.split('.', 1)[0];
  return envLabelsToEnvs[envLabel] ? envLabelsToEnvs[envLabel] : 'prod';
};

const ENV = getEnvironment();

const getDittNavBaseApiUrl = () => (ENV === 'local'
  ? process.env.REACT_APP_DITT_NAV_BASE_API_URL
  : `https://${window.location.hostname}/person`);

const getServicesUrl = () => {
  if (ENV === 'prod') {
    return 'https://tjenester.nav.no';
  }
  if (ENV === 'local') {
    return 'http://localhost:9222';
  }
  if (ENV === 't1' || ENV === 't6') {
    return window.location.origin;
  }
  return `https://tjenester-${ENV}.nav.no`;
};

const getNavUrl = () => {
  if (ENV === 'prod') {
    return 'https://www.nav.no';
  }
  if (ENV === 'local') {
    return 'http://localhost:9222';
  }
  if (ENV === 't1' || ENV === 't6') {
    return window.location.origin;
  }
  return `https://www-${ENV}.nav.no`;
};

const getLoginUrl = () => {
  if (ENV === 'prod') {
    return 'https://loginservice.nav.no/login?level=Level3';
  }
  if (ENV === 'local') {
    return 'http://localhost:9111/login?level=Level3';
  }
  if (ENV === 't1' || ENV === 't6') {
    return 'https://loginservice.nav.no/login?level=Level3';
  }
  return 'https://loginservice-q.nav.no/login?level=Level3';
};

const getVtaPath = () => (ENV === 'local'
  ? 'http://127.0.0.1:3002'
  : `https://${window.location.hostname}/person/dittnav/veientilarbeid`);

const getRegistreringUrl = () => {
  if (ENV === 'prod') {
    return 'https://arbeidssokerregistrering.nav.no';
  }
  if (ENV === 'local') {
    return 'http://localhost:9222/veiledearbeidssoker/mistet-jobben/registrering';
  }
  if (ENV === 't1' || ENV === 't6') {
    return `${window.location.origin}/veiledearbeidssoker/mistet-jobben/registrering`;
  }
  return 'https://arbeidssokerregistrering-q.nav.no';
};

const lenker = {
  ledigeStillinger: { tittel: 'Ledige stillinger', url: 'https://arbeidsplassen.nav.no/stillinger' },
  uforetrygd: { tittel: 'Uføretrygd', url: `${getServicesUrl()}/pselv/publisering/uforetrygd.jsf?context=ut` },
  dineForeldrepenger: { tittel: 'Dine foreldrepenger', url: 'https://foreldrepenger.nav.no' },
  aktivitetsplan: { tittel: 'Aktivitetsplan', url: `${getServicesUrl()}/aktivitetsplan/` },
  meldekort: { tittel: 'Meldekort', url: `${getNavUrl()}/meldekort/om-meldekort` },
  personopplysninger: { tittel: 'Personopplysninger', url: `${getNavUrl()}/person/personopplysninger` },
  skjemaer: { tittel: 'Skjemaer', url: `${getNavUrl()}/soknader` },
  dinPensjon: { tittel: 'Din pensjon', url: `${getServicesUrl()}/pselv/publisering/dinpensjon.jsf` },
  dineStillingssok: { tittel: 'Dine stillingssøk', url: 'https://stillingsok.nav.no/pam-stillingsok/lagrede-sok' },
  veilederArbeidssoker: { tittel: 'Veileder for arbeidssøker', url: `${getServicesUrl()}/veiledearbeidssoker/` },
  registrerDegSomArbeidssoker: { tittel: 'Registrer deg som arbeidssøker', url: `${getRegistreringUrl()}` },
  dittSykefravaer: { tittel: 'Ditt sykefravær', url: `${getServicesUrl()}/sykefravaer/` },
  utbetalingsoversikt: { tittel: 'Dine utbetalinger', url: `${getServicesUrl()}/utbetalingsoversikt/` },
  saksoversikt: { tittel: 'Dine saker', url: `${getServicesUrl()}/saksoversikt/` },
  saksoversiktTema: { tittel: 'Dine saker', url: `${getServicesUrl()}/saksoversikt/tema/` },
  saksoversiktHjelp: { tittel: 'Dine saker hjelp', url: '#' },
  innboks: { tittel: 'Innboks', url: `${getServicesUrl()}/mininnboks/` },
};

const generelleLenker = [
  lenker.ledigeStillinger,
  lenker.uforetrygd,
  lenker.dineForeldrepenger,
  lenker.aktivitetsplan,
  lenker.meldekort,
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
  lenker.meldekort,
  lenker.personopplysninger,
];

export default {
  ENVIRONMENT: getEnvironment(),
  UNLEASH_TIMEOUT: 3000,
  dittNav: {
    SERVICES_URL: getServicesUrl(),
    NAV_URL: getNavUrl(),
    LOGINSERVICE: getLoginUrl(),
    DITTNAV_OPPFOLGING_URL: `${getDittNavBaseApiUrl()}/dittnav-legacy-api/oppfolging`,
    DITTNAV_MELDEKORT_URL: `${getDittNavBaseApiUrl()}/dittnav-legacy-api/meldekortinfo`,
    DITTNAV_PERSON_NAVN_URL: `${getDittNavBaseApiUrl()}/dittnav-legacy-api/personalia/navn`,
    DITTNAV_PERSON_IDENT_URL: `${getDittNavBaseApiUrl()}/dittnav-legacy-api/personalia/ident`,
    DITTNAV_SAKER_URL: `${getDittNavBaseApiUrl()}/dittnav-legacy-api/saker/paabegynte`,
    DITTNAV_MELDINGER_URL: `${getDittNavBaseApiUrl()}/dittnav-legacy-api/meldinger/ubehandlede`,
    DITTNAV_API_PING_URL: `${getDittNavBaseApiUrl()}/dittnav-legacy-api/ping`,
    DITTNAV_HENDELSER_URL: `${getDittNavBaseApiUrl()}/dittnav-legacy-api/events`,
    DITTNAV_SAKSTEMA_URL: `${getDittNavBaseApiUrl()}/dittnav-legacy-api/saker/sakstema`,
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
  MELDEKORT_PATH: '/meldekort',
  ETTERREGISTRERT_PATH: '/meldekort/etterregistrer-meldekort',
  PSELV_LOGIN_LINK_URL: '/pselv/tilleggsfunksjonalitet/innlogging.jsf',
  PSELV_LOGIN_LINK_UT_URL: '/pselv/tilleggsfunksjonalitet/innlogging.jsf?context=ut',
  LENKER: lenker,
};
