import { shape, func } from 'prop-types';

const ApiType = shape({
  api: shape({
    fetchOppfolging: func.isRequired,
    fetchPersonNavn: func.isRequired,
    fetchPersonIdent: func.isRequired,
    fetchMeldekort: func.isRequired,
    fetchSaker: func.isRequired,
    fetchMeldinger: func.isRequired,
    fetchSakstema: func.isRequired,
    fetchHendelser: func.isRequired,
    fetchInnlogging: func.isRequired,
  }),
});

export default ApiType;
