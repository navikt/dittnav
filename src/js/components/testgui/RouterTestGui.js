import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HendelserTestGui from './HendelserTestGui';

const RouterTestGui = () => (
  <Router>
    <Switch>
      <Route path="/person/dittnav/hendelser" component={HendelserTestGui} />
    </Switch>
  </Router>
);

export default RouterTestGui;
