import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import i18n from '../../../translations/i18n';
import { IkonDokument, IkonSjekkliste, IkonChat, LenkepanelMedIkon } from '../LenkepanelMedIkon';

const formatFlereEn = (length, i18String) => `${i18String}${length === 1 ? 'en' : 'flere'}`;

const getMessagesIcon = (type) => {
  switch (type) {
    case 'DOKUMENT_VARSEL':
      return <IkonDokument />;
    case 'OPPGAVE_VARSEL':
      return <IkonSjekkliste />;
    default:
      return <IkonChat />;
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
            className="infoMelding"
            data-ga={`Dittnav/Varsel/${message.type.toLowerCase()} melding`}
            alt="Melding fra mininnboks"
            overskrift={overskrift(message, numberToWord)}
            href={message.url}
          >
            {getMessagesIcon(message.type)}
          </LenkepanelMedIkon>
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
