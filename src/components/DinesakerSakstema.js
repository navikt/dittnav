import React from 'react';
import { FormattedDate, FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import i18n from '../language/i18n';
import { lenker } from '../utils/lenker';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory, trackEvent, removeFragment } from '../utils/googleAnalytics';
import { Format } from '../constants';

const sakstemaUrlOverride = {
  KOM: lenker.digisos.url,
  DAG: lenker.dagpenger.url,
  HJE: lenker.hjelpemidler.url,
};

const DinesakerSakstema = (props) => {
  const intl = useIntl();
  const { sisteOppdatering, temanavn } = props.tema;

  const getTemaUrl = () => {
    const { temakode } = props.tema;
    return sakstemaUrlOverride[temakode] || `${lenker.saksoversiktTema.url}/${temakode}`;
  };

  const getStatusMelding = () => {
    const { numberToWord } = i18n[intl.locale] || i18n.nb;
    const { antallStatusUnderBehandling } = props.tema;

    if (antallStatusUnderBehandling <= 0) {
      return null;
    }
    if (antallStatusUnderBehandling === 1) {
      return <FormattedMessage id="sakstema.antall.under.behandling.en" />;
    }
    return (
      <FormattedMessage id="sakstema.antall.under.behandling.flere" values={{ count: numberToWord(antallStatusUnderBehandling) }} />
    );
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
            {temanavn}
          </Undertittel>
        </div>

        <div className="sak-status">
          <Undertekst>
            {getStatusMelding()}
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
    temakode: PropTypes.string.isRequired,
    temanavn: PropTypes.string.isRequired,
    sisteOppdatering: PropTypes.string.isRequired,
    antallStatusUnderBehandling: PropTypes.number.isRequired,
  }).isRequired,
};

export default DinesakerSakstema;
