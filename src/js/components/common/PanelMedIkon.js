import React from 'react';
import { shape, node, func, any, bool, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import Knapp from 'nav-frontend-knapper';
import Lenke from 'nav-frontend-lenker';

const PanelMedIkon = ({ className, overskrift, ingress, children, knapp, lenke, lenkeTekst, onClick }) => (
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
            <FormattedMessage id={lenkeTekst} />
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
  lenkeTekst: string,
};

PanelMedIkon.defaultProps = {
  className: 'panel-med-ikon',
  onClick: null,
  ingress: null,
  knapp: null,
  lenke: null,
  lenkeTekst: null,
};

export default PanelMedIkon;
