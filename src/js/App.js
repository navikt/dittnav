import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Api from './Api';
import RenderHome from './pages/Home/RenderHome';
import RenderVarslinger from './pages/Varslinger/RenderVarslinger';
import HendelserTestGui from './components/testgui/HendelserTestGui';
import Config from './globalConfig';
import '../less/index.less';

const App = () => (
  <Router>
    <Switch>
      <Route path="/person/dittnav" exact>
        <RenderHome api={Api} />
      </Route>
      <Route path="/person/dittnav/varslinger">
        <RenderVarslinger api={Api} />
      </Route>
      <Route path="/person/dittnav/hendelser">
        { Config.HENDELSER_FEATURE_TOGGLE ? <HendelserTestGui /> : null }
      </Route>
    </Switch>
  </Router>
);

export default App;
