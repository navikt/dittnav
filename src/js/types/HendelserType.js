import PropTypes from 'prop-types';

const HendelserType = PropTypes.arrayOf(
  PropTypes.oneOfType([PropTypes.object]),
);

export default HendelserType;
