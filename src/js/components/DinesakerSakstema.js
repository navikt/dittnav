import React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import HoyreChevron from 'nav-frontend-chevron';

import i18n from '../../translations/i18n';

import Config from '../Config';

const sakstemaUrlOverride = {
  foreldrepenger: Config.LENKER.dineForeldrepenger.url,
  sykepenger: Config.LENKER.dittSykefravaer.url,
  sykmelding: Config.LENKER.dittSykefravaer.url,
};

class DinesakerSakstema extends React.Component {
  getTemaUrl(temanavn) {
    const temanavnLowerCase = temanavn.toLowerCase();

    if (temanavnLowerCase.includes("oppfølging")) {
      const temaKey = temanavnLowerCase.split(/[\s,]/)[0];
      return sakstemaUrlOverride[temaKey];
    }

    return sakstemaUrlOverride[temanavnLowerCase];
  }

  getStatusMessage(antallUnderBehandling) {
    const { numberToWord } = i18n.nb;

    if (antallUnderBehandling <= 0) {
      return null;
    }
    if (antallUnderBehandling === 1) {
      return <FormattedMessage id="sakstema.antall.under.behandling.en" />;
    }
    return <FormattedMessage id="sakstema.antall.under.behandling.flere" values={{ count: numberToWord(antallUnderBehandling) }} />;
  }

  render() {
    const { dato, temanavn, antallUnderBehandling, href } = this.props;

    return (
      <div className="sak-container">
        <a
          href={this.getTemaUrl(temanavn) || href}
          className="sak-lenke"
          id="dekorator-bottomborder-overstyring"
        >
          <div className="sak-temanavn typo-undertittel">
            { temanavn }
            <HoyreChevron className="sak-chevron" />
          </div>

          <div className="sak-status typo-undertekst">
            { this.getStatusMessage(antallUnderBehandling) }
            <FormattedMessage id="sakstema.sist.oppdatert" />
            {
              dato && dato !== ''
                ? (
                  <FormattedDate
                    value={new Date(dato)}
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
  href: PropTypes.string.isRequired,
  temanavn: PropTypes.string.isRequired,
  dato: PropTypes.string,
  antallUnderBehandling: PropTypes.number.isRequired,
};

DinesakerSakstema.defaultProps = {
  dato: '',
};

export default DinesakerSakstema;
