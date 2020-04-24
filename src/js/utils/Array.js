import moment from 'moment';

export const byEventTidspunkt = (brukernotifikasjon1, brukernotifikasjon2) => {
  const moment1 = moment(brukernotifikasjon1.eventTidspunkt, 'YYYY-MM-DDTHH:mm:ss.SSSSZ');
  const moment2 = moment(brukernotifikasjon2.eventTidspunkt, 'YYYY-MM-DDTHH:mm:ss.SSSSZ');

  return moment2.diff(moment1);
};

const isEmpty = (list) => list.length === 0;

export default isEmpty;
