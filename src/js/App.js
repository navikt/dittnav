import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FeilMeldinger from 'js/components/FeilMeldinger';
import Home from 'js/pages/Home';

import 'less/index.less';
import 'js/polyfill';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { info: {}, paabegynteSoknader: null, mininnboks: [], errors: [], fetching: 0 };
  }

  async componentWillMount() {
    const { errors } = this.state;
    const { api } = this.props;

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
      info, paabegynteSoknader, mininnboks, errors, fetching,
    } = this.state;

    const uniqueErrors = errors.filter((item, i, ar) => ar.indexOf(item) === i);

    return (
      <main role="main">
        <FeilMeldinger errors={uniqueErrors} />
        <div className="container">
          <Home info={info} paabegynteSoknader={paabegynteSoknader} mininnboks={mininnboks} fetching={fetching} />
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
};

export default App;
