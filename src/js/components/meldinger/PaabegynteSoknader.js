import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import i18n from '../../../translations/i18n';
import { IkonInformasjon, LenkepanelMedIkon, createOverskrift } from '../LenkepanelMedIkon';

const overskrift = (paabegynteSoknader, intl) => createOverskrift(
  <F
    id={paabegynteSoknader.antallPaabegynte === 1 ? 'saksoversikt.soknad.en' : 'saksoversikt.soknad.flere'}
    values={{ count: i18n[intl.locale].numberToWord(paabegynteSoknader.antallPaabegynte) }}
  />,
  'Element',
);

const ingress = <F id="saksoversikt.lenke" />;

const PaabegynteSoknader = ({ paabegynteSoknader, intl }) => {
  if (!paabegynteSoknader || paabegynteSoknader.antallPaabegynte === 0) {
    return null;
  }
  return (
    <LenkepanelMedIkon
      className="infoMelding"
      data-ga="Dittnav/Varsel/Paabegynt soknad"
      alt="Melding om Søknader"
      overskrift={overskrift(paabegynteSoknader, intl)}
      ingress={ingress}
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
