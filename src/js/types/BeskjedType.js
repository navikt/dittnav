import PropTypes from 'prop-types';

const BeskjedType = PropTypes.shape({
  uid: PropTypes.string,
  eventId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tekst: PropTypes.string.isRequired,
  sikkerhetsnivaa: PropTypes.number.isRequired,
  link: PropTypes.string,
});

export default BeskjedType;
