import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F } from 'react-intl';
import Api from '../Api';
import Unleash from './Unleash';
import PaabegynteSoknader, { PaabegynteSoknaderType } from './meldinger/PaabegynteSoknader';
import Meldekort, { MeldekortType } from './meldinger/Meldekort';
import EtterregistreringMeldekort from './meldinger/EtterregistreringMeldekort';
import MinInnboks, { MinInnboksType } from './meldinger/MinInnboks';
import InformasjonsMeldinger from './meldinger/InformasjonsMeldinger';
import Hendelser from './meldinger/Hendelser';

class InfoMeldinger extends Component {
  render() {
    return (
      <section className="infomeldinger-list">
        <h1 className="vekk"><F id="dittnav.infomeldinger.varsler" /></h1>
        <InformasjonsMeldinger isMeldeKortUser={this.props.isMeldeKortUser} />
        <Meldekort meldekort={this.props.meldekort} />
        <EtterregistreringMeldekort ettereg={this.props.meldekort} />
        <PaabegynteSoknader paabegynteSoknader={this.props.paabegynteSoknader} />
        <MinInnboks mininnboks={this.props.mininnboks} />
        <Unleash api={Api} feature="dittnav.hendelser">
          <Hendelser />
        </Unleash>
      </section>
    );
  }
}

InfoMeldinger.propTypes = {
  paabegynteSoknader: PaabegynteSoknaderType,
  meldekort: MeldekortType,
  isMeldeKortUser: PropTypes.bool,
  mininnboks: MinInnboksType,
};

InfoMeldinger.defaultProps = {
  paabegynteSoknader: null,
  meldekort: null,
  isMeldeKortUser: false,
  mininnboks: [],
};

export default InfoMeldinger;
