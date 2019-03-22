import moment from 'moment';
import 'moment/min/locales';

moment.locale('nb');

const i18n = {
  nb: {
    numberToWord: (tall) => {
      const ord = ['to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve', 'tolv'];
      return tall > 12 ? tall : ord[tall - 2];
    },
    formatDate: date => new Date(date).toLocaleDateString('nb-NO'),
    formatDateMonth: date => moment(date).format('LL'),
    formatDayAndMonth: date => moment(date).format('L').replace(new RegExp('[^\.]?' + moment().format('YYYY') + '.?'), ''),
  },
};

export default i18n;
