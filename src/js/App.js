import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import RenderHome from './pages/Home/RenderHome';
import RenderVarslinger from './pages/Varslinger/RenderVarslinger';
import HendelserTestSide from './pages/Hendelser/HendelserTestSide';
import ScrollToTop from './components/scroll/ScrollToTop';
import Config from './globalConfig';
import '../less/index.less';
import ApiType from './types/ApiType';

const App = ({ api }) => (
  <Router basename="/person">
    <ScrollToTop />
    <Switch>
      <Route
        path="/dittnav"
        exact
        render={(props) => (
          <RenderHome {...props} api={api} />
        )}
      />
      <Route
        path="/dittnav/varslinger"
        exact
        render={(props) => (
          <RenderVarslinger {...props} api={api} />
        )}
      />
      {Config.TEST_SIDE_FEATURE_TOGGLE && (
        <Route
          path="/dittnav/hendelser"
          exact
          render={(props) => (
            <HendelserTestSide {...props} />
          )}
        />
      )}
      <Route
        path="/dittnav*"
        exact
        render={(props) => (
          <RenderHome {...props} api={api} />
        )}
      />
    </Switch>
  </Router>
);

App.propTypes = {
  api: ApiType.isRequired,
};

export default App;
