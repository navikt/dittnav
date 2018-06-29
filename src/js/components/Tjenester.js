import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tjenester extends Component {
  render() {
    return (
      <section className="ditt-list">
        {this.props.services.map(o => (
          <a href={o.url} data-ga="Dittnav/Lenkeboks" className={`lenke tjeneste-boks ditt-list-element ditt-nav-${o.className.replace(/_/g, '-')}`} key={o.url}>
            <h2 className="underline">
              {o.title}
            </h2>
            <p>
              {o.description}
            </p>
          </a>
          ))}
      </section>
    );
  }
}

Tjenester.propTypes = {
  services: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
    className: PropTypes.string,
  })),
};

Tjenester.defaultProps = {
  services: [],
};

export default Tjenester;
