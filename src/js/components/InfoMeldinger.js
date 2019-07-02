import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F } from 'react-intl';

import PaabegynteSoknader, { PaabegynteSoknaderType } from '../components/meldinger/PaabegynteSoknader';
import RegStatusLink from '../components/RegStatusLink';
import Meldekort, { MeldekortType } from '../components/Meldekort';
import EtterregistreringMeldekort from '../components/EtterregistreringMeldekort';
import AgMeldinger from '../components/meldinger/AgMeldinger';
import NavMeldinger from '../components/meldinger/NavMeldinger';
import MinInnboks, { MinInnboksType } from '../components/meldinger/MinInnboks';
import InformasjonsMeldinger from '../components/meldinger/InformasjonsMeldinger';

class InfoMeldinger extends Component {
  render() {
    return (
      <section className="infomeldinger-list">
        <h1 className="vekk"><F id="dittnav.infomeldinger.varsler" /></h1>
        <InformasjonsMeldinger isMeldeKortUser={this.props.isMeldeKortUser} />
        <Meldekort meldekort={this.props.meldekort} />
        <EtterregistreringMeldekort ettereg={this.props.meldekort} />
        <RegStatusLink isRegisteredAtIArbeid={this.props.isRegisteredAtIArbeid} />
        {!this.props.isInactive ? <AgMeldinger agMessagesCount={this.props.agMessagesCount} /> : null}
        <NavMeldinger navMessagesCount={this.props.navMessagesCount} />
        <PaabegynteSoknader paabegynteSoknader={this.props.paabegynteSoknader} />
        <MinInnboks mininnboks={this.props.mininnboks} />
      </section>
    );
  }
}

InfoMeldinger.propTypes = {
  paabegynteSoknader: PaabegynteSoknaderType,
  isRegisteredAtIArbeid: PropTypes.bool,
  meldekort: MeldekortType,
  navMessagesCount: PropTypes.number,
  agMessagesCount: PropTypes.number,
  isMeldeKortUser: PropTypes.bool,
  isInactive: PropTypes.bool.isRequired,
  mininnboks: MinInnboksType,
};

InfoMeldinger.defaultProps = {
  paabegynteSoknader: null,
  isRegisteredAtIArbeid: null,
  meldekort: null,
  navMessagesCount: 0,
  agMessagesCount: 0,
  isMeldeKortUser: false,
  mininnboks: [],
};

export default InfoMeldinger;
