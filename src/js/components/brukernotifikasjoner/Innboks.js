import React from 'react';
import { useLocation } from 'react-router-dom';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import transformTolokalDatoTid from '../../utils/DatoUtils';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import IkonInnboks from '../../../assets/IkonInnboks';
import PanelOverskrift from '../common/PanelOverskrift';
import InnloggingType from '../../types/InnloggingType';
import InnboksType from '../../types/InnboksType';
import { GoogleAnalyticsAction, removeFragment } from '../../utils/GoogleAnalytics';

const Innboks = ({ innboks, innlogging }) => {
  const location = useLocation();
  const sikkerhetsnivaa = useSikkerhetsnivaa(innboks, 'innboks', innlogging);
  const overskrift = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="Element" />;
  const lokalDatoTid = transformTolokalDatoTid(innboks.eventTidspunkt);

  return (
    <LenkepanelMedIkon
      className="innboks"
      data-ga="Dittnav/Varsel"
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
  innlogging: InnloggingType,
};

Innboks.defaultProps = {
  innboks: null,
  innlogging: null,
};

export default Innboks;
