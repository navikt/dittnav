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
  isInactive: info.personInfo ? info.personInfo.isInactive : true,
  isMeldeKortUser: info.personInfo ? info.personInfo.isMeldeKortUser : null,
  infoMessages: info.infoMessages,
  agMessagesCount: info.agMessagesCount,
  navMessagesCount: info.navMessagesCount,
  pleiepenger: info.pleiepenger,
  paabegynteSaker: paabegynteSaker.paabegynte,
  meldekort: info.meldekort,
  isRegisteredAtIArbeid: info.personInfo ? info.personInfo.isRegisteredAtIArbeid : null,
  mininnboks,
});

const i18n = {
  'error.general.connection.problem': 'Error fetchin data',
  'error.person.info': 'Det skjedde en feil under henting av person info',
  'error.paabegynte': 'Det skjedde en feil under henting av saker',
  'error.mininnboks': 'Det skjedde en feil under henting av meldinger fra din innboks',
}; // TODO will be fixed in IN-365

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { info: {}, paabegynteSaker: {}, mininnboks: [], errors: [] }; // eslint-disable-line
  }

  componentWillMount() {
    const { errors } = this.state;
    const catchError = msg =>
      () => {
        errors.push(msg);
        this.setState(Object.assign(this.state, { errors }));
      };
    // const defaultErrorHandler = () => catchError(i18n('error.general.connection.problem'));

    this.props.api.fetchPersonInfoAndServices()
      .then((r) => {
        this.setState(Object.assign(this.state, { info: r }));
      }).catch(catchError(i18n['error.person.info']));

    this.props.api.fetchPaabegynteSaker()
      .then((r) => {
        if (r.feilendeBaksystem && r.feilendeBaksystem.length > 0) {
          errors.push(i18n['error.paabegynte']);
        }
        this.setState(Object.assign(this.state, { paabegynteSaker: r, errors }));
      }).catch(catchError(i18n['error.paabegynte']));

    this.props.api.fetchMinInnboksData()
      .then((r) => {
        this.setState(Object.assign(this.state, { mininnboks: r }));
      }).catch(catchError(i18n['error.mininnboks']));
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
                <PersonInfo personInfo={info.personInfo} />
                <InfoMeldinger {...getInfoMeldinger(info, paabegynteSaker, mininnboks)} />
                <Tjenester services={info.services} />
                <Lenkelister links={info.links} />
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
