import moment from 'moment';

const transformTolokalDatoTid = (eventTidspunkt) => (
  moment(eventTidspunkt).local()
    .format('DD-MM-YYYY')
    .replace(/-/g, '.')
);

export default transformTolokalDatoTid;
