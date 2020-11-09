import React from 'react';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import i18n from '../../../translations/i18n';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonOppgave from '../../../assets/IkonOppgave';
import IkonInnboks from '../../../assets/IkonInnboks';
import { GoogleAnalyticsCategory } from '../../utils/GoogleAnalytics';
import { useMeldinger } from '../../hooks/usePerson';

const getMinInnboksIcon = (type) => {
  switch (type) {
    case 'DOKUMENT_VARSEL':
      return <IkonInnboks />;
    case 'OPPGAVE_VARSEL':
      return <IkonOppgave />;
    default:
      return <IkonInnboks />;
  }
};

const createOverskrift = (message, numberToWord, formatFlereEn) => {
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

const MinInnboks = ({ intl }) => {
  const [{ data: meldinger, isSuccess }] = useMeldinger();
  const { numberToWord } = i18n[intl.locale];
  const formatFlereEn = (length, i18String) => `${i18String}${length === 1 ? 'en' : 'flere'}`;

  if (!isSuccess) {
    return null;
  }

  return (
    <>
      {meldinger.content.map(message => (
        <LenkepanelMedIkon
          key={message.type}
          className="infomelding innboks"
          alt="Melding fra mininnboks"
          overskrift={createOverskrift(message, numberToWord, formatFlereEn)}
          href={message.url}
          gaCategory={GoogleAnalyticsCategory.Forside}
          gaAction={`${message.type.toLowerCase()}`}
        >
          {getMinInnboksIcon(message.type)}
        </LenkepanelMedIkon>
      ))}
    </>
  );
};

MinInnboks.propTypes = {
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

export default injectIntl(MinInnboks);
