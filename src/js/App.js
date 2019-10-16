import React from 'react';

import Config from './Config';

import FeilMeldinger from './components/FeilMeldinger';
import Home from './pages/Home';
import Hendelser from './components/Hendelser';
import Api from './Api';

import '../less/index.less';

const App = ({ api }) => {
    const [{info, paabegynteSoknader, mininnboks, sakstema, errors, isLoaded}] = api.useFetchEverythingForHome();

    const uniqueErrors = errors.filter((item, i, ar) => ar.indexOf(item) === i);
    const erIDev = Config.ENVIRONMENT !== 'prod' && Config.ENVIRONMENT !== 'test';

    return (
      <main role="main">
        <FeilMeldinger errors={uniqueErrors} />
        <div className="container">
          { erIDev ? <Hendelser /> : null }
          <Home api={api} info={info} paabegynteSoknader={paabegynteSoknader} mininnboks={mininnboks} isLoaded={isLoaded} sakstema={sakstema} />
        </div>
      </main>
    );
}

App.propTypes = {
  api: Api.ApiType(),
};

export default App;