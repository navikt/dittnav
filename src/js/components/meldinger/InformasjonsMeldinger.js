import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';

class InformasjonsMeldinger extends Component {
  render() {
    const children = [];
    if (true /* skal være true om man vil vise informasjonsmelding*/){
      children.push(// eslint-disable-line function-paren-newline
        <div className="message" key="general">
          <span className="icon default-icon" aria-label="alarm-ikon" />
          <div className="texts">
            <p>{<F id="generell.informasjonsmelding"/>}</p>
          </div>
        </div>,
      );
    }
    if (this.props.isMeldeKortUser && true /* skal være true om man vil vise informasjonsmelding for meldekortbrukere*/) {
      children.push(// eslint-disable-line
        <div className="message" key="melderkort">
          <span className="icon meldekort-icon" aria-label="alarm-ikon" />
          <div className="texts">
            <p>{<F id="meldekortbruker.informasjonsmelding"/>}</p>
          </div>
        </div>,
      );
    }
    return (<React.Fragment>{children}</React.Fragment>);
  }
}

InformasjonsMeldinger.propTypes = {
  isMeldeKortUser: PropTypes.bool,
  intl: intlShape.isRequired, // eslint-disable-line react/no-typos
};

InformasjonsMeldinger.defaultProps = {
  isMeldeKortUser: false,
};

export default injectIntl(InformasjonsMeldinger);
