import React, { Component } from 'react';
import { node, bool } from 'prop-types';
import { FormattedMessage as F } from 'react-intl';
import PanelMedIkon from '../common/PanelMedIkon';
import PanelOverskrift from '../common/PanelOverskrift';
import IkonBeskjed from '../../assets/IkonBeskjed';

class InformasjonsMeldinger extends Component {
  render() {
    const children = [];

    if (this.props.visGenerellInfo) {
      const generellInfoOverskrift = <PanelOverskrift overskrift={this.props.generellInfo} type="Normaltekst" />;

      children.push(// eslint-disable-line function-paren-newline
        <PanelMedIkon
          className="beskjed"
          overskrift={generellInfoOverskrift}
          key="generell"
          erInformasjonsmelding
        >
          <IkonBeskjed />
        </PanelMedIkon>,
      );
    }

    if (this.props.isMeldeKortUser && this.props.visMeldekortbrukerInfo) {
      const meldekortOverskrift = <PanelOverskrift overskrift={this.props.meldekortOverskrift} type="Normaltekst" />;

      children.push(// eslint-disable-line function-paren-newline
        <PanelMedIkon
          className="beskjed"
          overskrift={meldekortOverskrift}
          key="melderkort"
          erInformasjonsmelding
        >
          <IkonBeskjed />
        </PanelMedIkon>,
      );
    }
    return (<>{children}</>);
  }
}

InformasjonsMeldinger.propTypes = {
  visGenerellInfo: bool,
  visMeldekortbrukerInfo: bool,
  isMeldeKortUser: bool,
  meldekortOverskrift: node,
  generellInfo: node,
};

InformasjonsMeldinger.defaultProps = {
  visGenerellInfo: false,
  visMeldekortbrukerInfo: false,
  isMeldeKortUser: false,
  meldekortOverskrift: <F id="meldekortbruker.informasjonsmelding" />,
  generellInfo: <F id="generell.informasjonsmelding" />,
};

export default InformasjonsMeldinger;
