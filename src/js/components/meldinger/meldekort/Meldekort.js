import React from 'react';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import conf from '../../../globalConfig';
import i18n from '../../../../translations/i18n';
import PanelOverskrift from '../../common/PanelOverskrift';
import LenkepanelMedIkon from '../../common/LenkepanelMedIkon';
import { advarsel, feriedager, fremtidig, melding, trekk } from './Meldinger';
import IkonBeskjed from '../../../../assets/IkonBeskjed';
import IkonOppgave from '../../../../assets/IkonOppgave';
import MeldekortType from '../../../types/MeldekortType';

const Meldekort = ({ meldekort, intl }) => {
  if (!meldekort) {
    return null;
  }
  const { formatDateMonth, formatDayAndMonth, numberToWord } = i18n[intl.locale];
  const { antallNyeMeldekort } = meldekort.nyeMeldekort;
  const risikererTrekk = meldekort.nyeMeldekort.nesteMeldekort && meldekort.nyeMeldekort.nesteMeldekort.risikererTrekk;

  const overskrift = (klarForInnsending) => (
    klarForInnsending ? (
      <>
        <span>{fremtidig(meldekort.nyeMeldekort, formatDateMonth)} </span>
        <span>{melding(meldekort.nyeMeldekort.nesteMeldekort, antallNyeMeldekort, formatDayAndMonth, numberToWord)} </span>
        <span>{trekk(!risikererTrekk, formatDateMonth, meldekort.nyeMeldekort.nesteMeldekort)} </span>
        <span>{advarsel(risikererTrekk)} </span>
      </>
    ) : (
      <>
        <span>{fremtidig(meldekort.nyeMeldekort, formatDateMonth)} </span>
        <span>{advarsel(risikererTrekk)} </span>
      </>
    )
  );

  const ingress = (klarForInnsending) => (
    klarForInnsending ? (
      <>
        <span>{feriedager(meldekort)} {(antallNyeMeldekort > 1 ? <F id="meldekort.se.oversikt" /> : <F id="meldekort.send" />)}.</span>
      </>
    ) : (
      <>
        {feriedager(meldekort)}
      </>
    )
  );

  if (antallNyeMeldekort > 0) {
    return (
      <LenkepanelMedIkon
        className="infomelding oppgave"
        data-ga="Dittnav/Varsel"
        alt="Melding om meldekort"
        overskrift={<PanelOverskrift overskrift={overskrift(true)} type="Element" />}
        ingress={ingress(true)}
        href={`${conf.dittNav.NAVNO_URL}${conf.MELDEKORT_PATH}`}
      >
        <IkonOppgave />
      </LenkepanelMedIkon>
    );
  }

  if (meldekort.nyeMeldekort.nesteInnsendingAvMeldekort) {
    return (
      <LenkepanelMedIkon
        className="infomelding meldekort-innsendt"
        data-ga="Dittnav/Varsel"
        alt="Melding om meldekort"
        overskrift={<PanelOverskrift overskrift={overskrift(false)} type="Element" />}
        ingress={ingress(false)}
        href={`${conf.dittNav.NAVNO_URL}${conf.MELDEKORT_PATH}`}
      >
        <IkonBeskjed />
      </LenkepanelMedIkon>
    );
  }
  return null;
};

Meldekort.propTypes = {
  meldekort: MeldekortType,
  intl: intlShape.isRequired,
};

Meldekort.defaultProps = {
  meldekort: null,
};

export default injectIntl(Meldekort);
