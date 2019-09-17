import React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import HoyreChevron from 'nav-frontend-chevron';

import i18n from '../../translations/i18n';

import Config from '../Config';

const sakstemaUrlOverride = {
  FOR: Config.LENKER.dineForeldrepenger.url,
  SYK: Config.LENKER.dittSykefravaer.url,
  SYM: Config.LENKER.dittSykefravaer.url,
  SYK_SYM: Config.LENKER.dittSykefravaer.url,
  SYM_SYK: Config.LENKER.dittSykefravaer.url,
};

const temaBaseUrl = Config.LENKER.saksoversiktTema.url;

class DinesakerSakstema extends React.Component {
  getTemaUrl() {
    const { temakode } = this.props.tema;

    // if (temanavnLowerCase.includes('oppfølging')) {
    //   const sakstemaKey = temanavnLowerCase.split(/[\s,]/)[0];
    //   return sakstemaUrlOverride[sakstemaKey];
    // }

    return sakstemaUrlOverride[temakode] || temaBaseUrl + temakode;
  }

  getStatusMelding() {
    const { numberToWord } = i18n.nb;
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
        <a
          href={this.getTemaUrl()}
          className="sak-lenke"
          id="dekorator-bottomborder-overstyring"
        >
          <div className="sak-temanavn typo-undertittel">
            { temanavn }
            <HoyreChevron className="sak-chevron" />
          </div>

          <div className="sak-status typo-undertekst">
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
                ) : 'ukjent'
            }
          </div>
        </a>
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
};

export default DinesakerSakstema;
