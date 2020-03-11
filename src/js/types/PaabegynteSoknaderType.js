import PropTypes from 'prop-types';

const PaabegynteSoknaderType = PropTypes.shape({
  url: PropTypes.string.isRequired,
  antallPaabegynte: PropTypes.number.isRequired,
});

export default PaabegynteSoknaderType;
