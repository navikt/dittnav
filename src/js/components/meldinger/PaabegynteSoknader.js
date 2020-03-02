import React from 'react';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import i18n from '../../../translations/i18n';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonBeskjed from '../../../assets/IkonBeskjed';
import PaabegynteSoknaderType from '../../types/PaabegynteSoknaderType';

const createOverskrift = (paabegynteSoknader, soknadstekst, intl) => (
  <PanelOverskrift
    overskrift={<F id={soknadstekst} values={{ count: i18n[intl.locale].numberToWord(paabegynteSoknader.antallPaabegynte) }} />}
    type="Element"
  />
);

const PaabegynteSoknader = ({ paabegynteSoknader, intl }) => {
  if (!paabegynteSoknader || paabegynteSoknader.antallPaabegynte === 0) {
    return null;
  }
  const soknadstekst = paabegynteSoknader.antallPaabegynte === 1 ? 'saksoversikt.soknad.en' : 'saksoversikt.soknad.flere';

  return (
    <LenkepanelMedIkon
      className="infomelding"
      data-ga="Dittnav/Varsel/Paabegynt soknad"
      alt="Melding om Søknader"
      overskrift={createOverskrift(paabegynteSoknader, soknadstekst, intl)}
      ingress={<F id="saksoversikt.lenke" />}
      href={paabegynteSoknader.url}
    >
      <IkonBeskjed />
    </LenkepanelMedIkon>
  );
};

PaabegynteSoknader.propTypes = {
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  paabegynteSoknader: PaabegynteSoknaderType,
};

PaabegynteSoknader.defaultProps = {
  paabegynteSoknader: null,
};

export default injectIntl(PaabegynteSoknader);
