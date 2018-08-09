import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PersonInfo from 'js/components/PersonInfo';
import InfoMeldinger from 'js/components/InfoMeldinger';
import Tjenester from 'js/components/Tjenester';
import Lenkelister from 'js/components/Lenkelister';
import Artikkel from 'js/components/Artikkel';
import 'less/index.less';

const getInfoMeldinger = s => ({
  isInactive: s.info.personInfo ? s.info.personInfo.isInactive : true,
  isMeldeKortUser: s.info.personInfo ? s.info.personInfo.isMeldeKortUser : null,
  infoMessages: s.info.infoMessages,
  agMessagesCount: s.info.agMessagesCount,
  navMessagesCount: s.info.navMessagesCount,
  pleiepenger: s.info.pleiepenger,
  paabegynteSaker: s.paabegynteSaker.paabegynte,
  meldekort: s.info.meldekort,
  isRegisteredAtIArbeid: s.info.personInfo ? s.info.personInfo.isRegisteredAtIArbeid : null,
  mininnboks: s.mininnboks,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { info: {}, paabegynteSaker: {}, mininnboks: [] }; // eslint-disable-line
  }

  componentWillMount() {
    this.props.api.fetchPersonInfoAndServices().then((r) => {
      this.setState(Object.assign(this.state, { info: r }));
    });

    this.props.api.fetchPaabegynteSaker().then((r) => {
      this.setState(Object.assign(this.state, { paabegynteSaker: r }));
    });

    this.props.api.fetchMinInnboksData().then((r) => {
      this.setState(Object.assign(this.state, { mininnboks: r }));
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
                <InfoMeldinger {...getInfoMeldinger(s)} />
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
    fetchMinInnboksData: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
