import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import i18n from '../../../translations/i18n';
import { IkonInformasjon, LenkepanelMedIkon } from '../paneler/LenkepanelMedIkon';
import PanelOverskrift from '../paneler/PanelOverskrift';

const getOverskrift = (paabegynteSoknader, soknadstekst, intl) => (
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
      className="infoMelding"
      data-ga="Dittnav/Varsel/Paabegynt soknad"
      alt="Melding om Søknader"
      overskrift={getOverskrift(paabegynteSoknader, soknadstekst, intl)}
      ingress={<F id="saksoversikt.lenke" />}
      href={paabegynteSoknader.url}
    >
      <IkonInformasjon />
    </LenkepanelMedIkon>
  );
};

export const PaabegynteSoknaderType = PropTypes.shape({
  url: PropTypes.string.isRequired,
  antallPaabegynte: PropTypes.number.isRequired,
});

PaabegynteSoknader.propTypes = {
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
  paabegynteSoknader: PaabegynteSoknaderType,
};

PaabegynteSoknader.defaultProps = {
  paabegynteSoknader: null,
};

export default injectIntl(PaabegynteSoknader);
