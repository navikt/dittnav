export const lenker = {
  ledigeStillinger: {
    tittel: 'Ledige stillinger',
    url: `${window.env.LEDIGE_STILLINGER_URL}`,
  },
  uforetrygd: {
    tittel: 'Uføretrygd',
    url: `${window.env.TJENESTER_URL}/pselv/publisering/uforetrygd.jsf?context=ut`,
  },
  dineForeldrepenger: {
    tittel: 'Dine foreldrepenger',
    url: 'https://foreldrepenger.nav.no',
  },
  aktivitetsplan: {
    tittel: 'Aktivitetsplan',
    url: `${window.env.AKTIVITETSPLAN_URL}`,
  },
  meldekort: {
    tittel: 'Meldekort',
    url: `${window.env.NAVNO_URL}/meldekort/om-meldekort`,
  },
  personopplysninger: {
    tittel: 'Personopplysninger',
    url: `${window.env.NAVNO_URL}/person/personopplysninger`,
  },
  skjemaer: {
    tittel: 'Skjemaer',
    url: `${window.env.NAVNO_URL}/soknader`,
  },
  dinPensjon: {
    tittel: 'Din pensjon',
    url: `${window.env.TJENESTER_URL}/pselv/publisering/dinpensjon.jsf`,
  },
  dineStillingssok: {
    tittel: 'Dine stillingssøk',
    url: 'https://stillingsok.nav.no/pam-stillingsok/lagrede-sok',
  },
  veilederArbeidssoker: {
    tittel: 'Veileder for arbeidssøker',
    url: `${window.env.VEILEDERARBEIDSSOKER_URL}`,
  },
  registrerDegSomArbeidssoker: {
    tittel: 'Registrer deg som arbeidssøker',
    url: `${window.env.ARBEIDSSOKERREGISTRERING_URL}`,
  },
  utbetalingsoversikt: {
    tittel: 'Dine utbetalinger',
    url: window.env.UTBETALINGSOVERSIKT_URL,
  },
  saksoversikt: {
    tittel: 'Dine saker',
    url: `${window.env.TJENESTER_URL}/saksoversikt`,
  },
  saksoversiktTema: {
    tittel: 'Dine saker',
    url: `${window.env.TJENESTER_URL}/saksoversikt/tema`,
  },
  saksoversiktHjelp: {
    tittel: 'Dine saker hjelp',
    url: '#',
  },
  innboks: {
    tittel: 'Innboks',
    url: `${window.env.INNBOKS_URL}`,
  },
  digisos: {
    tittel: 'Økonomisk sosialhjelp',
    url: `${window.env.DIGISOS_URL}`,
  },
  koronaVeiviser: {
    tittel: 'Koronavirus – hva gjelder i min situasjon?',
    url: `${window.env.NAVNO_URL}/person/koronaveiviser`,
  },
  dagpengerForskudd: {
    tittel: 'Trenger du forskudd på dagpenger?',
    url: `${window.env.NAVNO_URL}/dagpenger/forskudd`,
  },
  koronaBehandlingstid: {
    tittel: 'Lengre saksbehandlingstider',
    url: `${window.env.NAVNO_URL}/no/nav-og-samfunn/om-nav/saksbehandlingstider-i-nav`,
  },
  koronaSituasjon: {
    tittel: 'Status på tilbakebetaling av forskudd på dagpenger',
    url: `${window.env.NAVNO_URL}/dagpenger/forskudd/oversikt`,
  },
  dineFullmakter: {
    tittel: 'Dine fullmakter',
    url: `${window.env.NAVNO_URL}/person/pdl-fullmakt-ui`,
  },
  arbeidsavklaringspenger: {
    tittel: 'Arbeidsavklaringspenger',
    url: `${window.env.NAVNO_URL}/aap#kort`,
  },
  dinePleiepenger: {
    tittel: 'Dine pleiepenger',
    url: `${window.env.DINE_PLEIEPENGER_URL}`,
  },
  dittSykefravaer: {
    tittel: 'Ditt sykefravær',
    url: `${window.env.DITT_SYKEFRAVAER_URL}`,
  },
  hjelpemidler: {
    tittel: 'Hjelpemidler',
    url: `${window.env.HJELPEMIDLER_URL}`,
  },
  dagpenger: {
    tittel: 'Dagpenger',
    url: `${window.env.DAGPENGER_URL}`,
  },
  minInnboks: {
    tittel: 'MinInnboks',
    url: `${window.env.MIN_INNBOKS_URL}`,
  },
  dialogMedVeileder: {
    tittel: 'Dialog med den lokale veilederen din',
    url: `${window.env.NAVNO_URL}/arbeid/dialog`,
  },
  mineSaker: {
    tittel: 'Mine Saker',
    url: `${window.env.MINE_SAKER_URL}`,
  },
};

export const generelleLenker = [
  lenker.ledigeStillinger,
  lenker.uforetrygd,
  lenker.digisos,
  lenker.dineForeldrepenger,
  lenker.aktivitetsplan,
  lenker.meldekort,
  lenker.registrerDegSomArbeidssoker,
  lenker.dineStillingssok,
  lenker.personopplysninger,
  lenker.dineFullmakter,
  lenker.dinePleiepenger,
  lenker.hjelpemidler,
];

export const oppfolgingsLenker = [
  lenker.digisos,
  lenker.dittSykefravaer,
  lenker.skjemaer,
  lenker.dineForeldrepenger,
  lenker.arbeidsavklaringspenger,
  lenker.dinPensjon,
  lenker.uforetrygd,
  lenker.meldekort,
  lenker.personopplysninger,
  lenker.dineFullmakter,
  lenker.dinePleiepenger,
  lenker.hjelpemidler,
];
