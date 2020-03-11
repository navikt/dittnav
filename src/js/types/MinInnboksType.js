import PropTypes from 'prop-types';

const MinInnboksType = PropTypes.arrayOf(PropTypes.shape({
  type: PropTypes.string.isRequired,
  url: PropTypes.string,
}));

export default MinInnboksType;
