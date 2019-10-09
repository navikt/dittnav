import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import conf from '../../Config';
import i18n from '../../../translations/i18n';
import { IkonOppgave, LenkepanelMedIkon } from '../LenkepanelMedIkon';

const tallordForMeldekort = (antallMeldekort, translater) => (antallMeldekort === 1 ? translater.oneNeuter() : translater.numberToWord(antallMeldekort));
const overskrift = (ettereg, intl) => (
  <F id="meldekort.etterregistreringer" values={{ etterregistreringer: tallordForMeldekort(ettereg.etterregistrerteMeldekort, i18n[intl.locale]) }} />
);

const EtterregistreringMeldekort = ({ ettereg, intl }) => {
  if (ettereg && ettereg.etterregistrerteMeldekort && ettereg.etterregistrerteMeldekort > 0) {
    return (
      <LenkepanelMedIkon
        className="infoMelding"
        data-ga="Dittnav/Varsel"
        alt="Melding om etterregistrerte meldekort"
        overskrift={overskrift(ettereg, intl)}
        href={`${conf.dittNav.NAV_URL}${conf.ETTERREGISTRERT_PATH}`}
      >
        <IkonOppgave />
      </LenkepanelMedIkon>
    );
  }
  return null;
};

export const MeldekortType = PropTypes.shape({
  etterregistrerteMeldekort: PropTypes.number,
});

EtterregistreringMeldekort.propTypes = {
  ettereg: MeldekortType,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

EtterregistreringMeldekort.defaultProps = {
  ettereg: null,
};

export default injectIntl(EtterregistreringMeldekort);
