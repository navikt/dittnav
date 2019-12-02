import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FeilMeldinger from './components/FeilMeldinger';
import Home from './pages/Home';
import '../less/index.less';

class App extends Component {
  state = {
    oppfolging: null,
    meldekort: null,
    person: null,
    identifikator: null,
    paabegynteSoknader: null,
    mininnboks: [],
    sakstema: { antallSakstema: 0, sakstemaList: [] },
    errors: [],
    fetching: 0,
    oppfolgingHasLoaded: false,
  };

  async componentWillMount() {
    const { errors } = this.state;
    const { api } = this.props;

    const handleError = (e) => {
      const { fetching } = this.state;
      this.setState({ fetching: fetching + 1 });

      if (e.status === 401 || e.status === 403) {
        return;
      }

      errors.push('error.baksystemer');
      this.setState({ errors });
    };

    const handlePersonIdentError = () => {
      const { fetching } = this.state;
      this.setState({ fetching: fetching + 1 });
    };

    const handleOppfolgingError = () => {
      const { fetching } = this.state;
      this.setState({ fetching: fetching + 1 });
      errors.push('error.baksystemer');
      this.setState({ errors, oppfolgingHasLoaded: true });
    };

    api.fetchOppfolging()
      .then((r) => {
        this.setState(() => ({ oppfolging: r, oppfolgingHasLoaded: true, errors, fetching: this.state.fetching + 1 }));
      }).catch(handleOppfolgingError);

    api.fetchMeldekort()
      .then((r) => {
        this.setState(() => ({ meldekort: r, errors, fetching: this.state.fetching + 1 }));
      }).catch(handleError);

    api.fetchPersonNavn()
      .then((r) => {
        this.setState(() => ({ person: r, errors, fetching: this.state.fetching + 1 }));
      }).catch(handleError);

    api.fetchPersonIdent()
      .then((r) => {
        this.setState(() => ({ identifikator: r, errors, fetching: this.state.fetching + 1 }));
      }).catch(handlePersonIdentError);

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
      oppfolging,
      meldekort,
      person,
      identifikator,
      paabegynteSoknader,
      sakstema,
      mininnboks,
      errors,
      fetching,
      oppfolgingHasLoaded,
    } = this.state;

    const uniqueErrors = errors.filter((item, i, ar) => ar.indexOf(item) === i);

    return (
      <main role="main">
        <FeilMeldinger errors={uniqueErrors} />
        <div className="container">
          <Home
            oppfolging={oppfolging}
            meldekort={meldekort}
            person={person}
            identifikator={identifikator}
            paabegynteSoknader={paabegynteSoknader}
            mininnboks={mininnboks}
            fetching={fetching}
            sakstema={sakstema}
            oppfolgingHasLoaded={oppfolgingHasLoaded}
          />
        </div>
      </main>
    );
  }
}

App.propTypes = {
  api: PropTypes.shape({
    fetchOppfolging: PropTypes.func.isRequired,
    fetchPersonNavn: PropTypes.func.isRequired,
    fetchPersonIdent: PropTypes.func.isRequired,
    fetchMeldekort: PropTypes.func.isRequired,
    fetchSaker: PropTypes.func.isRequired,
    fetchMeldinger: PropTypes.func.isRequired,
    fetchSakstema: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
