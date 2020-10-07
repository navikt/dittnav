import moment from 'moment';
import { Format } from '../constants';

export const transformTolokalDatoTid = (tidspunkt) => {
  if (moment(tidspunkt).isBefore('1975-01-01', 'year')) {
    return null;
  }

  return moment(tidspunkt)
    .local()
    .format('DD.MM.YYYY - HH:mm');
};

export const byEventTidspunkt = (a, b) => {
  const momentA = moment(a.eventTidspunkt, Format.BRUKERNOTIFIKASJONER);
  const momentB = moment(b.eventTidspunkt, Format.BRUKERNOTIFIKASJONER);

  return momentB.diff(momentA);
};
