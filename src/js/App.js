import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PersonInfo from './components/PersonInfo';
import InfoMeldinger from './components/InfoMeldinger';
import Tjenester from './components/Tjenester';
import Lenkelister from './components/Lenkelister';
import Artikkel from './components/Artikkel';
import '../less/index.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { info: {}, paabegynteSaker: {} };
  }

  componentWillMount() {
    this.props.api.fetchPersonInfoAndServices().then((r) => {
      this.setState({ info: r, paabegynteSaker: this.state.paabegynteSaker });
    });

    this.props.api.fetchPaabegynteSaker().then((r) => {
      this.setState({ info: this.state.info, paabegynteSaker: r });
    });
  }

  render() {
    const s = this.state;
    return (
      <main role="main">
        <section className="service-notification" style={{ display: 'block' }}>
          <h1 className="typo-element">
            <span style={{ display: 'inline' }}>{s.paabegynteSaker.feilendeBaksystem && s.paabegynteSaker.feilendeBaksystem.length > 0 ? 'Det skjedde en feil under henting av saker' : ''}</span>
            <span style={{ display: 'inline' }}>Det skjedde en feil under henting av meldinger fra din innboks</span>
          </h1>
        </section>
        <div className="container">
          <div className="row">
            <div className="maincontent side-innhold">
              <div className="col-md-12">
                <PersonInfo personInfo={s.info.personInfo} />
                <InfoMeldinger paabegynteSaker={s.paabegynteSaker.paabegynte} />
                <Tjenester services={s.info.services} />
                <Lenkelister links={s.info.links} />
              </div>
            </div>
          </div>

          <Artikkel article={s.info.article} />

        </div>
      </main>
    );
  }
}

App.propTypes = {
  api: PropTypes.shape({
    fetchPersonInfoAndServices: PropTypes.func.isRequired,
    fetchPaabegynteSaker: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
