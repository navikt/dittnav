import { shape, string, number, bool } from 'prop-types';

const NesteMeldekortType = shape({
  sisteDatoForTrekk: string,
  risikererTrekk: bool,
  uke: string,
  kanSendesFra: string,
  til: string,
  fra: string,
});

const NyeMeldekortType = shape({
  antallNyeMeldekort: number,
  nesteInnsendingAvMeldekort: string,
  nesteMeldekort: NesteMeldekortType,
});

const MeldekortType = shape({
  nyeMeldekort: NyeMeldekortType,
  resterendeFeriedager: number,
  etterregistrerteMeldekort: number,
});

export default MeldekortType;
