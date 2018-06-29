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
    this.state = {};
  }

  componentWillMount() {
    this.props.api().then((r) => {
      this.setState(r);
    });
  }

  render() {
    return (
      <main role="main">
        <section className="service-notification" style={{ display: 'block' }}>
          <h1 className="typo-element">
            <span style={{ display: 'inline' }}>Det skjedde en feil under henting av saker</span>
            <span style={{ display: 'inline' }}>Det skjedde en feil under henting av meldinger fra din innboks</span>
          </h1>
        </section>
        <div className="container">
          <div className="row">
            <div className="maincontent side-innhold">
              <div className="col-md-12">
                <PersonInfo />
                <InfoMeldinger />
                <Tjenester services={this.state.services} />
                <Lenkelister links={this.state.links} />
              </div>
            </div>
          </div>

          <Artikkel article={this.state.article} />

        </div>
      </main>
    );
  }
}

App.propTypes = {
  api: PropTypes.func.isRequired,
};

export default App;
