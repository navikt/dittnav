import React from 'react';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonOppgave from '../../../assets/IkonOppgave';
import {
  finnLenkeForSikkerhetsnivaa,
  finnTekstForSikkerhetsnivaa,
} from '../../utils/SikkerhetsNivaa';
import OppgaveType from '../../types/OppgaveType';
import InnloggingType from '../../types/InnloggingType';

const isLoading = (oppgave, innlogging) => !oppgave || !innlogging;

const Oppgave = ({ oppgave, innlogging }) => {
  if (isLoading(oppgave, innlogging)) {
    return null;
  }

  const tekst = finnTekstForSikkerhetsnivaa(oppgave, innlogging);
  const lenke = finnLenkeForSikkerhetsnivaa(oppgave, innlogging);

  return (
    <LenkepanelMedIkon
      className="oppgave"
      data-ga="Dittnav/Varsel"
      alt="Oppgave"
      overskrift={<PanelOverskrift overskrift={tekst} type="Element" />}
      href={lenke}
      key={oppgave.eventId}
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
