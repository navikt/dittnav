import React, { Component } from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import PropTypes from 'prop-types';

class Informasjon extends Component {
  render() {
    return (
      <div className="Informasjon">
        <AlertStripeInfo key={this.props.hendelse.id}>{this.props.hendelse.tekst}</AlertStripeInfo>
      </div>
    );
  }
}

Informasjon.propTypes = {
  hendelse: PropTypes.shape({
    id: PropTypes.string.isRequired,
    tekst: PropTypes.string.isRequired,
  }),
};

Informasjon.defaultProps = {
  hendelse: {},
};

export default Informasjon;
