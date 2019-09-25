import React from 'react';
import PropTypes from 'prop-types';

import FeilMeldinger from './components/FeilMeldinger';
import Home from './pages/Home';
import Hendelser from './components/Hendelser';

import '../less/index.less';

import Environments from './Environment';

const App = ({ api }) => {
    const [{info, paabegynteSoknader, mininnboks, errors, isLoaded}] = api.useFetchEverythingForHome();

    const uniqueErrors = errors.filter((item, i, ar) => ar.indexOf(item) === i);
    const erIDev = Environments() === 'DEV';

    return (
      <main role="main">
        <FeilMeldinger errors={uniqueErrors} />
        <div className="container">
          { erIDev ? <Hendelser /> : null }
          <Home info={info} paabegynteSoknader={paabegynteSoknader} mininnboks={mininnboks} isLoaded={isLoaded} />
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