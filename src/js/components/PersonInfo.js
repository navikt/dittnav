import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F } from 'react-intl';

class PersonInfo extends Component {
  render() {
    if (!this.props.personInfo) return null;
    const {
      name, fgkode, ytelse, erRegistrert, erInaktiv,
    } = this.props.personInfo;
    return (
      <div className="person-info">
        <h1 className="person-info">{name}</h1>
        {erRegistrert && !erInaktiv && fgkode && ytelse ? (
          <p className="arbeidssokerstatus">
            <F id={`fgkode.${fgkode}`} />
            <F id={`ytelse.${ytelse}`} />
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
    erRegistrert: PropTypes.bool.isRequired,
    erInaktiv: PropTypes.bool.isRequired,
  }),
};

PersonInfo.defaultProps = {
  personInfo: null,
};

export default PersonInfo;
