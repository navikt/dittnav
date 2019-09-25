import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FeilMeldinger from './components/FeilMeldinger';
import Home from './pages/Home';
import Hendelser from './components/Hendelser';

import '../less/index.less';

import Environments from './Environment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      paabegynteSoknader: null,
      mininnboks: [],
      sakstema: { waiting: true, antallSakstema: 0, sakstemaList: [] },
      errors: [],
      fetching: 0,
    };
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
      })
      .catch(catchError('error.baksystemer'));

    api.fetchSaker()
      .then((r) => {
        const { feilendeBaksystem } = r;
        if (feilendeBaksystem.length > 0) {
          errors.push('error.baksystemer');
        }
        this.setState(() => ({ paabegynteSoknader: r, fetching: this.state.fetching + 1 }));
      }).catch(catchError('error.baksystemer'));

    api.fetchMeldinger()
      .then((r) => {
        this.setState(() => ({ mininnboks: r, fetching: this.state.fetching + 1 }));
      }).catch(catchError('error.baksystemer'));

    api.fetchSakstema()
      .then((r) => {
        this.setState(() => ({ sakstema: r, fetching: this.state.fetching + 1 }));
      }).catch(catchError('error.baksystemer'));
  }

  render() {
    const {
      info, paabegynteSoknader, mininnboks, errors, fetching, sakstema,
    } = this.state;

    const uniqueErrors = errors.filter((item, i, ar) => ar.indexOf(item) === i);
    const erIDev = Environments() !== 'PROD';

    return (
      <main role="main">
        <FeilMeldinger errors={uniqueErrors} />
        <div className="container">
          { erIDev ? <Hendelser /> : null }
          <Home info={info} paabegynteSoknader={paabegynteSoknader} mininnboks={mininnboks} fetching={fetching} sakstema={sakstema} />
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
    fetchSakstema: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
