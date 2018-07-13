import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PaabegynteSoknader, { PaabegynteSakType } from './meldinger/PaabegynteSoknader';
import RegStatusLink from './RegStatusLink';
import Meldekort from './Meldekort';

class InfoMeldinger extends Component {
  render() {
    return (
      <React.Fragment>
        <section className="infomeldinger-list">
          <h1 className="vekk">Varsler</h1>
          <Meldekort />
          <RegStatusLink isRegisteredAtIArbeid={this.props.isRegisteredAtIArbeid} />
          <PaabegynteSoknader paabegynteSaker={this.props.paabegynteSaker} />

          <div className="message">
            <span className="message-icon forbrukte-pleiepengedager-varsel-ikon" aria-label="alarm-ikon" />
            <div className="texts">
              <p>Forbrukte pleiepengedager per i dag for barn med f.nr. 11111111111: <b>999</b></p>
              <p>Forbrukte pleiepengedager per i dag for barn med f.nr. 22222222222: <b>999</b></p>
              <p>Forbrukte pleiepengedager per i dag for barn med f.nr. 33333333333: <b>999</b></p>
              <p>Forbrukte pleiepengedager per i dag for barn med f.nr. 33333333333: <b>999</b></p>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}

InfoMeldinger.propTypes = {
  paabegynteSaker: PropTypes.arrayOf(PaabegynteSakType),
  isRegisteredAtIArbeid: PropTypes.bool,
};

InfoMeldinger.defaultProps = {
  paabegynteSaker: [],
  isRegisteredAtIArbeid: null,
};

export default InfoMeldinger;
