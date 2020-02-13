import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Normaltekst } from 'nav-frontend-typografi';

class Lenkelister extends Component {
  render() {
    return (
      <div className="flere-tjenester">
        <nav className="flere-tjenester__links">
          {this.props.links.map(l => (
            <div className="flere-tjenester__link-container" key={l.url}>
              <Normaltekst>
                <a href={l.url} data-ga="Dittnav/Lenkeliste" className="lenke flere-tjenester__link">
                  {l.tittel}
                </a>
              </Normaltekst>
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
