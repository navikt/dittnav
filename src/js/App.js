import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PersonInfo from 'js/components/PersonInfo';
import InfoMeldinger from 'js/components/InfoMeldinger';
import Tjenester from 'js/components/Tjenester';
import Lenkelister from 'js/components/Lenkelister';
import Artikkel from 'js/components/Artikkel';
import FeilMeldinger from 'js/components/FeilMeldinger';
import 'less/index.less';

const getInfoMeldinger = (info, paabegynteSaker, mininnboks) => ({
  isInactive: info.personinfo ? info.personinfo.erInaktiv : true,
  isMeldeKortUser: info.personinfo ? info.personinfo.erMeldekortbruker : null,
  infoMessages: info.infoMessages,
  agMessagesCount: info.agMessagesCount,
  navMessagesCount: info.navMessagesCount,
  pleiepenger: info.pleiepenger,
  paabegynteSaker: paabegynteSaker.paabegynte,
  meldekort: info.meldekort,
  isRegisteredAtIArbeid: info.personinfo ? info.personinfo.erUnderRegistreringIArbeid : null,
  mininnboks,
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { info: {}, paabegynteSaker: {}, mininnboks: [], errors: [] };
  }

  componentWillMount() {
    const { errors } = this.state;
    const catchError = msg =>
      () => {
        errors.push(msg);
        this.setState(Object.assign(this.state, { errors }));
      };

    this.props.api.fetchPersonInfoAndServices()
      .then((r) => {
        this.setState(Object.assign(this.state, { info: r }));
      }).catch(catchError('error.person.info'));

    this.props.api.fetchPaabegynteSaker()
      .then((r) => {
        if (r.feilendeBaksystem && r.feilendeBaksystem.length > 0) {
          errors.push('error.paabegynte');
        }
        this.setState(Object.assign(this.state, { paabegynteSaker: r, errors }));
      }).catch(catchError('error.paabegynte'));

    this.props.api.fetchMinInnboksData()
      .then((r) => {
        this.setState(Object.assign(this.state, { mininnboks: r }));
      }).catch(catchError('error.mininnboks'));
  }

  render() {
    const {
      info, paabegynteSaker, mininnboks, errors,
    } = this.state;
    return (
      <main role="main">
        <FeilMeldinger errors={errors} />
        <div className="container">
          <div className="row">
            <div className="maincontent side-innhold">
              <div className="col-md-12">
                <PersonInfo personInfo={info.personinfo} />
                <InfoMeldinger {...getInfoMeldinger(info, paabegynteSaker, mininnboks)} />
                <Tjenester services={info.viktigeTjenester} />
                <Lenkelister links={info.andreTjenester} />
              </div>
            </div>
          </div>
          <Artikkel article={info.article} />
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
