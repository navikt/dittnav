import React from 'react';
import PropTypes from 'prop-types';

import FeilMeldinger from './components/FeilMeldinger';
import Home from './pages/Home';
import Hendelser from './components/Hendelser';

import '../less/index.less';
import './polyfill';

import Environments from './Environment';

const App = ({ api }) => {

  const [info, setInfo] = React.useState({});
  const [paabegynteSoknader, setPaabegynteSoknader] = React.useState(null);
  const [mininnboks, setMininnboks] = React.useState([]);
  const [errors, setErrors] = React.useState([]);
  const [fetching, setFetching] = React.useState(0);

  React.useEffect(() => {
    const catchError = msg => () => {
      errors.push(msg);
      setErrors(errors);
      setFetching(fetching + 1);
    };

    api.fetchPersonInfoAndServices()
      .then((r) => {
        const { feilendeTjenester } = r;
        if (feilendeTjenester.length > 0) {
          errors.push('error.baksystemer');
        }
        setInfo(r);
        setErrors(errors);
        setFetching(fetching + 1);
      })
      .catch(catchError('error.baksystemer'));

    api.fetchSaker()
      .then((r) => {
        const { feilendeBaksystem } = r;
        if (feilendeBaksystem.length > 0) {
          errors.push('error.baksystemer');
        }
        setPaabegynteSoknader(r);
        setFetching(fetching + 1);
      }).catch(catchError('error.baksystemer'));

    api.fetchMeldinger()
      .then((r) => {
        setMininnboks(r)
        setFetching(fetching + 1)
      }).catch(catchError('error.baksystemer'));
  }, [errors, api, fetching]);

    const uniqueErrors = errors.filter((item, i, ar) => ar.indexOf(item) === i);
    const erIDev = Environments() === 'DEV';

    return (
      <main role="main">
        <FeilMeldinger errors={uniqueErrors} />
        <div className="container">
          { erIDev ? <Hendelser /> : null }
          <Home info={info} paabegynteSoknader={paabegynteSoknader} mininnboks={mininnboks} fetching={fetching} />
        </div>
      </main>
    );
}

App.propTypes = {
  api: PropTypes.shape({
    fetchPersonInfoAndServices: PropTypes.func.isRequired,
    fetchSaker: PropTypes.func.isRequired,
    fetchMeldinger: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
