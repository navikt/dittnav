import React from 'react';
import { arrayOf, bool } from 'prop-types';
import moment from 'moment';
import Beskjed from './brukernotifikasjoner/Beskjed';
import Oppgave from './brukernotifikasjoner/Oppgave';
import Innboks from './brukernotifikasjoner/Innboks';
import BeskjedType from '../types/BeskjedType';
import OppgaveType from '../types/OppgaveType';
import InnboksType from '../types/InnboksType';
import InnloggingType from '../types/InnloggingType';

const byEventTidspunkt = (a, b) => {
  const momentA = moment(a.eventTidspunkt, 'YYYY-MM-DDTHH:mm:ss.SSSSZ');
  const momentB = moment(b.eventTidspunkt, 'YYYY-MM-DDTHH:mm:ss.SSSSZ');

  return momentA.diff(momentB);
};

const Brukernotifikasjoner = ({ beskjeder, oppgaver, innbokser, innlogging, erAktiv, erInaktiv }) => (
  <>
    {oppgaver && innlogging && oppgaver.sort(byEventTidspunkt).map(o => (
      <Oppgave key={o.eventId} oppgave={o} innlogging={innlogging} />
    ))}
    {beskjeder && innlogging && beskjeder.sort(byEventTidspunkt).map(b => (
      <Beskjed key={b.uid} beskjed={b} beskjeder={beskjeder} innlogging={innlogging} erAktiv={erAktiv} erInaktiv={erInaktiv} />
    ))}
    {innbokser && innlogging && innbokser.sort(byEventTidspunkt).map(i => (
      <Innboks key={i.eventId} innboks={i} innlogging={innlogging} />
    ))}
  </>
);

Brukernotifikasjoner.propTypes = {
  beskjeder: arrayOf(BeskjedType),
  oppgaver: arrayOf(OppgaveType),
  innbokser: arrayOf(InnboksType),
  innlogging: InnloggingType,
  erAktiv: bool,
  erInaktiv: bool,
};

Brukernotifikasjoner.defaultProps = {
  beskjeder: null,
  oppgaver: null,
  innbokser: null,
  innlogging: null,
  erAktiv: false,
  erInaktiv: false,
};

export default Brukernotifikasjoner;
