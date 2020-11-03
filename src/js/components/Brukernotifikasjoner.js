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
  const [{ data: innloggingsstatus, isSuccess }] = useInnloggingsstatus();

  if (useStore().state.visInnloggingsModal) {
    return (
      <InnloggingsModal isOpen onClick={() => null} />
    );
  }

  /*
  if (!innloggingsstatus || !innloggingsstatus.content) {
    return null;
  }
   */

  if (!isSuccess) {
    return null;
  }

  return (
    <>
      {oppgaver && oppgaver.data && innloggingsstatus && oppgaver.data.content.sort(byEventTidspunkt)
        .map(o => (
          <Oppgave
            key={o.eventId}
            oppgave={o}
            innloggingsstatus={innloggingsstatus.content}
          />
        ))}
      {beskjeder && beskjeder.content && innloggingsstatus && beskjeder.content.sort(byEventTidspunkt)
        .map(b => (
          <Beskjed
            key={b.uid}
            beskjed={b}
            beskjeder={b}
            innloggingsstatus={innloggingsstatus.content}
            erAktiv={erAktiv}
            erInaktiv={erInaktiv}
          />
        ))}
      {innbokser && innbokser.data && innloggingsstatus && innbokser.data.content.sort(byEventTidspunkt)
        .map(i => (
          <Innboks
            key={i.eventId}
            innboks={i}
            innloggingsstatus={innloggingsstatus.content}
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
