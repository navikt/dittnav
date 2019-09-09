import React, { Component } from 'react';
import AlertStripe from 'nav-frontend-alertstriper';

import PropTypes from 'prop-types';
import '../../../less/components/Informasjon.less';

class Informasjon extends Component {
  render() {
    return (
      <div className="Informasjon">
        <AlertStripe className="InformasjonStripe" type="info">{this.props.hendelse.tekst}</AlertStripe>
      </div>
    );
  }
}

Informasjon.propTypes = {
  hendelse: PropTypes.shape({
    tekst: PropTypes.string.isRequired,
  }),
};

Informasjon.defaultProps = {
  hendelse: {},
};

export default Informasjon;
