import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PaabegynteSoknader, { PaabegynteSakType } from 'js/components/meldinger/PaabegynteSoknader';
import RegStatusLink from 'js/components/RegStatusLink';
import Meldekort, { MeldekortType } from 'js/components/Meldekort';
import PleiepengerList, { Pleiepenger } from 'js/components/meldinger/PleiepengerList';
import AgMeldinger from 'js/components/meldinger/AgMeldinger';
import NavMeldinger from 'js/components/meldinger/NavMeldinger';
import InformasjonsMeldinger, { InfoMessagesType } from 'js/components/meldinger/InformasjonsMeldinger';

class InfoMeldinger extends Component {
  render() {
    return (
      <section className="infomeldinger-list">
        <h1 className="vekk">Varsler</h1>
        <Meldekort meldekort={this.props.meldekort} />
        <RegStatusLink isRegisteredAtIArbeid={this.props.isRegisteredAtIArbeid} />
        <AgMeldinger />
        <NavMeldinger navMessagesCount={this.props.navMessagesCount} />
        <InformasjonsMeldinger infoMessages={this.props.infoMessages} isMeldeKortUser={this.props.isMeldeKortUser} />
        <PaabegynteSoknader paabegynteSaker={this.props.paabegynteSaker} />
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
  infoMessages: InfoMessagesType,
  isMeldeKortUser: PropTypes.bool,
};

InfoMeldinger.defaultProps = {
  paabegynteSaker: [],
  isRegisteredAtIArbeid: null,
  meldekort: null,
  pleiepenger: null,
  navMessagesCount: 0,
  infoMessages: null,
  isMeldeKortUser: false,
};

export default InfoMeldinger;
