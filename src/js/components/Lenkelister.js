import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Lenkelister extends Component {
  render() {
    return (
      <section className="ditt-list">
        {this.props.links.map(l => (
          <a href={l.url} data-ga="Dittnav/Lenkeliste" className="lenke ditt-list-element" key={l.url}>
            {l.tittel}
          </a>
        ))}
      </section>
    );
  }
}

Lenkelister.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string.isRequired,
    tittel: PropTypes.string.isRequired,
  })),
};

Lenkelister.defaultProps = {
  links: [],
};

export default Lenkelister;
