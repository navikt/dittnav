import React from 'react';
import { useLocation } from 'react-router-dom';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import { transformTolokalDatoTid } from '../../utils/datoUtils';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import IkonInnboks from '../../assets/IkonInnboks';
import PanelOverskrift from '../common/PanelOverskrift';
import InnloggingsstatusType from '../../types/InnloggingsstatusType';
import InnboksType from '../../types/InnboksType';
import { GoogleAnalyticsAction, removeFragment } from '../../utils/googleAnalytics';

const Innboks = ({ innboks, innloggingsstatus }) => {
  const location = useLocation();
  const sikkerhetsnivaa = useSikkerhetsnivaa(innboks, 'innboks', innloggingsstatus);
  const overskrift = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="Element" />;
  const lokalDatoTid = transformTolokalDatoTid(innboks.eventTidspunkt);

  return (
    <LenkepanelMedIkon
      className="innboks"
      alt="Innboks"
      overskrift={overskrift}
      etikett={lokalDatoTid}
      href={sikkerhetsnivaa.lenke}
      gaCategory={`Ditt NAV${location.pathname}`}
      gaAction={GoogleAnalyticsAction.Innboks}
      gaUrl={removeFragment(sikkerhetsnivaa.lenke)}
    >
      <IkonInnboks />
    </LenkepanelMedIkon>
  );
};

Innboks.propTypes = {
  innboks: InnboksType,
  innloggingsstatus: InnloggingsstatusType,
};

Innboks.defaultProps = {
  innboks: null,
  innloggingsstatus: null,
};

export default Innboks;
