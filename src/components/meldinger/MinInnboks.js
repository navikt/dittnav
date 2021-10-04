import React from 'react';
import { FormattedMessage as F, useIntl } from 'react-intl';
import i18n from '../../language/i18n';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonOppgave from '../../assets/IkonOppgave';
import IkonMinInnboks from '../../assets/IkonMinInnboks';
import { GoogleAnalyticsCategory } from '../../utils/googleAnalytics';
import { useMeldinger } from '../../hooks/usePerson';
import IkonBrevVedtak from '../../assets/IkonBrevVedtak';

const getMinInnboksIcon = (type) => {
  switch (type) {
    case 'DOKUMENT_VARSEL':
      return <IkonBrevVedtak />;
    case 'OPPGAVE_VARSEL':
      return <IkonOppgave />;
    default:
      return <IkonMinInnboks />;
  }
};

const isDokumentVarsel = (type) => (
  type === 'DOKUMENT_VARSEL'
);

const createOverskrift = (message, numberToWord, formatFlereEn) => {
  const overskrift = (
    <F id={formatFlereEn(message.antall, `mininnboks.${message.type.toLowerCase()}.meldinger.`)} values={{ count: numberToWord(message.antall) }} />
  );

  return (
    <PanelOverskrift overskrift={overskrift} type="Element" />
  );
};

const MinInnboks = () => {
  const [{ data: meldinger, isSuccess }] = useMeldinger();
  const { numberToWord } = i18n[useIntl().locale];
  const formatFlereEn = (length, i18String) => `${i18String}${length === 1 ? 'en' : 'flere'}`;

  if (!isSuccess) {
    return null;
  }

  return (
    <>
      {meldinger.content.map(message => (
        <LenkepanelMedIkon
          key={message.type}
          className={isDokumentVarsel(message.type) ? 'infomelding beskjed' : 'infomelding innboks'}
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

export default MinInnboks;
