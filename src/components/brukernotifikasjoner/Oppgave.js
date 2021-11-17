import React from 'react';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import { transformTolokalDatoTid } from '../../utils/datoUtils';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonOppgave from '../../assets/IkonOppgave';
import OppgaveType from '../../types/OppgaveType';
import InnloggingsstatusType from '../../types/InnloggingsstatusType';
import { listOfActions, listOfComponentNames } from '../../utils/amplitudeUtils';

const Oppgave = ({ oppgave, innloggingsstatus }) => {
  const sikkerhetsnivaa = useSikkerhetsnivaa(oppgave, 'oppgave', innloggingsstatus);
  const overskrift = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="Element" />;
  const lokalDatoTid = transformTolokalDatoTid(oppgave.eventTidspunkt);

  return (
    <LenkepanelMedIkon
      className="oppgave"
      alt="Oppgave"
      overskrift={overskrift}
      etikett={lokalDatoTid}
      href={sikkerhetsnivaa.lenke}
      amplitudeAction={listOfActions.TrykkPaaBrukernotifikasjon}
      amplitudeComponentName={listOfComponentNames.brukernotifikasjon.OppgaveMottatt}
    >
      <IkonOppgave />
    </LenkepanelMedIkon>
  );
};

Oppgave.propTypes = {
  oppgave: OppgaveType,
  innloggingsstatus: InnloggingsstatusType,
};

Oppgave.defaultProps = {
  oppgave: null,
  innloggingsstatus: null,
};

export default Oppgave;
