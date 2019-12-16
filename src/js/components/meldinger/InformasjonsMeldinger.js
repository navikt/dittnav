import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import PanelMedIkon from '../common/PanelMedIkon';
import { IkonBeskjed } from '../common/LenkepanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';

class InformasjonsMeldinger extends Component {
  render() {
    const children = [];
    if (this.props.visGenerellInfo) {
      children.push(// eslint-disable-line function-paren-newline
        <PanelMedIkon
          overskrift={<PanelOverskrift overskrift={this.props.generellInfo} type="Element" />}
          ikon={<IkonBeskjed />}
        />,
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
    return (<>{children}</>);
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
  visGenerellInfo: true,
  generellInfo: <F id="generell.informasjonsmelding.romjul" />,
  visMeldekortbrukerInfo: false,
  meldekortbrukerInfo: <F id="meldekortbruker.informasjonsmelding" />,
};

export default injectIntl(InformasjonsMeldinger);
