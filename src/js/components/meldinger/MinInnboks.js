import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import i18n from '../../../translations/i18n';
import { IkonBlyant, LenkepanelMedIkon } from '../LenkepanelMedIkon';

const formatFlereEn = (length, i18String) => `${i18String}${length === 1 ? 'en' : 'flere'}`;

// TODO : switche mellom ikoner
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

const overskrift = (message, numberToWord) => (
  <F id={formatFlereEn(message.antall, `mininnboks.${message.type.toLowerCase()}.meldinger.`)} values={{ count: numberToWord(message.antall) }} />
);

class MinInnboks extends Component {
  render() {
    const { numberToWord } = i18n[this.props.intl.locale];
    const messages = this.props.mininnboks;
    return (
      <>
        {messages && messages.map(message => (
          <LenkepanelMedIkon
            key={message.type}
            className="infoMeldinger"
            data-ga={`Dittnav/Varsel/${message.type.toLowerCase()} melding`}
            alt="Melding fra mininnboks"
            overskrift={overskrift(message, numberToWord)}
            href={message.url}
          >
            <IkonBlyant />
          </LenkepanelMedIkon>
          // TODO : switche mellom ikoner
          // <span className={`icon ${getMessagesIcon(message.type)}`} aria-label={`${message.type.toLowerCase().replace(/_/g, ' ')} ikon`} />
        ))}
      </>
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
