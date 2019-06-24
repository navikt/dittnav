import React, { Component } from 'react';

import Vta from 'js/components/VTA';
import PersonInfo from 'js/components/PersonInfo';
import InfoMeldinger from 'js/components/InfoMeldinger';

import DittnavFliser from 'js/components/DittnavFliser';
import DittnavLenkePanel from 'js/components/DittnavLenkePanel';
import Lenkelister from 'js/components/Lenkelister';
import Artikkel from 'js/components/Artikkel';
import PropTypes from 'prop-types';
import DelayedSpinner from 'js/components/DelayedSpinner';

const getInfoMeldinger = (info, paabegynteSoknader, mininnboks) => ({
  isInactive: info.personinfo ? info.personinfo.inaktiv : true,
  isMeldeKortUser: info.personinfo ? info.personinfo.meldekortbruker : null,
  infoMessages: info.infoMessages,
  agMessagesCount: info.agMessagesCount,
  navMessagesCount: info.navMessagesCount,
  paabegynteSoknader,
  meldekort: info.meldekort,
  isRegisteredAtIArbeid: info.personinfo ? info.personinfo.erUnderRegistreringIArbeid : null,
  mininnboks,
});

class Home extends Component {
  render() {
    const { info, paabegynteSoknader, mininnboks, fetching } = this.props;
    const tjeneserEllerVta = info.personinfo && info.personinfo.underOppfolging ? <Vta /> : <DittnavFliser />;
    return (
      <React.Fragment>
        <div className="row">
          <div className="maincontent side-innhold">
            <div className="col-md-12">
              <PersonInfo personInfo={info.personinfo} />
              {fetching < 3 ? <DelayedSpinner delay={500} spinnerClass="header-spinner" /> : null}
              <InfoMeldinger {...getInfoMeldinger(info, paabegynteSoknader, mininnboks)} />
              <DittnavLenkePanel />
              { tjeneserEllerVta }
              <Lenkelister links={info.andreTjenester} />
            </div>
          </div>
        </div>
        <Artikkel article={info.article} />
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  info: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  paabegynteSoknader: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  mininnboks: PropTypes.any.isRequired, // eslint-disable-line react/forbid-prop-types
  fetching: PropTypes.number.isRequired,
};

Home.defaultProps = {
  paabegynteSoknader: null,
};

export default Home;
