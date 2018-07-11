import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RegStatusLink extends Component {
  render() {
    return (
      <section className="ditt-list">
      </section>
    );
  }
}

RegStatusLink.propTypes = {
  regStatusLink: PropTypes.string.isRequired,
  erUnderRegistreringIArbeid: PropTypes.bool.isRequired,
};

export default RegStatusLink;
