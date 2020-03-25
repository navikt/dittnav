import React from 'react';
import { arrayOf, bool } from 'prop-types';
import Beskjed from './brukernotifikasjoner/Beskjed';
import Oppgave from './brukernotifikasjoner/Oppgave';
import Innboks from './brukernotifikasjoner/Innboks';
import BeskjedType from '../types/BeskjedType';
import OppgaverType from '../types/OppgaveType';
import InnboksType from '../types/InnboksType';
import InnloggingType from '../types/InnloggingType';

const Brukernotifikasjoner = ({ beskjeder, oppgaver, innbokser, innlogging, erInaktiv }) => (
  <>
    {beskjeder && innlogging && beskjeder.map(b => (
      <Beskjed key={b.eventId} beskjed={b} beskjeder={beskjeder} innlogging={innlogging} erInaktiv={erInaktiv} />
    ))}
    {oppgaver && innlogging && oppgaver.map(o => (
      <Oppgave key={o.eventId} oppgave={o} innlogging={innlogging} />
    ))}
    {innbokser && innlogging && innbokser.map(i => (
      <Innboks key={i.eventId} innboks={i} innlogging={innlogging} />
    ))}
  </>
);

Brukernotifikasjoner.propTypes = {
  beskjeder: arrayOf(BeskjedType),
  oppgaver: arrayOf(OppgaverType),
  innbokser: arrayOf(InnboksType),
  innlogging: InnloggingType,
  erInaktiv: bool,
};

Brukernotifikasjoner.defaultProps = {
  beskjeder: null,
  oppgaver: null,
  innbokser: null,
  innlogging: null,
  erInaktiv: false,
};

export default Brukernotifikasjoner;
