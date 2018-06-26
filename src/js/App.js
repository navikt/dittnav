import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PersonInfo from './components/PersonInfo';
import InfoMeldinger from './components/InfoMeldinger';
import Tjenester from './components/Tjenester';
import Lenkelister from './components/Lenkelister';
import Artikler from './components/Artikler';
import '../less/index.less';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { linksList: [] };
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
                <Tjenester />
                <Lenkelister links={this.state.linksList} />
              </div>
            </div>
          </div>

          <Artikler />

        </div>
      </main>
    );
  }
}

App.propTypes = {
  api: PropTypes.func.isRequired,
};

export default App;
