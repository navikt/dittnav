import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import PropTypes from 'prop-types';

const PanelMedIkon = ({ className, overskrift, ingress, ikon, onClick }) => (
  <Panel className={className} onClick={onClick} border>
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
  </Panel>
);

PanelMedIkon.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  overskrift: PropTypes.shape({ root: PropTypes.any }).isRequired,
  ingress: PropTypes.shape({ root: PropTypes.any }),
  ikon: PropTypes.node.isRequired,
};

PanelMedIkon.defaultProps = {
  className: 'panel-med-ikon',
  onClick: null,
  ingress: null,
};

export default PanelMedIkon;
