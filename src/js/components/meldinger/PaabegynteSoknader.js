import React from 'react';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import i18n from '../../../translations/i18n';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonBeskjed from '../../../assets/IkonBeskjed';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory } from '../../utils/googleAnalytics';
import { usePaabegynteSoknader } from '../../hooks/useSaker';

const hasContent = (paabegynteSoknader) => (
  paabegynteSoknader && paabegynteSoknader.content
);

const hasNoPaabegynteSoknader = (paabegynteSoknader) => (
  paabegynteSoknader && paabegynteSoknader.content && paabegynteSoknader.content.antallPaabegynte === 0
);

const createOverskrift = (paabegynteSoknader, soknadstekst, intl) => (
  <PanelOverskrift
    overskrift={<F id={soknadstekst} values={{ count: i18n[intl.locale].numberToWord(paabegynteSoknader.antallPaabegynte) }} />}
    type="Element"
  />
);

const PaabegynteSoknader = ({ intl }) => {
  const [{ data: paabegynteSoknader, isSuccess }] = usePaabegynteSoknader();

  if (!isSuccess || !hasContent(paabegynteSoknader) || hasNoPaabegynteSoknader(paabegynteSoknader)) {
    return null;
  }

  const soknadstekst = paabegynteSoknader && paabegynteSoknader.content.antallPaabegynte === 1 ? 'saksoversikt.soknad.en' : 'saksoversikt.soknad.flere';

  return (
    <LenkepanelMedIkon
      className="infomelding paabegynte-soknader"
      alt="Melding om Søknader"
      overskrift={createOverskrift(paabegynteSoknader.content, soknadstekst, intl)}
      ingress={<F id="saksoversikt.lenke" />}
      href={paabegynteSoknader.content.url}
      gaCategory={GoogleAnalyticsCategory.Forside}
      gaAction={GoogleAnalyticsAction.PaabegynteSoknader}
    >
      <IkonBeskjed />
    </LenkepanelMedIkon>
  );
};

PaabegynteSoknader.propTypes = {
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

export default injectIntl(PaabegynteSoknader);
