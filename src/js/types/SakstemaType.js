import { arrayOf, shape, string, number } from 'prop-types';

const sakstema = shape({
  temanavn: string.isRequired,
  temakode: string.isRequired,
  antallStatusUnderBehandling: number.isRequired,
  sisteOppdatering: string.isRequired,
});

const SakstemaType = shape({
  antallSakstema: number.isRequired,
  sakstemaList: arrayOf(sakstema).isRequired,
});

export default SakstemaType;
