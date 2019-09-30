import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage as F } from 'react-intl';

import Vta from '../components/VTA';
import PersonInfo from '../components/PersonInfo';
import InfoMeldinger from '../components/InfoMeldinger';

import DittnavFliser from '../components/DittnavFliser';
import DittnavLenkePanel from '../components/DittnavLenkePanel';
import Lenkelister from '../components/Lenkelister';
import Artikkel from '../components/Artikkel';
import DelayedSpinner from '../components/DelayedSpinner';

import Config from '../Config';

const getInfoMeldinger = (info, paabegynteSoknader, mininnboks) => ({
  isInactive: info.personinfo ? info.personinfo.inaktiv : true,
  isMeldeKortUser: info.personinfo ? info.personinfo.meldekortbruker : null,
  infoMessages: info.infoMessages,
  paabegynteSoknader,
  meldekort: info.meldekort,
  mininnboks,
});

class Home extends Component {
  render() {
    const { info, paabegynteSoknader, mininnboks, fetching } = this.props;
    const tjenesterEllerVta = info.personinfo && info.personinfo.underOppfolging ? <Vta /> : <DittnavFliser />;
    const erUnderOppfolging = info && info.personinfo && info.personinfo.underOppfolging;
    const oppfolgingsLenker = Config.dittNav.OPPFOLGINGS_LENKER;
    const generelleLenker = Config.dittNav.GENERELLE_LENKER;
    return (
      <>
        <div className="row">
          <div className="maincontent side-innhold">
            <div className="col-md-12" id="dittnav-main-container">
              <PersonInfo personInfo={info.personinfo} />
              { fetching < 3 ? <DelayedSpinner delay={500} spinnerClass="header-spinner" /> : null }
              <InfoMeldinger {...getInfoMeldinger(info, paabegynteSoknader, mininnboks)} />
              <DittnavLenkePanel />
              { !info || !info.personinfo ? null : tjenesterEllerVta }
              <Undertittel className="relatert-informasjon__subheader">
                <F id="relatertInformasjon.header" />
              </Undertittel>
              { erUnderOppfolging ? <Lenkelister links={oppfolgingsLenker} /> : <Lenkelister links={generelleLenker} /> }
            </div>
          </div>
        </div>
        <Artikkel article={info.article} />
      </>
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
