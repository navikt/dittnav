import React, { Component } from 'react';
import PropTypes from 'prop-types';

import conf from 'js/Config';
import FeilMeldinger from 'js/components/FeilMeldinger';
import Login from 'js/pages/Login';
import Home from 'js/pages/Home';

import 'less/index.less';

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
    this.state = { info: {}, paabegynteSoknader: null, mininnboks: [], errors: [] };
  }

  componentWillMount() {
    const { errors } = this.state;
    const { api, path } = this.props;
    if (path === `${conf.dittNav.CONTEXT_PATH}/login`) {
      return;
    }
    const catchError = msg => () => {
      errors.push(msg);
      this.setState(() => ({ errors }));
    };

    api.fetchPersonInfoAndServices()
      .then((r) => {
        const { paabegynteSoknader, feilendeTjenester } = r;
        if (paabegynteSoknader && paabegynteSoknader.feilendeBaksystem && paabegynteSoknader.feilendeBaksystem.length > 0) {
          errors.push('error.paabegynte');
        }
        if (feilendeTjenester.length > 0) {
          errors.push('error.baksystemer');
        }
        this.setState(() => ({ info: r, mininnboks: r.ubehandledeMeldinger, paabegynteSoknader, errors }));
      }).catch(catchError('error.person.info'));
  }

  render() {
    const {
      info, paabegynteSoknader, mininnboks, errors,
    } = this.state;
    return (
      <main role="main">
        <FeilMeldinger errors={errors} />
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
  }).isRequired,
  path: PropTypes.string.isRequired,
};

export default App;
