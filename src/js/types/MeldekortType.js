import PropTypes from 'prop-types';

const NesteMeldekortType = PropTypes.shape({
  sisteDatoForTrekk: PropTypes.string,
  risikererTrekk: PropTypes.bool,
  uke: PropTypes.string,
  kanSendesFra: PropTypes.string,
  til: PropTypes.string,
  fra: PropTypes.string,
});

const NyeMeldekortType = PropTypes.shape({
  antallNyeMeldekort: PropTypes.number,
  nesteInnsendingAvMeldekort: PropTypes.string,
  nesteMeldekort: NesteMeldekortType,
});

const MeldekortType = PropTypes.shape({
  nyeMeldekort: NyeMeldekortType,
  resterendeFeriedager: PropTypes.number,
  etterregistrerteMeldekort: PropTypes.number,
});

export default MeldekortType;
