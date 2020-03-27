import React, { Component } from 'react';
import { node, bool } from 'prop-types';
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
      const generellInfoOverskrift = <PanelOverskrift overskrift={this.props.generellInfo} type="Normaltekst" />;

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

    if (this.props.visForskuddsInfo) {
      const forskuddsOverskrift = <PanelOverskrift overskrift={this.props.forskuddsOverskrift} type="Element" />;
      const forskuddsLenke = '';

      children.push(// eslint-disable-line function-paren-newline
        <LenkepanelMedIkon
          className="infomelding forskudds-informasjon"
          href={forskuddsLenke}
          overskrift={forskuddsOverskrift}
          key="forskudd"
        >
          <IkonBeskjed />
        </LenkepanelMedIkon>,
      );
    }

    if (this.props.isMeldeKortUser && this.props.visMeldekortbrukerInfo) {
      const meldekortOverskrift = <PanelOverskrift overskrift={this.props.meldekortOverskrift} type="Normaltekst" />;

      children.push(// eslint-disable-line function-paren-newline
        <PanelMedIkon
          className="beskjed"
          overskrift={meldekortOverskrift}
          key="melderkort"
        >
          <IkonBeskjed />
        </PanelMedIkon>,
      );
    }
    return (<>{children}</>);
  }
}

InformasjonsMeldinger.propTypes = {
  visKoronaInfo: bool,
  visGenerellInfo: bool,
  visForskuddsInfo: bool,
  visMeldekortbrukerInfo: bool,
  koronaOverskrift: node,
  forskuddsOverskrift: node,
  meldekortOverskrift: node,
  isMeldeKortUser: bool,
  generellInfo: node,
  intl: intlShape.isRequired, // eslint-disable-line react/no-unused-prop-types
};

InformasjonsMeldinger.defaultProps = {
  visKoronaInfo: true,
  visGenerellInfo: false,
  visForskuddsInfo: false,
  visMeldekortbrukerInfo: false,
  isMeldeKortUser: false,
  koronaOverskrift: <F id="generell.koronamelding.overskrift" />,
  forskuddsOverskrift: <F id="generell.forskudds.overskrift" />,
  meldekortOverskrift: <F id="meldekortbruker.informasjonsmelding" />,
  generellInfo: <F id="generell.informasjonsmelding" />,
};

export default injectIntl(InformasjonsMeldinger);
