import amplitude from 'amplitude-js';

export const listOfActions = {
  TrykkPaaBrukernotifikasjon: 'Bruker åpnet brukernotifikasjon',
  TrykkPaaArkiverKnapp: 'Bruker arkiverte beskjed',
  TrykkPaaLenke: 'Bruker trykket på lenke',
};

export const listOfComponentNames = {
  brukernotifikasjon: {
    MeldekortKlar: 'Brukernotifikasjon - Meldekort klart for innsending',
    MeldekortVent: 'Brukernotifikasjon - Meldekort/Neste meldekort kan sendes fra',
    OppgaveMottatt: 'Brukernotifikasjon - Oppgave mottatt',
    SykemeldingMaaGodkjennes: 'Brukernotifikasjon - Sykemelding må godkjennes',
    BeskjedMottatt: 'Brukernotifikasjon - Beskjed mottatt',
    SoknadMottatt: 'Brukernotifikasjon - Søknad mottatt',
    InnboksMeldingOppsummering: 'Brukernotifikasjon - Antall meldinger i innboks',
    EtterregistreringMeldekort: 'Brukernotifikasjon - Etterregistrering av meldekort',
    PaabegynteSoknader: 'Brukernotifikasjon - Antall påbegynte søknader, ikke sendt',
    UlesteDokumenter: 'Brukernotifikasjon - Antall uleste dokumenter',
    UlesteOppgaver: 'Brukernotifikasjon - Antall uleste oppgaver',
    TidligereBeskjederOgOppgaver: 'Lenke til tidligere beskjeder og oppgaver',
  },
  TilbakebetalingsFlis: 'TilbakebetalingsFlis',
  KoronaSpesialFlis: 'KoronaSpesialFlis',
  DineSisteSakerFlis: 'DineSisteSakerFlis', //legg til logging av spesifikke lenker
  UtbetalingerFlis: 'UtbetalingerFlis,',
  InnboksFlis: 'InnboksFlis',
};

export const initializeAmplitude = () => {
  amplitude.getInstance().init('default', '', {
    apiEndpoint: 'amplitude.nav.no/collect-auto',
    saveEvents: false,
    includeUtm: true,
    includeReferrer: true,
    platform: window.location.toString(),        
  });
};

export function logAmplitudeEvent(amplitudeComponentName, amplitudeAction) {
  amplitude.getInstance().logEvent('navigere', {
    amplitudeComponentName,
    amplitudeAction,
  });
}

export function logLenkeTrykkAmplitude(lenkeTekst, amplitudeAction, href) {
  amplitude.getInstance().logEvent('navigere', {
    lenkeTekst,
    amplitudeAction,
    href,
  });
}
