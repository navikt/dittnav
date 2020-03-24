import React from 'react';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import IkonInnboks from '../../../assets/IkonInnboks';
import PanelOverskrift from '../common/PanelOverskrift';
import InnloggingType from '../../types/InnloggingType';
import InnboksType from '../../types/InnboksType';

const Innboks = ({ innboks, innlogging }) => {
  const sikkerhetsnivaa = useSikkerhetsnivaa(innboks, 'innboks', innlogging);
  const overskrift = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="Element" />;

  return (
    <LenkepanelMedIkon
      className="innboks"
      data-ga="Dittnav/Varsel"
      alt="Innboks"
      overskrift={overskrift}
      href={sikkerhetsnivaa.lenke}
    >
      <IkonInnboks />
    </LenkepanelMedIkon>
  );
};

Innboks.propTypes = {
  innboks: InnboksType,
  innlogging: InnloggingType,
};

Innboks.defaultProps = {
  innboks: null,
  innlogging: null,
};

export default Innboks;
