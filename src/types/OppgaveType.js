import { shape, string, number, arrayOf } from 'prop-types';

const OppgaveType = shape({
  content: arrayOf(
    shape({
      eventId: string.isRequired,
      tekst: string.isRequired,
      sikkerhetsnivaa: number.isRequired,
      link: string,
    }),
  ),
});

export default OppgaveType;
