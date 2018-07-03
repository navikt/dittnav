import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Fixes i IN-365
const translations = {
  'fgkode.IARBS': 'Du er registrert som "ikke arbeidssøker"',
  'fgkode.INGEN_FGKODE': '',
  'fgkode.ISERV': '',
  'fgkode.ARBS': 'Du er registrert som arbeidssøker.',
  'fgkode.PARBS': 'Du er ennå ikke ferdig med å registrere deg som arbeidssøker på nav.no. Jo raskere du registrerer deg, desto raskere kan NAV hjelpe deg.',
  'fgkode.RARBS': 'Du er ennå ikke ferdig med å registrere deg som arbeidssøker på nav.no. Jo raskere du registrerer deg, desto raskere kan NAV hjelpe deg.',
  'ytelse.IYT': '',
  'ytelse.DAGP': 'Du er mottaker av dagpenger.',
  'ytelse.ATTF': '',
  'ytelse.AAP': 'Du er mottaker av arbeidsavklaringspenger.',
  'ytelse.INDS': 'Du er mottaker av tiltakspenger.',
  'ytelse.VENT': '',
};

class PersonInfo extends Component {
  render() {
    if (!this.props.personInfo) return null;
    const {
      name, fgkode, ytelse, isRegistered, isInactive,
    } = this.props.personInfo;
    return (
      <div className="person-info">
        <h1 className="person-info">{name}</h1>
        {isRegistered && !isInactive ? (
          <p className="arbeidssokerstatus">
            <span>{translations[`fgkode.${fgkode}`]}</span>
            <span>{translations[`ytelse.${ytelse}`]}</span>
          </p>
        ) : null}
      </div>
    );
  }
}

PersonInfo.propTypes = {
  personInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    fgkode: PropTypes.oneOf(['IARBS', 'INGEN_FGKODE', 'ISERV', 'ARBS', 'PARBS', 'RARBS']),
    ytelse: PropTypes.oneOf(['IYT', 'DAGP', 'ATTF', 'AAP', 'INDS', 'VENT']),
    isRegistered: PropTypes.bool.isRequired,
    isInactive: PropTypes.bool.isRequired,
  }),
};

PersonInfo.defaultProps = {
  personInfo: null,
};

export default PersonInfo;
