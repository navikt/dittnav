import React from 'react';

import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import EtikettBase from 'nav-frontend-etiketter';
import HoyreChevron from 'nav-frontend-chevron';

import PropTypes from 'prop-types';

import { FormattedDate } from 'react-intl';

// TODO:    -lokaliser tekst

const statusTilEtikettType = {
  UNDER_BEHANDLING: 'fokus',
  FERDIG_BEHANDLET: 'suksess',
  AVBRUTT: 'advarsel',
  UKJENT: 'advarsel',
  ELDRE_ENN_28DAGER: 'info',
  EMPTY: 'advarsel',
};

const statusTilEtikettTekst = {
  UNDER_BEHANDLING: 'Under behandling',
  FERDIG_BEHANDLET: 'Ferdig behandlet',
  AVBRUTT: 'Avbrutt',
  UKJENT: 'Ukjent status',
  ELDRE_ENN_28DAGER: 'Eldre enn 28 dager',
  EMPTY: 'Tom',
};

class DinesakerSakstema extends React.Component {
  render() {
    const { dato, status, temanavn, href } = this.props;

    return (
      <div className="sak-container">
        <a href={href} className="sak-lenke" id="dekorator-bottomborder-overstyring">
          <div className="sak-innhold">
            <Undertittel>
              {temanavn}
            </Undertittel>

            <div className="sak-etikett-div">
              <EtikettBase type={statusTilEtikettType[status]} className="sak-etikett">
                <Undertekst>
                  {statusTilEtikettTekst[status]}
                </Undertekst>
              </EtikettBase>
            </div>

            <div className="sak-chevron-div">
              <HoyreChevron className="sak-chevron" />
            </div>
          </div>

          <Undertekst className="sak-dato">
            {'Sist oppdatert '}
            <FormattedDate
              value={new Date(dato)}
              year="numeric"
              month="long"
              day="numeric"
            />
          </Undertekst>
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
