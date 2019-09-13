import React from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import HoyreChevron from 'nav-frontend-chevron';

import i18n from '../../translations/i18n';

class DinesakerSakstema extends React.Component {
  render() {
    const { dato, href, temanavn, antallUnderBehandling } = this.props;
    const { numberToWord } = i18n.nb;

    const statusMessage = (() => {
      if (antallUnderBehandling <= 0) {
        return null;
      }
      if (antallUnderBehandling === 1) {
        return <FormattedMessage id="sakstema.antall.under.behandling.en" />;
      }
      return <FormattedMessage id="sakstema.antall.under.behandling.flere" values={{ count: numberToWord(antallUnderBehandling) }} />;
    })();

    return (
      <div className="sak-container">
        <a href={href} className="sak-lenke" id="dekorator-bottomborder-overstyring">
          <div className="sak-temanavn typo-undertittel">
            {temanavn}
            <HoyreChevron className="sak-chevron" />
          </div>

          <div className="sak-status typo-undertekst">
            { statusMessage }
            <FormattedMessage id="sakstema.sist.oppdatert" />
            <FormattedDate
              value={new Date(dato)}
              year="numeric"
              month="short"
              day="numeric"
            />
          </div>
        </a>
      </div>
    );
  }
}

DinesakerSakstema.propTypes = {
  href: PropTypes.string.isRequired,
  temanavn: PropTypes.string.isRequired,
  dato: PropTypes.string.isRequired,
  antallUnderBehandling: PropTypes.number.isRequired,
};

DinesakerSakstema.defaultProps = {
};

export default DinesakerSakstema;
