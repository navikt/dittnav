import React from 'react';
import { bool } from 'prop-types';
import Beskjed from './brukernotifikasjoner/Beskjed';
import Oppgave from './brukernotifikasjoner/Oppgave';
import Innboks from './brukernotifikasjoner/Innboks';
import InnloggingsModal from './common/InnloggingsModal';
import useStore from '../hooks/useStore';
import { byEventTidspunkt } from '../utils/datoUtils';
import useInnloggingsstatus from '../hooks/useInnloggingsstatus';
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

  if (!isSuccess) {
    return null;
  }

  return (
    <>
      {oppgaver && innloggingsstatus && oppgaver.content.sort(byEventTidspunkt)
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
      {innbokser && innloggingsstatus && (
        <Innboks innbokser={innbokser && innbokser.content} innloggingsstatus={innloggingsstatus.content} />
      )}
    </>
  );
};

Brukernotifikasjoner.propTypes = {
  beskjeder: BeskjedType,
  oppgaver: OppgaveType,
  innbokser: InnboksType,
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
