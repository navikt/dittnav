import PropTypes from 'prop-types';

const OppgaveType = PropTypes.shape({
  eventId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tekst: PropTypes.string.isRequired,
  sikkerhetsnivaa: PropTypes.number.isRequired,
  link: PropTypes.string,
});

export default OppgaveType;
