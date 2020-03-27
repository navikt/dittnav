import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import RenderHome from './pages/Home/RenderHome';
import RenderVarslinger from './pages/Varslinger/RenderVarslinger';
import HendelserTestSide from './pages/Hendelser/HendelserTestSide';
import BeskjedStoreProvider from './context/BeskjedStoreProvider';
import Config from './globalConfig';
import '../less/index.less';
import ApiType from './types/ApiType';

const App = ({ api }) => (
  <Router>
    <Switch>
      <Route path="/person/dittnav" exact>
        <BeskjedStoreProvider>
          <RenderHome api={api} />
        </BeskjedStoreProvider>
      </Route>
      <Route path="/person/dittnav/varslinger">
        { Config.VARSLINGER_FEATURE_TOGGLE ? (
          <BeskjedStoreProvider>
            <RenderVarslinger api={api} />
          </BeskjedStoreProvider>
        ) : null }
      </Route>
      <Route path="/person/dittnav/hendelser">
        { Config.HENDELSER_FEATURE_TOGGLE ? (
          <BeskjedStoreProvider>
            <HendelserTestSide />
          </BeskjedStoreProvider>
        ) : null }
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
