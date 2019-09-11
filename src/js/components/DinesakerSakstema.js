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

const statusTilEtikettTekst = {
  UNDER_BEHANDLING: 'sakstema.under.behandling',
  FERDIG_BEHANDLET: 'sakstema.ferdig.behandlet',
  AVBRUTT: 'sakstema.avbrutt',
  UKJENT: 'sakstema.ukjent',
  ELDRE_ENN_28DAGER: 'sakstema.eldreenn28',
  EMPTY: 'sakstema.empty',
};

class DinesakerSakstema extends React.Component {
  render() {
    const { dato, status, temanavn, href } = this.props;

    return (
      <div className="sak-container">
        <a href={href} className="sak-lenke" id="dekorator-bottomborder-overstyring">
          <div className="sak-temanavn">
            <span className="typo-undertittel">
              {temanavn}
            </span>
            <HoyreChevron className="sak-chevron" />
          </div>

          <div className="sak-dato">
            <span className="typo-undertekst">
              <FormattedMessage id="sakstema.sist.oppdatert" />
              {' '}
              <FormattedDate
                value={new Date(dato)}
                year="numeric"
                month="long"
                day="numeric"
              />
              {' - '}
              <FormattedMessage id={statusTilEtikettTekst[status]} />
            </span>
          </div>
        </a>
      </div>
    );
  }
}

DinesakerSakstema.propTypes = {
  dato: PropTypes.string,
  status: PropTypes.string,
  temanavn: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

DinesakerSakstema.defaultProps = {
  dato: '01-01-1980',
  status: 'EMPTY',
};

export default DinesakerSakstema;
