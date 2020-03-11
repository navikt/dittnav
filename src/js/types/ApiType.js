import PropTypes from 'prop-types';

const ApiType = PropTypes.shape({
  api: PropTypes.shape({
    fetchOppfolging: PropTypes.func.isRequired,
    fetchPersonNavn: PropTypes.func.isRequired,
    fetchPersonIdent: PropTypes.func.isRequired,
    fetchMeldekort: PropTypes.func.isRequired,
    fetchSaker: PropTypes.func.isRequired,
    fetchMeldinger: PropTypes.func.isRequired,
    fetchSakstema: PropTypes.func.isRequired,
    fetchHendelser: PropTypes.func.isRequired,
  }),
});

export default ApiType;
