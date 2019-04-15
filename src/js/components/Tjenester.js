import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tjenester extends Component {
  render() {
    const { services } = this.props;
    return (
      <section className="ditt-list">
        {services.map(o => (
          <a href={o.url} data-ga="Dittnav/Lenkeboks" className={`lenke tjeneste-boks ditt-list-element ditt-nav-${o.bildenavn.replace(/_/g, '-')}`} key={o.url}>
            <h2 className="underline">
              {o.tittel}
            </h2>
            <p>
              {o.beskrivelse}
            </p>
          </a>
        ))}
      </section>
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