import { shape, arrayOf, string } from 'prop-types';

const MinInnboksType = arrayOf(shape({
  type: string.isRequired,
  url: string,
}));

export default MinInnboksType;
