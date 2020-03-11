import PropTypes from 'prop-types';

const HendelserType = PropTypes.arrayOf(
  PropTypes.shape({
    uid: PropTypes.string,
    eventId: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    tekst: PropTypes.string.isRequired,
    link: PropTypes.string,
  }),
);

export default HendelserType;
