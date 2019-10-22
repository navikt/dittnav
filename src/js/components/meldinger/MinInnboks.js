import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import i18n from '../../../translations/i18n';
import { IkonMelding, IkonOppgave, LenkepanelMedIkon } from '../paneler/LenkepanelMedIkon';
import PanelOverskrift from '../paneler/PanelOverskrift';

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

const getOverskrift = (message, numberToWord, formatFlereEn) => {
  const overskrift = (
    <F
      id={formatFlereEn(message.antall, `mininnboks.${message.type.toLowerCase()}.meldinger.`)}
      values={{ count: numberToWord(message.antall) }}
    />
  );

  return (
    <PanelOverskrift
      overskrift={overskrift}
      type="Element"
    />
  );
};

const MinInnboks = ({ mininnboks, intl }) => {
  const { numberToWord } = i18n[intl.locale];
  const formatFlereEn = (length, i18String) => `${i18String}${length === 1 ? 'en' : 'flere'}`;

  return (
    <>
      {mininnboks && mininnboks.map(message => (
        <LenkepanelMedIkon
          key={message.type}
          className="infoMelding"
          data-ga={`Dittnav/Varsel/${message.type.toLowerCase()} melding`}
          alt="Melding fra mininnboks"
          overskrift={getOverskrift(message, numberToWord, formatFlereEn)}
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
