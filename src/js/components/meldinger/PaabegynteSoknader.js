import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'translations/i18n';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';

class PaabegynteSoknader extends Component {
  render() {
    const { paabegynteSoknader } = this.props;

    if (!paabegynteSoknader || paabegynteSoknader.antallPaabegynte === 0) return null;

    return (
      <a data-ga="Dittnav/Varsel/Paabegynt soknad" className="message clickable" href={paabegynteSoknader.url}>
        <span className="icon document-icon" aria-label="dokument-ikon" />
        <div className="texts">
          <p><F id={paabegynteSoknader.antallPaabegynte === 1 ? 'saksoversikt.soknad.en' : 'saksoversikt.soknad.flere'} values={{ count: i18n[this.props.intl.locale].numberToWord(paabegynteSoknader.antallPaabegynte) }} /></p>
          <p id="paabegynte-tekst"><F id="saksoversikt.lenke" /></p>
        </div>
      </a>
    );
  }
}

export const PaabegynteSoknaderType = PropTypes.shape({
  url: PropTypes.string.isRequired,
  antallPaabegynte: PropTypes.number.isRequired,
});

PaabegynteSoknader.propTypes = {
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  paabegynteSoknader: PaabegynteSoknaderType,
};

PaabegynteSoknader.defaultProps = {
  paabegynteSoknader: null,
};

export default injectIntl(PaabegynteSoknader);
