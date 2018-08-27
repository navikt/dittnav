import React, { Component } from 'react';
import PropTypes from 'prop-types';
import conf from 'js/Config';
import i18n from 'translations/i18n';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';

class PaabegynteSoknader extends Component {
  render() {
    const saker = this.props.paabegynteSaker;

    if (!saker || saker.length === 0) return null;

    const url = saker.length === 1 ? saker[0].uri : conf.dittNav.SAKSOVERSIKT_URL;
    return (
      <a data-ga="Dittnav/Varsel/Paabegynt soknad" className="message clickable" href={url}>
        <span className="icon document-icon" aria-label="dokument-ikon" />
        <div className="texts">
          <p><F id={saker.length === 1 ? 'saksoversikt.soknad.en' : 'saksoversikt.soknad.flere'} values={{ count: i18n[this.props.intl.locale].numberToWord(saker.length) }} /></p>
          <p id="paabegynte-tekst"><F id="saksoversikt.lenke" /></p>
        </div>
      </a>
    );
  }
}

export const PaabegynteSakType = PropTypes.shape({
  uri: PropTypes.string.isRequired,
});

PaabegynteSoknader.propTypes = {
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  paabegynteSaker: PropTypes.arrayOf(PaabegynteSakType),
};

PaabegynteSoknader.defaultProps = {
  paabegynteSaker: null,
};

export default injectIntl(PaabegynteSoknader);
