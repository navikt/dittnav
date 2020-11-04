import React from 'react';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import { NAV_NO_URL, Path } from '../../constants';
import i18n from '../../../translations/i18n';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonOppgave from '../../../assets/IkonOppgave';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory } from '../../utils/GoogleAnalytics';
import { useMeldekort } from '../../hooks/usePerson';

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

const EtterregistreringMeldekort = ({ intl }) => {
  const [{ data: meldekort, isSuccess }] = useMeldekort();

  if (!isSuccess) {
    return null;
  }

  if (meldekort.content.etterregistrerteMeldekort && meldekort.content.etterregistrerteMeldekort > 0) {
    return (
      <LenkepanelMedIkon
        className="infomelding oppgave"
        alt="Melding om etterregistrerte meldekort"
        overskrift={createOverskrift(meldekort.content, intl)}
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
  intl: intlShape.isRequired,
};

export default injectIntl(EtterregistreringMeldekort);
