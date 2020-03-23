import { shape, string, number } from 'prop-types';

const InnboksType = shape({
  eventId: string.isRequired,
  tekst: string.isRequired,
  sikkerhetsnivaa: number.isRequired,
  link: string,
});

export default InnboksType;
