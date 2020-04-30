import moment from 'moment';

const transformTolokalDatoTid = (tidspunkt) => {
  if (moment(tidspunkt).isBefore('1975-01-01', 'year')) {
    return null;
  }

  return moment(tidspunkt)
    .local()
    .format('DD.MM.YYYY - HH:mm');
};

export default transformTolokalDatoTid;
