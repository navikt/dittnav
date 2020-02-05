import React from 'react';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import PanelOverskrift from '../../common/PanelOverskrift';
import conf from '../../../Config';
import { IkonBeskjed, IkonOppgave, LenkepanelMedIkon } from '../../common/LenkepanelMedIkon';
import { advarsel, feriedager, fremtidig, melding, trekk } from './Meldinger';
import i18n from '../../../../translations/i18n';

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
        className="infomelding"
        data-ga="Dittnav/Varsel"
        alt="Melding om meldekort"
        overskrift={<PanelOverskrift overskrift={overskrift(true)} type="Element" />}
        ingress={ingress(true)}
        href={`${conf.dittNav.NAV_URL}${conf.MELDEKORT_PATH}`}
      >
        <IkonOppgave />
      </LenkepanelMedIkon>
    );
  }

  if (meldekort.nyeMeldekort.nesteInnsendingAvMeldekort) {
    return (
      <LenkepanelMedIkon
        className="infomelding"
        data-ga="Dittnav/Varsel"
        alt="Melding om meldekort"
        overskrift={<PanelOverskrift overskrift={overskrift(false)} type="Element" />}
        ingress={ingress(false)}
        href={`${conf.dittNav.NAV_URL}${conf.MELDEKORT_PATH}`}
      >
        <IkonBeskjed />
      </LenkepanelMedIkon>
    );
  }
  return null;
};

const NesteMeldekortType = PropTypes.shape({
  sisteDatoForTrekk: PropTypes.string,
  risikererTrekk: PropTypes.bool,
  uke: PropTypes.string,
  kanSendesFra: PropTypes.string,
  til: PropTypes.string,
  fra: PropTypes.string,
});

const NyeMeldekortType = PropTypes.shape({
  antallNyeMeldekort: PropTypes.number,
  nesteInnsendingAvMeldekort: PropTypes.string,
  nesteMeldekort: NesteMeldekortType,
});

export const MeldekortType = PropTypes.shape({
  nyeMeldekort: NyeMeldekortType,
  resterendeFeriedager: PropTypes.number,
  etterregistrerteMeldekort: PropTypes.number,
});

Meldekort.propTypes = {
  meldekort: MeldekortType,
  intl: intlShape.isRequired,
};

Meldekort.defaultProps = {
  meldekort: null,
};

export default injectIntl(Meldekort);
