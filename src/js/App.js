import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import RenderHome from './pages/Home/RenderHome';
import RenderVarslinger from './pages/Varslinger/RenderVarslinger';
import HendelserTestSide from './pages/Hendelser/HendelserTestSide';
import BeskjedStoreProvider from './context/BeskjedStoreProvider';
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
          <BeskjedStoreProvider>
            <RenderHome {...props} api={api} />
          </BeskjedStoreProvider>
        )}
      />
      {Config.VARSLINGER_FEATURE_TOGGLE && (
        <Route
          path="/dittnav/varslinger"
          exact
          render={(props) => (
            <BeskjedStoreProvider>
              <RenderVarslinger {...props} api={api} />
            </BeskjedStoreProvider>
          )}
        />
      )}
      {Config.TEST_SIDE_FEATURE_TOGGLE && (
        <Route
          path="/dittnav/hendelser"
          exact
          render={(props) => (
            <BeskjedStoreProvider>
              <HendelserTestSide {...props} />
            </BeskjedStoreProvider>
          )}
        />
      )}
      <Route
        path="/dittnav*"
        exact
        render={(props) => (
          <BeskjedStoreProvider>
            <RenderHome {...props} api={api} />
          </BeskjedStoreProvider>
        )}
      />
    </Switch>
  </Router>
);

App.propTypes = {
  api: ApiType.isRequired,
};

export default App;
