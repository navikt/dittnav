import React, { Component } from 'react';

import PersonInfo from 'js/components/PersonInfo';
import InfoMeldinger from 'js/components/InfoMeldinger';
import Tjenester from 'js/components/Tjenester';
import Lenkelister from 'js/components/Lenkelister';
import Artikkel from 'js/components/Artikkel';

const getInfoMeldinger = (info, paabegynteSaker, mininnboks) => ({
  isInactive: info.personinfo ? info.personinfo.inaktiv : true,
  isMeldeKortUser: info.personinfo ? info.personinfo.meldekortbruker : null,
  infoMessages: info.infoMessages,
  agMessagesCount: info.agMessagesCount,
  navMessagesCount: info.navMessagesCount,
  pleiepenger: info.pleiepenger,
  paabegynteSaker: paabegynteSaker.paabegynte,
  meldekort: info.meldekort,
  isRegisteredAtIArbeid: info.personinfo ? info.personinfo.erUnderRegistreringIArbeid : null,
  mininnboks,
});

class Home extends Component {
  render() {
    const { info, paabegynteSaker, mininnboks } = this.props;
    return (
      <React.Fragment>
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
      </React.Fragment>);
  }
}

export default Home;
