import React from 'react';
import { FormattedDate, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import { Undertekst, Undertittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';
import HoyreChevron from 'nav-frontend-chevron';

import i18n from '../../translations/i18n';

import Config from '../Config';

const sakstemaUrlOverride = {
  // FOR: Config.LENKER.dineForeldrepenger.url,
  // SYK: Config.LENKER.dittSykefravaer.url,
  // SYM: Config.LENKER.dittSykefravaer.url,
  // SYK_SYM: Config.LENKER.dittSykefravaer.url,
  // SYM_SYK: Config.LENKER.dittSykefravaer.url,
};

class DinesakerSakstema extends React.Component {
  getTemaUrl() {
    const { temakode } = this.props.tema;
    return sakstemaUrlOverride[temakode] || `${Config.LENKER.saksoversiktTema.url}/${temakode}`;
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
        >
          <div className="sak-temanavn">
            <Undertittel>
              { temanavn }
            </Undertittel>
            <HoyreChevron className="sak-chevron" />
          </div>

          <div className="sak-status">
            <Undertekst>
              { this.getStatusMelding() }
              <FormattedMessage id="sakstema.sist.oppdatert" />
              {
                sisteOppdatering && sisteOppdatering !== ''
                  ? (
                    <FormattedDate
                      value={new Date(sisteOppdatering)}
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
