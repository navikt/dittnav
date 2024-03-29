import React from 'react';
import { FormattedMessage as F, useIntl } from 'react-intl';
import { Path } from '../../../constants';
import i18n from '../../../language/i18n';
import PanelOverskrift from '../../common/PanelOverskrift';
import LenkepanelMedIkon from '../../common/LenkepanelMedIkon';
import { advarsel, feriedager, fremtidig, melding, trekk } from './Meldinger';
import IkonBeskjed from '../../../assets/IkonBeskjed';
import IkonOppgave from '../../../assets/IkonOppgave';
import { listOfActions, listOfComponentNames } from '../../../utils/amplitudeUtils';
import { buildNavNoUrl } from '../../../utils/api';
import { useMeldekort } from '../../../hooks/usePerson';

const isMeldekortbruker = (meldekort) => (
  meldekort && meldekort.content ? meldekort.content.meldekortbruker : false
);

const Meldekort = () => {
  const [{ data: meldekort, isSuccess }] = useMeldekort();
  const intl = useIntl();

  if (!isSuccess || !meldekort.content || !isMeldekortbruker(meldekort)) {
    return null;
  }

  const { formatDateMonth, formatDayAndMonth, numberToWord } = i18n[intl.locale];
  const { antallNyeMeldekort } = meldekort.content.nyeMeldekort;
  const risikererTrekk = meldekort.content.nyeMeldekort.nesteMeldekort && meldekort.content.nyeMeldekort.nesteMeldekort.risikererTrekk;

  const overskrift = (klarForInnsending) => (
    klarForInnsending ? (
      <>
        <span>{fremtidig(meldekort.content.nyeMeldekort, formatDateMonth)} </span>
        <span>{melding(meldekort.content.nyeMeldekort.nesteMeldekort, antallNyeMeldekort, formatDayAndMonth, numberToWord)} </span>
        <span>{trekk(!risikererTrekk, formatDateMonth, meldekort.content.nyeMeldekort.nesteMeldekort)} </span>
        <span>{advarsel(risikererTrekk)} </span>
      </>
    ) : (
      <>
        <span>{fremtidig(meldekort.content.nyeMeldekort, formatDateMonth)} </span>
        <span>{advarsel(risikererTrekk)} </span>
      </>
    )
  );

  const ingress = (klarForInnsending) => (
    klarForInnsending ? (
      <>
        <span>{feriedager(meldekort.content)} {(antallNyeMeldekort > 1 ? <F id="meldekort.se.oversikt" /> : <F id="meldekort.send" />)}.</span>
      </>
    ) : (
      <>
        {feriedager(meldekort.content)}
      </>
    )
  );

  if (antallNyeMeldekort > 0) {
    return (
      <LenkepanelMedIkon
        className="infomelding oppgave"
        alt="Melding om meldekort"
        overskrift={<PanelOverskrift overskrift={overskrift(true)} type="Element" />}
        ingress={ingress(true)}
        href={`${buildNavNoUrl(Path.MELDEKORT)}`}
        amplitudeAction={listOfActions.TrykkPaaBrukernotifikasjon}
        amplitudeComponentName={listOfComponentNames.brukernotifikasjon.MeldekortKlar}
      >
        <IkonOppgave />
      </LenkepanelMedIkon>
    );
  }

  if (meldekort.content.nyeMeldekort.nesteInnsendingAvMeldekort) {
    return (
      <LenkepanelMedIkon
        className="infomelding meldekort-innsendt"
        alt="Melding om meldekort"
        overskrift={<PanelOverskrift overskrift={overskrift(false)} type="Element" />}
        ingress={ingress(false)}
        href={`${buildNavNoUrl(Path.MELDEKORT)}`}
        amplitudeAction={listOfActions.TrykkPaaBrukernotifikasjon}
        amplitudeComponentName={listOfComponentNames.brukernotifikasjon.MeldekortVent}
      >
        <IkonBeskjed />
      </LenkepanelMedIkon>
    );
  }
  return null;
};

export default Meldekort;
