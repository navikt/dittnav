import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PaabegynteSoknader, { PaabegynteSakType } from 'js/components/meldinger/PaabegynteSoknader';
import RegStatusLink from 'js/components/RegStatusLink';
import Meldekort, { MeldekortType } from 'js/components/Meldekort';
import PleiepengerList, { Pleiepenger } from 'js/components/meldinger/PleiepengerList';
import AgMeldinger from 'js/components/meldinger/AgMeldinger';
import NavMeldinger from 'js/components/meldinger/NavMeldinger';
import MinInnboks, { MinInnboksType } from 'js/components/meldinger/MinInnboks';
import InformasjonsMeldinger, { InfoMessagesType } from 'js/components/meldinger/InformasjonsMeldinger';

class InfoMeldinger extends Component {
  render() {
    return (
      <section className="infomeldinger-list">
        <h1 className="vekk">Varsler</h1>
        <Meldekort meldekort={this.props.meldekort} />
        <RegStatusLink isRegisteredAtIArbeid={this.props.isRegisteredAtIArbeid} />
        {!this.props.isInactive ? <AgMeldinger agMessagesCount={this.props.agMessagesCount} /> : null}
        <NavMeldinger navMessagesCount={this.props.navMessagesCount} />
        <InformasjonsMeldinger infoMessages={this.props.infoMessages} isMeldeKortUser={this.props.isMeldeKortUser} />
        <PaabegynteSoknader paabegynteSaker={this.props.paabegynteSaker} />
        <MinInnboks mininnboks={this.props.mininnboks} />
        <PleiepengerList pleiepenger={this.props.pleiepenger} />
      </section>
    );
  }
}

InfoMeldinger.propTypes = {
  paabegynteSaker: PropTypes.arrayOf(PaabegynteSakType),
  pleiepenger: PropTypes.arrayOf(Pleiepenger),
  isRegisteredAtIArbeid: PropTypes.bool,
  meldekort: MeldekortType,
  navMessagesCount: PropTypes.number,
  agMessagesCount: PropTypes.number,
  infoMessages: InfoMessagesType,
  isMeldeKortUser: PropTypes.bool,
  isInactive: PropTypes.bool.isRequired,
  mininnboks: MinInnboksType,
};

InfoMeldinger.defaultProps = {
  paabegynteSaker: [],
  isRegisteredAtIArbeid: null,
  meldekort: null,
  pleiepenger: null,
  navMessagesCount: 0,
  agMessagesCount: 0,
  infoMessages: null,
  isMeldeKortUser: false,
  mininnboks: [],
};

export default InfoMeldinger;
