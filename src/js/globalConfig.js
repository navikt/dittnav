const lenker = {
  ledigeStillinger: { tittel: 'Ledige stillinger', url: 'https://arbeidsplassen.nav.no/stillinger' },
  uforetrygd: { tittel: 'Uføretrygd', url: `${window.env.TJENESTER_URL}/pselv/publisering/uforetrygd.jsf?context=ut` },
  dineForeldrepenger: { tittel: 'Dine foreldrepenger', url: 'https://foreldrepenger.nav.no' },
  aktivitetsplan: { tittel: 'Aktivitetsplan', url: `${window.env.TJENESTER_URL}/aktivitetsplan` },
  meldekort: { tittel: 'Meldekort', url: `${window.env.NAVNO_URL}/meldekort/om-meldekort` },
  personopplysninger: { tittel: 'Personopplysninger', url: `${window.env.NAVNO_URL}/person/personopplysninger` },
  skjemaer: { tittel: 'Skjemaer', url: `${window.env.NAVNO_URL}/soknader` },
  dinPensjon: { tittel: 'Din pensjon', url: `${window.env.TJENESTER_URL}/pselv/publisering/dinpensjon.jsf` },
  dineStillingssok: { tittel: 'Dine stillingssøk', url: 'https://stillingsok.nav.no/pam-stillingsok/lagrede-sok' },
  veilederArbeidssoker: { tittel: 'Veileder for arbeidssøker', url: `${window.env.VEILEDERARBEIDSSOKER_URL}` },
  registrerDegSomArbeidssoker: { tittel: 'Registrer deg som arbeidssøker', url: `${window.env.ARBEIDSSOKERREGISTRERING_URL}` },
  dittSykefravaer: { tittel: 'Ditt sykefravær', url: `${window.env.TJENESTER_URL}/sykefravaer` },
  utbetalingsoversikt: { tittel: 'Dine utbetalinger', url: `${window.env.TJENESTER_URL}/utbetalingsoversikt` },
  saksoversikt: { tittel: 'Dine saker', url: `${window.env.TJENESTER_URL}/saksoversikt` },
  saksoversiktTema: { tittel: 'Dine saker', url: `${window.env.TJENESTER_URL}/saksoversikt/tema` },
  saksoversiktHjelp: { tittel: 'Dine saker hjelp', url: '#' },
  innboks: { tittel: 'Innboks', url: `${window.env.TJENESTER_URL}/mininnboks` },
  digisos: { tittel: 'Digisos', url: `${window.env.NAVNO_URL}/sosialhjelp/innsyn` },
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
  dittNav: {
    NAVNO_URL: window.env.NAVNO_URL,
    LOGINSERVICE: window.env.LOGIN_URL,
    DITTNAV_API_AUTH_URL: `${window.env.DITTNAV_API_URL}/authPing`,
    DITTNAV_OPPFOLGING_URL: `${window.env.DITTNAV_API_URL}/oppfolging`,
    DITTNAV_MELDEKORT_URL: `${window.env.DITTNAV_API_URL}/meldekortinfo`,
    DITTNAV_PERSON_NAVN_URL: `${window.env.DITTNAV_API_URL}/personalia/navn`,
    DITTNAV_PERSON_IDENT_URL: `${window.env.DITTNAV_API_URL}/personalia/ident`,
    DITTNAV_SAKER_URL: `${window.env.DITTNAV_API_URL}/saker/paabegynte`,
    DITTNAV_MELDINGER_URL: `${window.env.DITTNAV_API_URL}/meldinger/ubehandlede`,
    DITTNAV_SAKSTEMA_URL: `${window.env.DITTNAV_API_URL}/saker/sakstema`,

    DITTNAV_HENDELSER_URL: `${window.env.DITTNAV_API_URL}/brukernotifikasjoner`,
    DITTNAV_DONE_URL: `${window.env.DITTNAV_API_URL}/produce/done`,

    EVENT_TEST_PRODUCER_URL: window.env.EVENT_TEST_PRODUCER_URL,

    CONTEXT_PATH: '/person/dittnav',
    ARBEIDSGIVER_LOGIN_URL: 'https://www.nav.no/no/Bedrift/Tjenester+og+skjemaer/NAV-+og+Altinn-tjenester',
    GENERELLE_LENKER: generelleLenker,
    OPPFOLGINGS_LENKER: oppfolgingsLenker,
    FEATURE_TOGGLES: '', // a,b,c etc..
  },
  SAKSTEMA_DATOTID_FORMAT: 'YYYY-MM-DD-hh:mm:ss+Z',
  VTA_PATH: window.env.VTA_URL,
  INNLOGGINGSLINJE_AUTH: `${window.env.INNLOGGINGSLINJE_API_URL}/auth`,
  MELDINGER_NAV_PATH: '/sbl/as/minside/meldinger/meldingerNAV.do',
  ARBEID_PATH: '/sbl/nav_security_check',
  MELDEKORT_PATH: '/meldekort',
  ETTERREGISTRERT_PATH: '/meldekort/etterregistrer-meldekort',
  PSELV_LOGIN_LINK_URL: '/pselv/tilleggsfunksjonalitet/innlogging.jsf',
  PSELV_LOGIN_LINK_UT_URL: '/pselv/tilleggsfunksjonalitet/innlogging.jsf?context=ut',
  LENKER: lenker,
  HENDELSER_FEATURE_TOGGLE: window.env.HENDELSER_FEATURE_TOGGLE === 'true',
  VARSLINGER_FEATURE_TOGGLE: window.env.VARSLINGER_FEATURE_TOGGLE === 'true',
  IS_DEV: window.env.ER_DEV === 'true',
  IS_TEST: process.env.NODE_ENV === 'test',
};
