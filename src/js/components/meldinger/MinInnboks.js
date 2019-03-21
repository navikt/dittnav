import React, { Component } from 'react';
import PropTypes from 'prop-types';
import i18n from 'translations/i18n';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';

const formatFlereEn = (length, i18String) => `${i18String}${length === 1 ? 'en' : 'flere'}`;

const getMessagesIcon = (type) => {
  switch (type) {
    case 'DOKUMENT_VARSEL':
      return 'document-icon';
    case 'OPPGAVE_VARSEL':
      return 'registration-icon';
    default:
      return 'mininnboks-default-icon';
  }
};

class MinInnboks extends Component {
  render() {
    const { numberToWord } = i18n[this.props.intl.locale];
    const messages = this.props.mininnboks;
    return (
      <React.Fragment>
        {messages && messages.map(message => (
          <a
            key={message.type}
            data-ga={`Dittnav/Varsel/${message.type.toLowerCase()} melding`}
            className="message clickable"
            href={message.url}
          >
            <span className={`icon ${getMessagesIcon(message.type)}`} aria-label={`${message.type.toLowerCase().replace(/_/g, ' ')} ikon`} />
            <div className="texts">
              <p><F id={formatFlereEn(message.antall, `mininnboks.${message.type.toLowerCase()}.meldinger.`)} values={{ count: numberToWord(message.antall) }} /></p>
            </div>
          </a>
        ))}
      </React.Fragment>
    );
  }
}

export const MinInnboksType = PropTypes.arrayOf(PropTypes.shape({ type: PropTypes.string.isRequired, uri: PropTypes.string }));

MinInnboks.propTypes = {
  mininnboks: MinInnboksType,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

MinInnboks.defaultProps = {
  mininnboks: [],
};

export default injectIntl(MinInnboks);
