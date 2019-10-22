import React from 'react';
import PropTypes from 'prop-types';
import MeldekortLenkePanel from './meldekort/MeldekortLenkePanel';
import MeldekortPanel from './meldekort/MeldekortPanel';

const Meldekort = ({ meldekort }) => {
  if (!meldekort) {
    return null;
  }

  const { antallNyeMeldekort } = meldekort.nyeMeldekort;
  const risikererTrekk = meldekort.nyeMeldekort.nesteMeldekort && meldekort.nyeMeldekort.nesteMeldekort.risikererTrekk;

  if (antallNyeMeldekort > 0) {
    return <MeldekortLenkePanel meldekort={meldekort} count={antallNyeMeldekort} risikererTrekk={risikererTrekk} />;
  }

  if (meldekort.nyeMeldekort.nesteInnsendingAvMeldekort) {
    return <MeldekortPanel meldekort={meldekort} risikererTrekk={risikererTrekk} />;
  }
  return null;
};

const NesteMeldekort = PropTypes.shape({
  sisteDatoForTrekk: PropTypes.string,
  risikererTrekk: PropTypes.bool,
  uke: PropTypes.string,
  kanSendesFra: PropTypes.string,
  til: PropTypes.string,
  fra: PropTypes.string,
});

const NyeMeldekort = PropTypes.shape({
  antallNyeMeldekort: PropTypes.number,
  nesteInnsendingAvMeldekort: PropTypes.string,
  nesteMeldekort: NesteMeldekort,
});

export const MeldekortType = PropTypes.shape({
  nyeMeldekort: NyeMeldekort,
  resterendeFeriedager: PropTypes.number,
  etterregistrerteMeldekort: PropTypes.number,
});

Meldekort.propTypes = {
  meldekort: MeldekortType,
};

Meldekort.defaultProps = {
  meldekort: null,
};

export default Meldekort;
