import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import Knapp from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';


const PanelMedIkon = ({ className, overskrift, ingress, ikon, knapp, onClick }) => (
  <Panel className={className} border>
    <div className="panel-med-ikon__ikon">
      {ikon}
    </div>
    <div className="panel-med-ikon__tekst">
      {overskrift}
      {(ingress)
        ? (
          <Normaltekst>
            {ingress}
          </Normaltekst>
        )
        : null}
    </div>
    <>
      {knapp
        ? (
          <div className="panel-med-ikon__knapp">
            <Knapp onClick={onClick} form="kompakt">
              <FormattedMessage id="hendelser.beskjed.knapp" />
            </Knapp>
          </div>
        )
        : null}
    </>
  </Panel>
);

PanelMedIkon.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  overskrift: PropTypes.shape({ root: PropTypes.any }).isRequired,
  ingress: PropTypes.shape({ root: PropTypes.any }),
  ikon: PropTypes.node.isRequired,
  knapp: PropTypes.bool,
};

PanelMedIkon.defaultProps = {
  className: 'panel-med-ikon',
  onClick: null,
  ingress: null,
  knapp: null,
};

export default PanelMedIkon;
