import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Toggle } from './constants';
import useApiQueries from './hooks/useApiQueries';
import ScrollToTop from './components/scroll/ScrollToTop';
import Home from './pages/Home/Home';
import Varslinger from './pages/Varslinger/Varslinger';
import HendelserTestSide from './pages/Hendelser/HendelserTestSide';
import Statusoppdatering from './pages/Statusoppdatering/Statusoppdatering';
import Tidslinje from './pages/Tidslinje/Tidslinje';
import { fetchUnleashToggle } from './Api';

const App = () => {
  const { data: minSideToggle } = useQuery('minside', fetchUnleashToggle);
  useApiQueries();

  useEffect(() => {
    if (minSideToggle?.content === true) {
      window.location.assign(`${window.env.NAVNO_URL}/minside`);
    }
  }, [minSideToggle]);

  return (
    <Router basename="/person">
      <ScrollToTop />
      <Switch>
        <Route
          path="/dittnav"
          exact
          component={Home}
        />
        <Route
          path="/dittnav/varslinger"
          exact
          component={Varslinger}
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
