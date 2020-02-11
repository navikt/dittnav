import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import PropTypes from 'prop-types';
import RenderHome from './pages/Home/RenderHome';
import RenderVarslinger from './pages/Varslinger/RenderVarslinger';
import HendelserTestGui from './components/testgui/HendelserTestGui';
import Config from './globalConfig';
import '../less/index.less';

const App = ({ api }) => (
  <Router>
    <Switch>
      <Route path="/person/dittnav" exact>
        <RenderHome api={api} />
      </Route>
      <Route path="/person/dittnav/varslinger">
        <RenderVarslinger api={api} />
      </Route>
      <Route path="/person/dittnav/hendelser">
        { Config.HENDELSER_FEATURE_TOGGLE ? <HendelserTestGui /> : null }
      </Route>
      <Route path="/person/dittnav/*">
        <RenderHome api={api} />
      </Route>
    </Switch>
  </Router>
);

App.propTypes = {
  api: PropTypes.shape({
    fetchOppfolging: PropTypes.func.isRequired,
    fetchPersonNavn: PropTypes.func.isRequired,
    fetchPersonIdent: PropTypes.func.isRequired,
    fetchMeldekort: PropTypes.func.isRequired,
    fetchSaker: PropTypes.func.isRequired,
    fetchMeldinger: PropTypes.func.isRequired,
    fetchSakstema: PropTypes.func.isRequired,
    fetchHendelser: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
