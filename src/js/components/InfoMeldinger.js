import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PaabegynteSoknader, { PaabegynteSakType } from 'js/components/meldinger/PaabegynteSoknader';
import RegStatusLink from 'js/components/RegStatusLink';
import Meldekort, { MeldekortType } from 'js/components/Meldekort';
import PleiepengerList, { Pleiepenger } from 'js/components/meldinger/PleiepengerList';
import NavMeldinger from './meldinger/NavMeldinger';

class InfoMeldinger extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="infomeldinger-list">
          <h1 className="vekk">Varsler</h1>
          <Meldekort meldekort={this.props.meldekort} />
          <RegStatusLink isRegisteredAtIArbeid={this.props.isRegisteredAtIArbeid} />
          <NavMeldinger navMessagesCount={this.props.navMessagesCount} />
          <PaabegynteSoknader paabegynteSaker={this.props.paabegynteSaker} />
          <PleiepengerList pleiepenger={this.props.pleiepenger} />
        </section>
      </React.Fragment>
    );
  }
}

InfoMeldinger.propTypes = {
  paabegynteSaker: PropTypes.arrayOf(PaabegynteSakType),
  pleiepenger: PropTypes.arrayOf(Pleiepenger),
  isRegisteredAtIArbeid: PropTypes.bool,
  meldekort: MeldekortType,
  navMessagesCount: PropTypes.number,
};

InfoMeldinger.defaultProps = {
  paabegynteSaker: [],
  isRegisteredAtIArbeid: null,
  meldekort: null,
  pleiepenger: null,
  navMessagesCount: 0,
};

export default InfoMeldinger;
