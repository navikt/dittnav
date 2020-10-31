import React from 'react';
import { arrayOf, bool } from 'prop-types';
import Beskjed from './brukernotifikasjoner/Beskjed';
import Oppgave from './brukernotifikasjoner/Oppgave';
import Innboks from './brukernotifikasjoner/Innboks';
import InnloggingsModal from './common/InnloggingsModal';
import useStore from '../hooks/useStore';
import { byEventTidspunkt } from '../utils/datoUtils';
import useInnloggingsstatus from '../hooks/api/useInnloggingsstatus';
import BeskjedType from '../types/BeskjedType';
import OppgaveType from '../types/OppgaveType';
import InnboksType from '../types/InnboksType';

const Brukernotifikasjoner = ({ beskjeder, oppgaver, innbokser, erAktiv, erInaktiv }) => {
  const [innloggingsstatus] = useInnloggingsstatus();

  if (useStore().state.visInnloggingsModal) {
    return (
      <InnloggingsModal isOpen onClick={() => null} />
    );
  }

  if (!innloggingsstatus.data || !innloggingsstatus.data.content) {
    return null;
  }

  return (
    <>
      {oppgaver && oppgaver.data && innloggingsstatus.data && oppgaver.data.content.sort(byEventTidspunkt)
        .map(o => (
          <Oppgave
            key={o.eventId}
            oppgave={o}
            innloggingsstatus={innloggingsstatus.data.content}
          />
        ))}
      {beskjeder && beskjeder.content && innloggingsstatus.data && beskjeder.content.sort(byEventTidspunkt)
        .map(b => (
          <Beskjed
            key={b.uid}
            beskjed={b}
            beskjeder={b}
            innloggingsstatus={innloggingsstatus.data.content}
            erAktiv={erAktiv}
            erInaktiv={erInaktiv}
          />
        ))}
      {innbokser && innbokser.data && innloggingsstatus.data && innbokser.data.content.sort(byEventTidspunkt)
        .map(i => (
          <Innboks
            key={i.eventId}
            innboks={i}
            innloggingsstatus={innloggingsstatus.data.content}
          />
        ))}
    </>
  );
};

Brukernotifikasjoner.propTypes = {
  beskjeder: arrayOf(BeskjedType),
  oppgaver: arrayOf(OppgaveType),
  innbokser: arrayOf(InnboksType),
  erAktiv: bool,
  erInaktiv: bool,
};

Brukernotifikasjoner.defaultProps = {
  beskjeder: null,
  oppgaver: null,
  innbokser: null,
  erAktiv: false,
  erInaktiv: false,
};

export default Brukernotifikasjoner;
