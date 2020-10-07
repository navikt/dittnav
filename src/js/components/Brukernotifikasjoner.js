import React from 'react';
import { arrayOf, bool } from 'prop-types';
import Beskjed from './brukernotifikasjoner/Beskjed';
import Oppgave from './brukernotifikasjoner/Oppgave';
import Innboks from './brukernotifikasjoner/Innboks';
import BeskjedType from '../types/BeskjedType';
import OppgaveType from '../types/OppgaveType';
import InnboksType from '../types/InnboksType';
import InnloggingsstatusType from '../types/InnloggingsstatusType';
import InnloggingsModal from './common/InnloggingsModal';
import useStore from '../hooks/useStore';
import { byEventTidspunkt } from '../utils/datoUtils';

const Brukernotifikasjoner = ({ beskjeder, oppgaver, innbokser, innloggingsstatus, erAktiv, erInaktiv }) => {
  const { state } = useStore();

  if (state.visInnloggingsModal) {
    return (
      <InnloggingsModal isOpen onClick={() => null} />
    );
  }

  return (
    <>
      {oppgaver && innloggingsstatus && oppgaver.sort(byEventTidspunkt)
        .map(o => (
          <Oppgave
            key={o.eventId}
            oppgave={o}
            innloggingsstatus={innloggingsstatus}
          />
        ))}
      {beskjeder && innloggingsstatus && beskjeder.sort(byEventTidspunkt)
        .map(b => (
          <Beskjed
            key={b.uid}
            beskjed={b}
            beskjeder={beskjeder}
            innloggingsstatus={innloggingsstatus}
            erAktiv={erAktiv}
            erInaktiv={erInaktiv}
          />
        ))}
      {innbokser && innloggingsstatus && innbokser.sort(byEventTidspunkt)
        .map(i => (
          <Innboks
            key={i.eventId}
            innboks={i}
            innloggingsstatus={innloggingsstatus}
          />
        ))}
    </>
  );
};

Brukernotifikasjoner.propTypes = {
  beskjeder: arrayOf(BeskjedType),
  oppgaver: arrayOf(OppgaveType),
  innbokser: arrayOf(InnboksType),
  innloggingsstatus: InnloggingsstatusType,
  erAktiv: bool,
  erInaktiv: bool,
};

Brukernotifikasjoner.defaultProps = {
  beskjeder: null,
  oppgaver: null,
  innbokser: null,
  innloggingsstatus: null,
  erAktiv: false,
  erInaktiv: false,
};

export default Brukernotifikasjoner;
