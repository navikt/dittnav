import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { VTA } from '../../spa';

class Tjenester extends Component {
  render() {
    return (
      <VTA />
    );
  }
}

Tjenester.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape({
    tittel: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    beskrivelse: PropTypes.string,
    bildenavn: PropTypes.string,
  })),
};

Tjenester.defaultProps = {
  services: [],
};

export default Tjenester;
