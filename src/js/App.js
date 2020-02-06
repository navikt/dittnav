import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Api from './Api';
import RenderHome from './pages/Home/RenderHome';
import RenderVarslinger from './pages/Varslinger/RenderVarslinger';
import HendelserTestGui from './components/testgui/HendelserTestGui';
import Config from './Config';
import '../less/index.less';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <RenderHome api={Api} />
      </Route>
      <Route path="/varslinger">
        <RenderVarslinger api={Api} />
      </Route>
      <Route path="/hendelser">
        { Config.IS_DEV ? <HendelserTestGui /> : null }
      </Route>
    </Switch>
  </Router>
);

export default App;
