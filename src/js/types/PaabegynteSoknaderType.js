import { shape, string, number } from 'prop-types';

const PaabegynteSoknaderType = shape({
  url: string.isRequired,
  antallPaabegynte: number.isRequired,
});

export default PaabegynteSoknaderType;
