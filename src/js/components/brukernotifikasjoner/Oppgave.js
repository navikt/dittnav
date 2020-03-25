import React from 'react';
import useSikkerhetsnivaa from '../../hooks/useSikkerhetsnivaa';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonOppgave from '../../../assets/IkonOppgave';
import OppgaveType from '../../types/OppgaveType';
import InnloggingType from '../../types/InnloggingType';

const Oppgave = ({ oppgave, innlogging }) => {
  const sikkerhetsnivaa = useSikkerhetsnivaa(oppgave, 'oppgave', innlogging);
  const overskrift = <PanelOverskrift overskrift={sikkerhetsnivaa.tekst} type="Element" />;

  return (
    <LenkepanelMedIkon
      className="oppgave"
      data-ga="Dittnav/Varsel"
      alt="Oppgave"
      overskrift={overskrift}
      href={sikkerhetsnivaa.lenke}
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
