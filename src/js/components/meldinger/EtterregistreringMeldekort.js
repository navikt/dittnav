import React from 'react';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import { NAV_NO_URL, Path } from '../../constants';
import i18n from '../../../translations/i18n';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonOppgave from '../../../assets/IkonOppgave';
import MeldekortType from '../../types/MeldekortType';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory } from '../../utils/GoogleAnalytics';

const tallordForMeldekort = (antallMeldekort, translater) => (antallMeldekort === 1 ? translater.oneNeuter() : translater.numberToWord(antallMeldekort));

const createOverskrift = (ettereg, intl) => {
  const overskrift = (
    <F
      id="meldekort.etterregistreringer"
      values={{ etterregistreringer: tallordForMeldekort(ettereg.etterregistrerteMeldekort, i18n[intl.locale]) }}
    />
  );

  return <PanelOverskrift overskrift={overskrift} type="Element" />;
};

const EtterregistreringMeldekort = ({ ettereg, intl }) => {
  if (ettereg && ettereg.etterregistrerteMeldekort && ettereg.etterregistrerteMeldekort > 0) {
    return (
      <LenkepanelMedIkon
        className="infomelding oppgave"
        alt="Melding om etterregistrerte meldekort"
        overskrift={createOverskrift(ettereg, intl)}
        href={`${NAV_NO_URL}${Path.ETTERREGISTRERT}`}
        gaCategory={GoogleAnalyticsCategory.Forside}
        gaAction={GoogleAnalyticsAction.EtterregistrerteMeldekort}
      >
        <IkonOppgave />
      </LenkepanelMedIkon>
    );
  }
  return null;
};


EtterregistreringMeldekort.propTypes = {
  ettereg: MeldekortType,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

EtterregistreringMeldekort.defaultProps = {
  ettereg: null,
};

export default injectIntl(EtterregistreringMeldekort);
