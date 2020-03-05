import PropTypes from 'prop-types';

const InnboksType = PropTypes.shape({
  eventId: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tekst: PropTypes.string.isRequired,
  link: PropTypes.string,
});

export default InnboksType;
