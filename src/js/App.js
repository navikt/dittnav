import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Config from './Config';
import FeilMeldinger from './components/FeilMeldinger';
import Home from './pages/Home';
import Hendelser from './components/Hendelser';
import '../less/index.less';

class App extends Component {
  state = {
    oppfolging: null,
    meldekort: null,
    tps: null,
    paabegynteSoknader: null,
    mininnboks: [],
    sakstema: { antallSakstema: 0, sakstemaList: [] },
    errors: [],
    fetching: 0,
  };

  async componentWillMount() {
    const { errors } = this.state;
    const { api } = this.props;

    const handleError = (e) => {
      const { fetching } = this.state;
      this.setState({ fetching: fetching + 1 });
      if (e.status === 401) {
        return;
      }

      errors.push('error.baksystemer');
      this.setState({ errors });
    };

    api.fetchOppfolging()
      .then((r) => {
        this.setState(() => ({ oppfolging: r, errors, fetching: this.state.fetching + 1 }));
      }).catch(handleError);

    api.fetchMeldekort()
      .then((r) => {
        this.setState(() => ({ meldekort: r, errors, fetching: this.state.fetching + 1 }));
      }).catch(handleError);

    api.fetchTps()
      .then((r) => {
        this.setState(() => ({ tps: r, errors, fetching: this.state.fetching + 1 }));
      }).catch(handleError);

    api.fetchSaker()
      .then((r) => {
        const { feilendeBaksystem } = r;
        if (feilendeBaksystem.length > 0) {
          errors.push('error.baksystemer');
        }
        this.setState(() => ({ paabegynteSoknader: r, fetching: this.state.fetching + 1 }));
      }).catch(handleError);

    api.fetchMeldinger()
      .then((r) => {
        this.setState(() => ({ mininnboks: r, fetching: this.state.fetching + 1 }));
      }).catch(handleError);

    api.fetchSakstema()
      .then((r) => {
        this.setState(() => ({ sakstema: r, fetching: this.state.fetching + 1 }));
      }).catch(handleError);
  }

  render() {
    const {
      oppfolging, meldekort, tps, paabegynteSoknader, sakstema, mininnboks, errors, fetching,
    } = this.state;

    const uniqueErrors = errors.filter((item, i, ar) => ar.indexOf(item) === i);
    
    // const erIDev = Config.ENVIRONMENT !== 'prod';
    // { erIDev ? <Hendelser /> : null }

    return (
      <main role="main">
        <FeilMeldinger errors={uniqueErrors} />
        <div className="container">
          <Home
            oppfolging={oppfolging}
            meldekort={meldekort}
            tps={tps}
            paabegynteSoknader={paabegynteSoknader}
            mininnboks={mininnboks}
            fetching={fetching}
            sakstema={sakstema}
          />
        </div>
      </main>
    );
  }
}

App.propTypes = {
  api: PropTypes.shape({
    fetchOppfolging: PropTypes.func.isRequired,
    fetchTps: PropTypes.func.isRequired,
    fetchMeldekort: PropTypes.func.isRequired,
    fetchSaker: PropTypes.func.isRequired,
    fetchMeldinger: PropTypes.func.isRequired,
    fetchSakstema: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
