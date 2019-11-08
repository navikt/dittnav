import React from 'react';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import PanelOverskrift from '../../common/PanelOverskrift';
import { fremtidig, trekk, melding, advarsel, feriedager } from './MeldekortMeldinger';
import conf from '../../../Config';
import { IkonOppgave, LenkepanelMedIkon } from '../../common/LenkepanelMedIkon';
import i18n from '../../../../translations/i18n';

const createOverskrift = (meldekort, count, risikererTrekk, formatDateMonth, formatDayAndMonth, numberToWord) => {
  const overskrift = (
    <>
      <span>{fremtidig(meldekort.nyeMeldekort, formatDateMonth)} </span>
      <span>{melding(meldekort.nyeMeldekort.nesteMeldekort, count, formatDayAndMonth, numberToWord)} </span>
      <span>{trekk(!risikererTrekk, formatDateMonth, meldekort.nyeMeldekort.nesteMeldekort)} </span>
      <span>{advarsel(risikererTrekk)} </span>
    </>
  );

  return <PanelOverskrift overskrift={overskrift} type="Element" />;
};

const createIngress = (meldekort, count) => (
  <>
    <span>{(count > 1 ? <F id="meldekort.se.oversikt" /> : <F id="meldekort.send" />)}. <br /></span>
    {feriedager(meldekort)}
  </>
);

const MeldekortLenkePanel = ({ meldekort, count, risikererTrekk, intl }) => {
  const { formatDateMonth, formatDayAndMonth, numberToWord } = i18n[intl.locale];

  return (
    <LenkepanelMedIkon
      className="infoMelding"
      data-ga="Dittnav/Varsel"
      alt="Melding om meldekort"
      overskrift={createOverskrift(meldekort, count, risikererTrekk, formatDateMonth, formatDayAndMonth, numberToWord)}
      ingress={createIngress(meldekort, count)}
      href={`${conf.dittNav.NAV_URL}${conf.MELDEKORT_PATH}`}
    >
      <IkonOppgave />
    </LenkepanelMedIkon>
  );
};

const NesteMeldekort = PropTypes.shape({
  sisteDatoForTrekk: PropTypes.string,
  risikererTrekk: PropTypes.bool,
  uke: PropTypes.string,
  kanSendesFra: PropTypes.string,
  til: PropTypes.string,
  fra: PropTypes.string,
});

const NyeMeldekort = PropTypes.shape({
  antallNyeMeldekort: PropTypes.number,
  nesteInnsendingAvMeldekort: PropTypes.string,
  nesteMeldekort: NesteMeldekort,
});

export const MeldekortType = PropTypes.shape({
  nyeMeldekort: NyeMeldekort,
  resterendeFeriedager: PropTypes.number,
  etterregistrerteMeldekort: PropTypes.number,
});

MeldekortLenkePanel.propTypes = {
  meldekort: MeldekortType.isRequired,
  count: PropTypes.number.isRequired,
  risikererTrekk: PropTypes.bool.isRequired,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

export default injectIntl(MeldekortLenkePanel);
