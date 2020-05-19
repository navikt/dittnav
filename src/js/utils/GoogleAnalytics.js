import ReactGA from 'react-ga';

const trackingId = 'UA-9127381-16';

export const GoogleAnalyticsCategory = Object.freeze({
  Forside: 'Ditt Nav/Forside',
  Varslinger: 'Ditt Nav/Varslinger',
});

export const GoogleAnalyticsAction = Object.freeze({
  FlereTjenester: 'Flere tjenester',
  Varslinger: 'Inngang varslinger',
  DineSisteSaker: 'Dine siste saker',
  DineSaker: 'Dine saker',
  DinPensjon: 'Din pensjon',
  DittSykefravaer: 'Ditt sykefravær',
  MistetJobben: 'Mistet jobben',
  Skjemaer: 'Skjemaer',
  Utbetalinger: 'Utbetalinger',
  MinInnboks: 'Innboks',
  PaabegynteSoknader: 'Paabegynte soknader',
  EtterregistrerteMeldekort: 'Etterregistrerte meldekort',
  MeldekortKlar: 'Meldekort/Meldekort er klar for innsending',
  MeldekortVent: 'Meldekort/Neste meldekort kan sendes fra',
  Beskjed: 'Notifikasjon/Beskjed',
  BeskjedLukk: 'Notifikasjon/Lukk beskjed',
  Oppgave: 'Notifikasjon/Oppgave',
  Innboks: 'Notifikasjon/Inbboks',
  Koronaveiviser: 'Koronavirus - Hva gjelder i min situasjon?',
  DagpengerForskudd: 'Trenger du forsukdd på dagpenger?',
  Behandlingstid: 'Behandlingstid',
});

export const initializeGoogleAnalytics = () => ReactGA.initialize(trackingId, {
  debug: false,
});

export const trackEvent = (category, action, label) => (
  ReactGA.event({
    category,
    action,
    label,
  })
);

export const removeFragment = (url) => {
  const fragmentPattern = '/#[a-z0-9]+/gi';

  return url.replace(fragmentPattern, '');
};
