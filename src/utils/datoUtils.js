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

export const byForstBehandlet = (a, b) => {
  const momentA = moment(a.forstBehandlet, Format.BRUKERNOTIFIKASJONER);
  const momentB = moment(b.forstBehandlet, Format.BRUKERNOTIFIKASJONER);

  return momentB.diff(momentA);
};
