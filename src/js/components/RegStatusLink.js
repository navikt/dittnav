import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F } from 'react-intl';
import conf from '../Config';

class RegStatusLink extends Component {
  render() {
    if (!this.props.isRegisteredAtIArbeid) return null;

    return (
      <a className="clickable message" data-ga="Dittnav/Varsel/Registrering" href={conf.dittNav.REG_STATUS_LINK}>
        <span className="icon registration-icon" aria-label="sjekkliste-ikon" />
        <div className="texts">
          <p><F id="regstatus.beskrivelse" /></p>
          <p><F id="regstatus.lenke" /></p>
        </div>
      </a>
    );
  }
}

RegStatusLink.propTypes = {
  isRegisteredAtIArbeid: PropTypes.bool,
};

RegStatusLink.defaultProps = {
  isRegisteredAtIArbeid: null,
};

export default RegStatusLink;
