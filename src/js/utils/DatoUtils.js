import moment from 'moment';

const transformTolokalDatoTid = (tidspunkt) => (
  moment(tidspunkt).local()
    .format('DD-MM-YYYY')
    .replace(/-/g, '.')
);

export default transformTolokalDatoTid;
