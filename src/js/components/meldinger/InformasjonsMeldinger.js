import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as F, injectIntl, intlShape } from 'react-intl';
import PanelMedIkon from '../common/PanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonBeskjed from '../../../assets/IkonBeskjed';
import LenkepanelMedIkon from '../common/LenkepanelMedIkon';

class InformasjonsMeldinger extends Component {
  render() {
    const children = [];

    if (this.props.visKoronaInfo) {
      const koronaOverskrift = <PanelOverskrift overskrift={this.props.koronaOverskrift} type="Element" />;
      const koronaLenke = 'https://www.nav.no/person/koronaveiviser';

      children.push(// eslint-disable-line function-paren-newline
        <LenkepanelMedIkon
          className="infomelding korona-informasjon"
          href={koronaLenke}
          overskrift={koronaOverskrift}
          key="korona"
        >
          <IkonBeskjed />
        </LenkepanelMedIkon>,
      );
    }
    if (this.props.visGenerellInfo) {
      const generellInfoOverskrift = <PanelOverskrift overskrift={this.props.generellInfo} type="Normaltekst" />

      children.push(// eslint-disable-line function-paren-newline
        <PanelMedIkon
          className="beskjed"
          overskrift={generellInfoOverskrift}
          key="generell"
        >
          <IkonBeskjed />
        </PanelMedIkon>,
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
  visKoronaInfo: PropTypes.bool,
  koronaOverskrift: PropTypes.node,
  isMeldeKortUser: PropTypes.bool,
  visGenerellInfo: PropTypes.bool,
  generellInfo: PropTypes.node,
  visMeldekortbrukerInfo: PropTypes.bool,
  meldekortbrukerInfo: PropTypes.node,
  intl: intlShape.isRequired, // eslint-disable-line react/no-unused-prop-types
};

InformasjonsMeldinger.defaultProps = {
  visKoronaInfo: true,
  isMeldeKortUser: false,
  visGenerellInfo: false,
  koronaOverskrift: <F id="generell.koronamelding.overskrift" />,
  generellInfo: <F id="generell.informasjonsmelding" />,
  visMeldekortbrukerInfo: false,
  meldekortbrukerInfo: <F id="meldekortbruker.informasjonsmelding" />,
};

export default injectIntl(InformasjonsMeldinger);
