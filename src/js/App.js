import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import RenderHome from './pages/Home/RenderHome';
import RenderVarslinger from './pages/Varslinger/RenderVarslinger';
import HendelserTestSide from './pages/Hendelser/HendelserTestSide';
import Config from './globalConfig';
import '../less/index.less';
import ApiType from './types/ApiType';

const App = ({ api }) => (
  <Router>
    <Switch>
      <Route path="/person/dittnav" exact>
        <RenderHome api={api} />
      </Route>
      <Route path="/person/dittnav/varslinger">
        { Config.VARSLINGER_FEATURE_TOGGLE ? <RenderVarslinger api={api} /> : null }
      </Route>
      <Route path="/person/dittnav/hendelser">
        { Config.TEST_SIDE_FEATURE_TOGGLE ? <HendelserTestSide /> : null }
      </Route>
      <Route path="/person/dittnav/*">
        <RenderHome api={api} />
      </Route>
    </Switch>
  </Router>
);

App.propTypes = {
  api: ApiType.isRequired,
};

export default App;
