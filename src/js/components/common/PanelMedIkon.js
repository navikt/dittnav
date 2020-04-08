import React from 'react';
import { shape, node, func, any, bool, string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Normaltekst } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import Lukknapp from 'nav-frontend-lukknapp';
import Lenke from 'nav-frontend-lenker';

const PanelMedIkon = ({ className, overskrift, ingress, children, knapp, lenke, lenkeTekst, onClick, skjermleserTekst, intl }) => (
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
            <Lukknapp bla onClick={onClick}>
              {skjermleserTekst
                ? intl.formatMessage({ id: skjermleserTekst })
                : intl.formatMessage({ id: 'panel.knapp.skjermleser.lukk' })}
            </Lukknapp>
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
  skjermleserTekst: string,
  intl: intlShape.isRequired,
};

PanelMedIkon.defaultProps = {
  className: 'panel-med-ikon',
  onClick: null,
  ingress: null,
  knapp: null,
  lenke: null,
  lenkeTekst: null,
  skjermleserTekst: null,
};

export default injectIntl(PanelMedIkon);
