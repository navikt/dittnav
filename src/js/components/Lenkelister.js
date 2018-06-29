import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Lenkelister extends Component {
  render() {
    return (
      <section className="ditt-list">
        {this.props.links.map(link => (
          <a href={link.url} data-ga="Dittnav/Lenkeliste" className="lenke ditt-list-element" key={link.url}>
            {link.title}
          </a>
          ))}
      </section>
    );
  }
}

Lenkelister.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  })),
};

Lenkelister.defaultProps = {
  links: [],
};

export default Lenkelister;
