import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Lenkelister extends Component {
  render() {
    return (
      <div className="relatert-informasjon">
        <nav className="relatert-informasjon__links">
          {this.props.links.map(l => (
            <div className="relatert-informasjon__link-container" key={l.url}>
              <a href={l.url} data-ga="Dittnav/Lenkeliste" className="lenke relatert-informasjon__link">
                {l.tittel}
              </a>
            </div>
          ))}
        </nav>
      </div>
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
