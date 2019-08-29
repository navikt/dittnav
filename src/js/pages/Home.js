import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage as F } from 'react-intl';

import Vta from '../components/VTA';
import PersonInfo from '../components/PersonInfo';
import InfoMeldinger from '../components/InfoMeldinger';
import Hendelser from '../components/Hendelser';

import DittnavFliser from '../components/DittnavFliser';
import DittnavLenkePanel from '../components/DittnavLenkePanel';
import Lenkelister from '../components/Lenkelister';
import Artikkel from '../components/Artikkel';
import DelayedSpinner from '../components/DelayedSpinner';

import Config from '../Config';
import Environments from '../Environment';

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

const hjSafetyStub = () => {
  window.hj=window.hj||function(){(hj.q=hj.q||[]).push(arguments)}; // eslint-disable-line
};

const gaSafetyStub = () => {
  window.dataLayer=window.dataLayer||{ push: function(o){console.error(o)} }; // eslint-disable-line
};

const hjTrigger = name => hj('trigger', name); // eslint-disable-line
const gaTrigger = (gruppe, variant) => dataLayer.push({ 'event':'dittnav-segment', 'gruppe' : gruppe, 'variant': variant } ); // eslint-disable-line

class Home extends Component {
  componentDidMount() {
    hjSafetyStub();
    gaSafetyStub();
  }

  componentDidUpdate() {
    const { info, fetching } = this.props;
    if (fetching >= 3) {
      try {
        const n = document.getElementById('dittnav-main-container').children.length;
        if (info.personinfo && info.personinfo.underOppfolging) {
          gaTrigger('vta', n);
          hjTrigger(`dittnav-vta-${n}`);
        } else {
          gaTrigger('gen', n);
          hjTrigger(`dittnav-gen-${n}`);
          hjTrigger('dittnav-generellbruker');
        }
      } catch (e) {
        console.error(e);
        console.error('Failed callig hotjar');
      }
    }
  }

  render() {
    const { info, paabegynteSoknader, mininnboks, fetching } = this.props;
    const tjenesterEllerVta = info.personinfo && info.personinfo.underOppfolging ? <Vta /> : <DittnavFliser />;
    const erUnderOppfolging = info && info.personinfo && info.personinfo.underOppfolging;
    const oppfolgingsLenker = Config.dittNav.OPPFOLGINGS_LENKER;
    const generelleLenker = Config.dittNav.GENERELLE_LENKER;
    const erIkkeIProd = Environments() === 'LOCAL' || Environments() === 'DEV';
    return (
      <>
        <div className="row">
          <div className="maincontent side-innhold">
            <div className="col-md-12" id="dittnav-main-container">
              <PersonInfo personInfo={info.personinfo} />
              { fetching < 3 ? <DelayedSpinner delay={500} spinnerClass="header-spinner" /> : null }
              { erIkkeIProd ? <Hendelser /> : null }
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
