import React from 'react';
import { FormattedMessage as F, useIntl } from 'react-intl';
import message from 'react-intl/src/components/message';
import i18n from '../../language/i18n';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonOppgave from '../../assets/IkonOppgave';
import IkonMinInnboks from '../../assets/IkonMinInnboks';
import { listOfActions, listOfComponentNames } from '../../utils/amplitudeUtils';
import { useMeldinger } from '../../hooks/usePerson';

const getMinInnboksIcon = (type) => {
  switch (type) {
    case 'DOKUMENT_VARSEL':
      return <IkonMinInnboks />;
    case 'OPPGAVE_VARSEL':
      return <IkonOppgave />;
    default:
      return <IkonMinInnboks />;
  }
};

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
      {meldinger.content.map(melding => (
        (melding.type === 'ULEST' || melding.type === 'UBESVART')
          ? null 
          : (
            <LenkepanelMedIkon
              key={melding.type}
              className="infomelding innboks"
              alt="Melding fra mininnboks"
              overskrift={createOverskrift(melding, numberToWord, formatFlereEn)}
              href={melding.url}
              amplitudeComponentName={melding.type === 'DOKUMENT_VARSEL'
                ? listOfComponentNames.brukernotifikasjon.UlesteDokumenter
                : listOfComponentNames.brukernotifikasjon.UlesteOppgaver}
              amplitudeAction={listOfActions.TrykkPaaBrukernotifikasjon}
            >
              {getMinInnboksIcon(melding.type)}
            </LenkepanelMedIkon>
          )
      ))}
    </>
  );
};

export default MinInnboks;
