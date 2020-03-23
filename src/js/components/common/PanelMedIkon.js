import React from 'react';
import { shape, node, func, any, bool, string } from 'prop-types';
import { Normaltekst } from 'nav-frontend-typografi';
import Knapp from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import { FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';

const PanelMedIkon = ({ className, overskrift, ingress, children, knapp, lenke, lenkeTekstId, onClick }) => (
  <Panel className={className} border>
    <div className={`${className}__ikon`}>
      {children}
    </div>
    <div className={`${className}__tekst`}>
      {overskrift}
      {(ingress)
        ? (
          <Normaltekst>
            {ingress}
          </Normaltekst>
        )
        : null}
      {(lenke)
        ? (
          <Lenke className="panel-lenke" id="panel-lenke-id" href={lenke}>
            <FormattedMessage id={lenkeTekstId} />
          </Lenke>
        ) : null}
    </div>
    <>
      {knapp
        ? (
          <div className={`${className}__knapp`}>
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
  onClick: func,
  className: string,
  overskrift: shape({ root: any }).isRequired,
  ingress: shape({ root: any }),
  children: node.isRequired,
  knapp: bool,
  lenke: string,
  lenkeTekstId: string,
};

PanelMedIkon.defaultProps = {
  className: 'panel-med-ikon',
  onClick: null,
  ingress: null,
  knapp: null,
  lenke: null,
  lenkeTekstId: null,
};

export default PanelMedIkon;
