import React from 'react';

import EtikettBase from 'nav-frontend-etiketter';
import HoyreChevron from 'nav-frontend-chevron';

import PropTypes from 'prop-types';

import { FormattedDate, FormattedMessage } from 'react-intl';

const statusTilEtikettType = {
  UNDER_BEHANDLING: 'fokus',
  FERDIG_BEHANDLET: 'suksess',
  AVBRUTT: 'advarsel',
  UKJENT: 'advarsel',
  ELDRE_ENN_28DAGER: 'info',
  EMPTY: 'advarsel',
};

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
          <div className="sak-innhold">
            <span className="typo-undertittel">
              {temanavn}
            </span>
            <div className="sak-chevron-div">
              <HoyreChevron className="sak-chevron" />
            </div>
          </div>

          <div>
            <EtikettBase type={statusTilEtikettType[status]} typo="undertekst" className="sak-etikett">
              <FormattedMessage id={statusTilEtikettTekst[status]} />
            </EtikettBase>
            <span className="typo-undertekst">
              <FormattedMessage id="sakstema.sist.oppdatert" />
              {' '}
              <FormattedDate
                value={new Date(dato)}
                year="numeric"
                month="long"
                day="numeric"
              />
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
  status: 'UKJENT',
};

export default DinesakerSakstema;
