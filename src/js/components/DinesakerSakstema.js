import React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import HoyreChevron from 'nav-frontend-chevron';

// const statusTilEtikettType = {
//   UNDER_BEHANDLING: 'fokus',
//   FERDIG_BEHANDLET: 'suksess',
//   AVBRUTT: 'advarsel',
//   UKJENT: 'advarsel',
//   ELDRE_ENN_28DAGER: 'info',
//   EMPTY: 'advarsel',
// };

// const statusTilEtikettTekst = {
//   UNDER_BEHANDLING: 'sakstema.under.behandling',
//   FERDIG_BEHANDLET: 'sakstema.ferdig.behandlet',
//   AVBRUTT: 'sakstema.avbrutt',
//   UKJENT: 'sakstema.ukjent',
//   ELDRE_ENN_28DAGER: 'sakstema.eldreenn28',
//   EMPTY: 'sakstema.empty',
// };

class DinesakerSakstema extends React.Component {
  render() {
    const { dato, temanavn, antallUnderBehandling } = this.props;

    const href = '#';

    return (
      <div className="sak-container">
        <a href={href} className="sak-lenke" id="dekorator-bottomborder-overstyring">
          <div className="sak-temanavn typo-undertittel">
            {temanavn}
            <HoyreChevron className="sak-chevron" />
          </div>

          <div className="sak-status typo-undertekst">
            {
              antallUnderBehandling > 0
                ? <FormattedMessage id="sakstema.antall.under.behandling" values={{ count: antallUnderBehandling }} />
                : null
            }
            <FormattedMessage id="sakstema.sist.oppdatert" />
            <FormattedDate
              value={new Date(dato)}
              year="numeric"
              month="short"
              day="numeric"
            />
          </div>
        </a>
      </div>
    );
  }
}

DinesakerSakstema.propTypes = {
  temakode: PropTypes.string.isRequired,
  temanavn: PropTypes.string.isRequired,
  dato: PropTypes.string.isRequired,
  antallUnderBehandling: PropTypes.number.isRequired,
};

DinesakerSakstema.defaultProps = {
};

export default DinesakerSakstema;
