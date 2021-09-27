import React from 'react';
import { arrayOf } from 'prop-types';
import { useIntl } from 'react-intl';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import IkonInnboks from '../../assets/IkonInnboks';
import PanelOverskrift from '../common/PanelOverskrift';
import InnloggingsstatusType from '../../types/InnloggingsstatusType';
import InnboksType from '../../types/InnboksType';
import Innboks from './Innboks';

const Innbokser = ({ innbokser, innloggingsstatus }) => {
  const intl = useIntl();
  const sikkerhetsnivaa = useSikkerhetsnivaa(innbokser[0], 'innboks', innloggingsstatus);
  let overskrift = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="Element" />;
  const antallMeldinger = innbokser.length;

  if (antallMeldinger === 1) {
    return <Innboks innboks={innbokser[0]} innloggingsstatus={innloggingsstatus} />;
  }

  if (!sikkerhetsnivaa.skalMaskeres) {
    const tekst = intl.formatMessage({ id: 'innboks.flere.meldinger' }, { count: antallMeldinger });
    overskrift = <PanelOverskrift overskrift={tekst} type="Element" />;
  }

  return (
    <LenkepanelMedIkon
      className="innboks"
      alt="Innboks"
      overskrift={overskrift}
      href={sikkerhetsnivaa.lenke}
    >
      <IkonInnboks />
    </LenkepanelMedIkon>
  );
};

Innbokser.propTypes = {
  innbokser: arrayOf(InnboksType),
  innloggingsstatus: InnloggingsstatusType,
};

Innbokser.defaultProps = {
  innbokser: null,
  innloggingsstatus: null,
};

export default Innbokser;
