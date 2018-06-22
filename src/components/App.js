import React, { Component } from 'react';
import PersonInfo from './PersonInfo';
import InfoMeldinger from './InfoMeldinger';
import Tjenester from './Tjenester';
import Lenkelister from './Lenkelister';
import Artikler from './Artikler';

// // dittnav\web\src\main\java\no\nav\sbl\dialogarena\dittnav\web\pages\ForsideInnlogget.html
class App extends Component {
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
                <Lenkelister />
              </div>
            </div>
          </div>

          <Artikler />

        </div>
      </main>
    );
  }
}

export default App;
