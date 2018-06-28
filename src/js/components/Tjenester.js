import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tjenester extends Component {
  render() {
    return (
      <section className="ditt-list">
        {this.props.services.map(o => (
          <a href={o.url} data-ga="Dittnav/Lenkeboks" className={`lenke tjeneste-boks ditt-list-element ${o.imageName}`} key={o.url}>
            <h2>
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
  services: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Tjenester;
