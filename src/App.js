import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Toggle } from './constants';
import ScrollToTop from './components/scroll/ScrollToTop';
import Home from './pages/Home/Home';
import HendelserTestSide from './pages/Hendelser/HendelserTestSide';
import Statusoppdatering from './pages/Statusoppdatering/Statusoppdatering';
import Tidslinje from './pages/Tidslinje/Tidslinje';

const App = () => {
  window.location.assign(`${window.env.NAVNO_URL}/minside`);

  return (
    <Router basename="/person">
      <ScrollToTop />
      <Switch>
        <Route
          path="/dittnav"
          exact
          component={null}
        />
        <Route
          path="/dittnav/varslinger"
          exact
          component={null}
        />
        {Toggle.TEST_SIDE && (
          <Route
            path="/dittnav/hendelser"
            exact
            component={HendelserTestSide}
          />
        )}
        {Toggle.TEST_SIDE && (
          <Route
            path="/dittnav/statusoppdatering"
            exact
            component={Statusoppdatering}
          />
        )}
        {Toggle.TEST_SIDE && (
          <Route
            path="/dittnav/tidslinje"
            exact
            component={Tidslinje}
          />
        )}
        <Route
          path="/dittnav*"
          exact
          component={Home}
        />
      </Switch>
    </Router>
  );
};

export default App;
