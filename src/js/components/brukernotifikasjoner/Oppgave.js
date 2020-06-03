import React from 'react';
import { useLocation } from 'react-router-dom';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import transformTolokalDatoTid from '../../utils/DatoUtils';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonOppgave from '../../../assets/IkonOppgave';
import OppgaveType from '../../types/OppgaveType';
import InnloggingType from '../../types/InnloggingType';
import { GoogleAnalyticsAction, removeFragment } from '../../utils/GoogleAnalytics';

const Oppgave = ({ oppgave, innlogging }) => {
  const location = useLocation();
  const sikkerhetsnivaa = useSikkerhetsnivaa(oppgave, 'oppgave', innlogging);
  const overskrift = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="Element" />;
  const lokalDatoTid = transformTolokalDatoTid(oppgave.eventTidspunkt);

  return (
    <LenkepanelMedIkon
      className="oppgave"
      alt="Oppgave"
      overskrift={overskrift}
      etikett={lokalDatoTid}
      href={sikkerhetsnivaa.lenke}
      gaCategory={`Ditt NAV${location.pathname}`}
      gaAction={GoogleAnalyticsAction.Oppgave}
      gaUrl={removeFragment(sikkerhetsnivaa.lenke)}
    >
      <IkonOppgave />
    </LenkepanelMedIkon>
  );
};

Oppgave.propTypes = {
  oppgave: OppgaveType,
  innlogging: InnloggingType,
};

Oppgave.defaultProps = {
  oppgave: null,
  innlogging: null,
};

export default Oppgave;
