import React, { Component } from 'react';
import PropTypes from 'prop-types';
import conf from 'js/Config';

const translations = {
  'regstatus.beskrivelse': 'Du har startet på en registrering som arbeidssøker.',
  'regstatus.lenke': 'Fullfør registrering',
}; // TODO will be fixed in IN-365

class RegStatusLink extends Component {
  render() {
    if (!this.props.isRegisteredAtIArbeid) return null;

    return (
      <a className="clickable message" data-ga="Dittnav/Varsel/Registrering" href={conf.dittNav.REG_STATUS_LINK}>
        <span className="icon registration-icon" aria-label="sjekkliste-ikon" />
        <div className="texts">
          <p>{translations['regstatus.beskrivelse']}</p>
          <p>{translations['regstatus.lenke']}</p>
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
