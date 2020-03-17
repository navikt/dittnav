import { shape, string, number } from 'prop-types';

const OppgaveType = shape({
  eventId: string.isRequired,
  tekst: string.isRequired,
  sikkerhetsnivaa: number.isRequired,
  link: string,
});

export default OppgaveType;
