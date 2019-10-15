import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import i18n from '../../../translations/i18n';
import { IkonMelding, IkonOppgave, LenkepanelMedIkon, createOverskrift } from '../LenkepanelMedIkon';

const getMinInnboksIcon = (type) => {
  switch (type) {
    case 'DOKUMENT_VARSEL':
      return <IkonMelding />;
    case 'OPPGAVE_VARSEL':
      return <IkonOppgave />;
    default:
      return <IkonMelding />;
  }
};

const formatFlereEn = (length, i18String) => `${i18String}${length === 1 ? 'en' : 'flere'}`;

const overskrift = (message, numberToWord) => createOverskrift(
  <F id={formatFlereEn(message.antall, `mininnboks.${message.type.toLowerCase()}.meldinger.`)} values={{ count: numberToWord(message.antall) }} />,
  'Element',
);

const MinInnboks = ({ mininnboks, intl }) => {
  const { numberToWord } = i18n[intl.locale];

  return (
    <>
      {mininnboks && mininnboks.map(message => (
        <LenkepanelMedIkon
          key={message.type}
          className="infoMelding"
          data-ga={`Dittnav/Varsel/${message.type.toLowerCase()} melding`}
          alt="Melding fra mininnboks"
          overskrift={overskrift(message, numberToWord)}
          href={message.url}
        >
          {getMinInnboksIcon(message.type)}
        </LenkepanelMedIkon>
      ))}
    </>
  );
};

export const MinInnboksType = PropTypes.arrayOf(PropTypes.shape({
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
}));

MinInnboks.propTypes = {
  mininnboks: MinInnboksType,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

MinInnboks.defaultProps = {
  mininnboks: [],
};

export default injectIntl(MinInnboks);
