import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F } from 'react-intl';
import { Ingress } from 'nav-frontend-typografi';

class PersonInfo extends Component {
  render() {
    if (!this.props.personInfo) return null;
    const {
      navn, fgkode, ytelse, registrert, inaktiv,
    } = this.props.personInfo;
    return (
      <div className="person-info">
        <h1 className="person-info">{navn ? navn.toLowerCase() : ''}</h1>
        {registrert && !inaktiv && fgkode && ytelse ? (
          <div className="arbeidssokerstatus">
            <Ingress>
              <F id={`fgkode.${fgkode}`} />
              <F id={`ytelse.${ytelse}`} />
            </Ingress>
          </div>
        ) : null}
      </div>
    );
  }
}

PersonInfo.propTypes = {
  personInfo: PropTypes.shape({
    navn: PropTypes.string.isRequired,
    fgkode: PropTypes.oneOf(['IARBS', 'INGEN_FGKODE', 'ISERV', 'ARBS', 'PARBS', 'RARBS']),
    ytelse: PropTypes.oneOf(['IYT', 'DAGP', 'ATTF', 'AAP', 'INDS', 'VENT']),
    registrert: PropTypes.bool.isRequired,
    inaktiv: PropTypes.bool.isRequired,
  }),
};

PersonInfo.defaultProps = {
  personInfo: null,
};

export default PersonInfo;
