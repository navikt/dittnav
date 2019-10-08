import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import i18n from '../../../translations/i18n';
import { IkonInformasjon, LenkepanelMedIkon } from '../LenkepanelMedIkon';

class PaabegynteSoknader extends Component {
  render() {
    const { paabegynteSoknader } = this.props;
    if (!paabegynteSoknader || paabegynteSoknader.antallPaabegynte === 0) return null;

    const enSoknad = <F id="saksoversikt.soknad.en" />;
    const flereSoknader = <F id="saksoversikt.soknad.flere" values={{ count: i18n[this.props.intl.locale].numberToWord(paabegynteSoknader.antallPaabegynte) }} />;
    const overskrift = paabegynteSoknader.antallPaabegynte === 1 ? enSoknad : flereSoknader;
    const ingress = <F id="saksoversikt.lenke" />;

    return (
      <LenkepanelMedIkon
        className="infoMelding"
        data-ga="Dittnav/Varsel/Paabegynt soknad"
        alt="Melding om Søknader"
        overskrift={overskrift}
        ingress={ingress}
        href={paabegynteSoknader.url}
      >
        <IkonInformasjon />
      </LenkepanelMedIkon>
    );
  }
}

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
