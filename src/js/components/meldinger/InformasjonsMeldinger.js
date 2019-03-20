import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InformasjonsMeldinger extends Component {
  render() {
    if (!this.props.infoMessages) return null;
    const children = [];
    if (this.props.infoMessages['generell.informasjonsmelding']) {
      children.push(// eslint-disable-line function-paren-newline
        <div className="message" key="general">
          <span className="icon default-icon" aria-label="alarm-ikon" />
          <div className="texts">
            <p>{this.props.infoMessages['generell.informasjonsmelding']}</p>
          </div>
        </div>,
      );
    }
    if (this.props.isMeldeKortUser && this.props.infoMessages['meldekortbruker.informasjonsmelding']) {
      children.push(// eslint-disable-line
        <div className="message" key="melderkort">
          <span className="icon meldekort-icon" aria-label="alarm-ikon" />
          <div className="texts">
            <p>{this.props.infoMessages['meldekortbruker.informasjonsmelding']}</p>
          </div>
        </div>,
      );
    }
    return (<React.Fragment>{children}</React.Fragment>);
  }
}

export const InfoMessagesType = PropTypes.shape({
  'generell.informasjonsmelding': PropTypes.string,
  'meldekortbruker.informasjonsmelding': PropTypes.string,
});

InformasjonsMeldinger.propTypes = {
  infoMessages: InfoMessagesType,
  isMeldeKortUser: PropTypes.bool,
};

InformasjonsMeldinger.defaultProps = {
  infoMessages: null,
  isMeldeKortUser: false,
};

export default InformasjonsMeldinger;
