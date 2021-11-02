import React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { lenker } from '../utils/lenker';
import { Format } from '../constants';

const sakstemaUrlOverride = {
  KOM: lenker.digisos.url,
  DAG: lenker.dagpenger.url,
  HJE: lenker.hjelpemidler.url,
};

const DinesakerSakstema = (props) => {
  const { sisteOppdatering, temanavn } = props.tema;

  const getTemaUrl = () => {
    const { temakode } = props.tema;
    return sakstemaUrlOverride[temakode] || `${props.url}/tema/${temakode}`;
  };

  return (
    <div className="sak-container">
      <Lenke
        href={getTemaUrl()}
        className="sak-lenke"
        id="sak-lenke-id"
      >
        <div className="sak-temanavn lenke">
          <Undertittel>
            {temanavn}
          </Undertittel>
        </div>

        <div className="sak-status">
          <Undertekst>
            <FormattedMessage id="sakstema.sist.oppdatert" />
            {
              sisteOppdatering && sisteOppdatering !== ''
                ? (
                  <FormattedDate
                    value={moment(sisteOppdatering, Format.SAKSTEMA)}
                    year="numeric"
                    month="short"
                    day="numeric"
                  />
                ) : <FormattedMessage id="sakstema.dato.ukjent" />
            }
          </Undertekst>
        </div>
      </Lenke>
    </div>
  );
};

DinesakerSakstema.propTypes = {
  tema: PropTypes.shape({
    kode: PropTypes.string.isRequired,
    navn: PropTypes.string.isRequired,
    sistEndret: PropTypes.string.isRequired,
  }).isRequired,
  url: PropTypes.string.isRequired,
};

export default DinesakerSakstema;
