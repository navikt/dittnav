import React from 'react';
import { FormattedDate, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import i18n from '../../translations/i18n';
import { lenker } from '../utils/lenker';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory, trackEvent, removeFragment } from '../utils/googleAnalytics';
import { Format } from '../constants';

const sakstemaUrlOverride = {
  KOM: lenker.digisos.url,
};

class DinesakerSakstema extends React.Component {
  getTemaUrl() {
    const { temakode } = this.props.tema;
    return sakstemaUrlOverride[temakode] || `${lenker.saksoversiktTema.url}/${temakode}`;
  }

  getStatusMelding() {
    const { numberToWord } = i18n[this.props.intl.locale] || i18n.nb;
    const { antallStatusUnderBehandling } = this.props.tema;

    if (antallStatusUnderBehandling <= 0) {
      return null;
    }
    if (antallStatusUnderBehandling === 1) {
      return <FormattedMessage id="sakstema.antall.under.behandling.en" />;
    }
    return (
      <FormattedMessage
        id="sakstema.antall.under.behandling.flere"
        values={{ count: numberToWord(antallStatusUnderBehandling) }}
      />
    );
  }

  render() {
    const { sisteOppdatering, temanavn } = this.props.tema;

    return (
      <div className="sak-container">
        <Lenke
          href={this.getTemaUrl()}
          className="sak-lenke"
          id="sak-lenke-id"
          onClick={() => trackEvent(
            GoogleAnalyticsCategory.Forside,
            GoogleAnalyticsAction.DineSisteSaker,
            removeFragment(this.getTemaUrl()),
          )}
        >
          <div className="sak-temanavn lenke">
            <Undertittel>
              { temanavn }
            </Undertittel>
          </div>

          <div className="sak-status">
            <Undertekst>
              { this.getStatusMelding() }
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
  }
}

DinesakerSakstema.propTypes = {
  tema: PropTypes.shape({
    temakode: PropTypes.string.isRequired,
    temanavn: PropTypes.string.isRequired,
    sisteOppdatering: PropTypes.string.isRequired,
    antallStatusUnderBehandling: PropTypes.number.isRequired,
  }).isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(DinesakerSakstema);
