import React, { Component } from 'react';
import AlertStripe from 'nav-frontend-alertstriper';

import PropTypes from 'prop-types';
import '../../../less/components/Informasjon.less';

// Used in the GUI-test component for sending and showing events.
class InformasjonTestGui extends Component {
  render() {
    return (
      <div className="Informasjon">
        <AlertStripe className="InformasjonStripe" type="info">{this.props.hendelse.tekst}</AlertStripe>
      </div>
    );
  }
}

InformasjonTestGui.propTypes = {
  hendelse: PropTypes.shape({
    tekst: PropTypes.string.isRequired,
  }),
};

InformasjonTestGui.defaultProps = {
  hendelse: {},
};

export default InformasjonTestGui;
