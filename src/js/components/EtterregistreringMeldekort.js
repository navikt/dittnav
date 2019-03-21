import React, { Component } from 'react';
import PropTypes from 'prop-types';
import conf from 'js/Config';
import i18n from 'translations/i18n';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';

const tallordForMeldekort = (antallMeldekort, translater) => (antallMeldekort === 1 ? translater.oneNeuter() : translater.numberToWord(antallMeldekort));

class EtterregistreringMeldekort extends Component {
  render() {
    const { ettereg, intl } = this.props;
    if (ettereg && ettereg.etterregistrerteMeldekort && ettereg.etterregistrerteMeldekort > 0) {
      return (
        <a data-ga="Dittnav/Varsel" className="message clickable meldekort" href={`${conf.dittNav.SERVICES_URL}${conf.ARBEID_PATH}?goto=${conf.ETTERREGISTRERT_PATH}`}>
          <span className="icon meldekort-icon" aria-label="alarm-ikon" />
          <span className="texts">
            <span>{<F id="meldekort.etterregistreringer" values={{ etterregistreringer: tallordForMeldekort(ettereg.etterregistrerteMeldekort, i18n[intl.locale]) }} />}</span>
          </span>
        </a>
      );
    }
    return null;
  }
}

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
