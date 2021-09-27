import React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import { lenker } from '../utils/lenker';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory, trackEvent, removeFragment } from '../utils/googleAnalytics';
import { Format } from '../constants';

const sakstemaUrlOverride = {
  KOM: lenker.digisos.url,
  DAG: lenker.dagpenger.url,
  HJE: lenker.hjelpemidler.url,
};

const DinesakerSakstema = (props) => {
  const { sistEndret, navn } = props.tema;

  const getTemaUrl = () => {
    const { kode } = props.tema;
    return sakstemaUrlOverride[kode] || `${lenker.saksoversiktTema.url}/${kode}`;
  };

  return (
    <div className="sak-container">
      <Lenke
        href={getTemaUrl()}
        className="sak-lenke"
        id="sak-lenke-id"
        onClick={() => trackEvent(
          GoogleAnalyticsCategory.Forside,
          GoogleAnalyticsAction.DineSisteSaker,
          removeFragment(getTemaUrl()),
        )}
      >
        <div className="sak-temanavn lenke">
          <Undertittel>
            {navn}
          </Undertittel>
        </div>

        <div className="sak-status">
          <Undertekst>
            <FormattedMessage id="sakstema.sist.oppdatert" />
            {
              sistEndret && sistEndret !== ''
                ? (
                  <FormattedDate
                    value={moment(sistEndret, Format.SAKSTEMA)}
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
};

export default DinesakerSakstema;
