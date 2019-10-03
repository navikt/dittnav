import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';

class InformasjonsMeldinger extends Component {
  render() {
    const children = [];
    if (this.props.visGenerellInfo) {
      children.push(// eslint-disable-line function-paren-newline
        <div className="message" key="general">
          <span className="icon default-icon" aria-label="alarm-ikon" />
          <div className="texts">
            <p>{this.props.generellInfo}</p>
          </div>
        </div>,
      );
    }
    if (this.props.isMeldeKortUser && this.props.visMeldekortbrukerInfo) {
      children.push(// eslint-disable-line
        <div className="message" key="melderkort">
          <span className="icon meldekort-icon" aria-label="alarm-ikon" />
          <div className="texts">
            <p>{this.props.meldekortbrukerInfo}</p>
          </div>
        </div>,
      );
    }
    return (
      <>
        {children}
      </>
    );
  }
}

InformasjonsMeldinger.propTypes = {
  isMeldeKortUser: PropTypes.bool,
  visGenerellInfo: PropTypes.bool,
  generellInfo: PropTypes.node,
  visMeldekortbrukerInfo: PropTypes.bool,
  meldekortbrukerInfo: PropTypes.node,
  intl: intlShape.isRequired, // eslint-disable-line react/no-unused-prop-types
};

InformasjonsMeldinger.defaultProps = {
  isMeldeKortUser: false,
  visGenerellInfo: false,
  generellInfo: <F id="generell.informasjonsmelding" />,
  visMeldekortbrukerInfo: false,
  meldekortbrukerInfo: <F id="meldekortbruker.informasjonsmelding" />,
};

export default injectIntl(InformasjonsMeldinger);
