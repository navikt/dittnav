import React, { Component } from 'react';
import PropTypes from 'prop-types';

import conf from 'js/Config';
import FeilMeldinger from 'js/components/FeilMeldinger';
import Login from 'js/pages/Login';
import Home from 'js/pages/Home';
import NavFrontendSpinner from 'nav-frontend-spinner';

import 'less/index.less';
import 'js/polyfill.js';

function route(props, options) {
  const { path } = props; // eslint-disable-line react/prop-types
  const { info, paabegynteSoknader, mininnboks } = options;
  switch (path) {
    case `${conf.dittNav.CONTEXT_PATH}/login`:
      return <Login />;
    default:
      return <Home info={info} paabegynteSoknader={paabegynteSoknader} mininnboks={mininnboks} />;
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { info: {}, paabegynteSoknader: null, mininnboks: [], errors: [], fetching: 0 };
  }

  async componentWillMount() {
    const { errors } = this.state;
    const { api, path } = this.props;
    if (path === `${conf.dittNav.CONTEXT_PATH}/login`) {
      this.setState(() => ({ fetching: 3 }));
      return;
    }

    const catchError = msg => () => {
      errors.push(msg);
      this.setState(() => ({ errors, fetching: this.state.fetching + 1 }));
    };

    api.fetchPersonInfoAndServices()
      .then((r) => {
        const { feilendeTjenester } = r;
        if (feilendeTjenester.length > 0) {
          errors.push('error.baksystemer');
        }
        this.setState(() => ({ info: r, errors, fetching: this.state.fetching + 1 }));
      }).catch(catchError('error.baksystemer'));

    api.fetchSaker()
      .then((r) => {
        const { feilendeBaksystem } = r;
        if (feilendeBaksystem.length > 0) {
          errors.push('error.baksystemer');
        }
        this.setState(() => ({ paabegynteSoknader: r, fetching: this.state.fetching + 1 }));
      }).catch(catchError('error.baksystemer'));

    api.fetchMeldinger()
      .then((r) => {
        this.setState(() => ({ mininnboks: r, fetching: this.state.fetching + 1 }));
      }).catch(catchError('error.baksystemer'));
  }

  render() {
    const {
      info, paabegynteSoknader, mininnboks, errors,
    } = this.state;

    const uniqueErrors = errors.filter((item, i, ar) => ar.indexOf(item) === i);

    return (
      <main role="main">
        <FeilMeldinger errors={uniqueErrors} />
        {this.state.fetching < 3 ? <NavFrontendSpinner className="header-spinner" /> : null}
        <div className="container">
          {route(this.props, { info, paabegynteSoknader, mininnboks })}
        </div>
      </main>
    );
  }
}

App.propTypes = {
  api: PropTypes.shape({
    fetchPersonInfoAndServices: PropTypes.func.isRequired,
    fetchSaker: PropTypes.func.isRequired,
    fetchMeldinger: PropTypes.func.isRequired,
  }).isRequired,
  path: PropTypes.string.isRequired,
};

export default App;
