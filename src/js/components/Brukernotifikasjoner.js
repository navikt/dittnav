import React from 'react';
import { arrayOf, bool } from 'prop-types';
import moment from 'moment';
import Config from '../globalConfig';
import Beskjed from './brukernotifikasjoner/Beskjed';
import Oppgave from './brukernotifikasjoner/Oppgave';
import Innboks from './brukernotifikasjoner/Innboks';
import BeskjedType from '../types/BeskjedType';
import OppgaveType from '../types/OppgaveType';
import InnboksType from '../types/InnboksType';
import InnloggingType from '../types/InnloggingType';
import useBeskjedStore from '../hooks/useBeskjedStore';
import InnloggingsModal from './common/InnloggingsModal';

const byEventTidspunkt = (a, b) => {
  const momentA = moment(a.eventTidspunkt, Config.BRUKERNOTIFIKASJONER_FORMAT);
  const momentB = moment(b.eventTidspunkt, Config.BRUKERNOTIFIKASJONER_FORMAT);

  return momentB.diff(momentA);
};

const Brukernotifikasjoner = ({ beskjeder, oppgaver, innbokser, innloggingsstatus, erAktiv, erInaktiv }) => {
  const { state } = useBeskjedStore();

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
  innloggingsstatus: InnloggingType,
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
