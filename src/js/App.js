import React, { Component } from 'react';
import PropTypes from 'prop-types';

import conf from 'js/Config';
import FeilMeldinger from 'js/components/FeilMeldinger';
import Postkasse from 'js/pages/Postkasse';
import Login from 'js/pages/Login';
import Home from 'js/pages/Home';

import 'less/index.less';

function route(props, options) {
  const { path } = props;
  const { info, paabegynteSaker, mininnboks } = options;
  switch (path) {
    case `${conf.dittNav.CONTEXT_PATH}/postkasse`:
      return <Postkasse {...props} info={info} />;
    case `${conf.dittNav.CONTEXT_PATH}/login`:
      return <Login />;
    default:
      return <Home info={info} paabegynteSaker={paabegynteSaker} mininnboks={mininnboks} />;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { info: {}, paabegynteSaker: {}, mininnboks: [], errors: [] };
  }

  componentWillMount() {
    const { errors } = this.state;
    const { api, path } = this.props;
    if (path === `${conf.dittNav.CONTEXT_PATH}/login`) {
      return;
    }
    const catchError = msg => () => {
      errors.push(msg);
      this.setState(Object.assign(this.state, { errors }));
    };

    api.fetchPersonInfoAndServices()
      .then((r) => {
        this.setState(Object.assign(this.state, { info: r }));
      }).catch(catchError('error.person.info'));

    api.fetchPaabegynteSaker()
      .then((r) => {
        if (r.feilendeBaksystem && r.feilendeBaksystem.length > 0) {
          errors.push('error.paabegynte');
        }
        this.setState(Object.assign(this.state, { paabegynteSaker: r, errors }));
      }).catch(catchError('error.paabegynte'));

    api.fetchMinInnboksData()
      .then((r) => {
        this.setState(Object.assign(this.state, { mininnboks: r }));
      }).catch(catchError('error.mininnboks'));
  }

  render() {
    const {
      info, paabegynteSaker, mininnboks, errors,
    } = this.state;
    return (
      <main role="main">
        <FeilMeldinger errors={errors} />
        <div className="container maincontent side-innhold">
          {route(this.props, { info, paabegynteSaker, mininnboks })}
        </div>
      </main>
    );
  }
}

App.propTypes = {
  api: PropTypes.shape({
    fetchPersonInfoAndServices: PropTypes.func.isRequired,
    fetchPaabegynteSaker: PropTypes.func.isRequired,
    fetchMinInnboksData: PropTypes.func.isRequired,
  }).isRequired,
  path: PropTypes.string.isRequired,
};

export default App;
