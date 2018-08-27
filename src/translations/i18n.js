
const i18n = {
  nb: {
    numberToWord: (tall) => {
      const ord = ['to', 'tre', 'fire', 'fem', 'seks', 'sju', 'åtte', 'ni', 'ti', 'elleve', 'tolv'];
      return tall > 12 ? tall : ord[tall - 2];
    },
    formatDate: date => new Date(date).toLocaleDateString('nb-NO'),
  },
};

export default i18n;
