import React from 'react';
import { shape, node, func, oneOfType, any, bool, string } from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import { Panel } from 'nav-frontend-paneler';
import Lukknapp from 'nav-frontend-lukknapp';
import Lenke from 'nav-frontend-lenker';
import { trackEvent, removeFragment } from '../../utils/GoogleAnalytics';

const PanelMedIkon = (props) => (
  <Panel className={props.className} border>
    <div className={`${props.className}__ikon`}>
      {props.children}
    </div>
    <div className={`${props.className}__tekst`}>
      <Normaltekst>
        <span>
          {props.overskrift} {(props.lenke)
            ? (
              <Lenke
                className="panel-lenke"
                id="panel-lenke-id"
                href={props.lenke}
                onClick={() => trackEvent(props.gaCategory, props.gaAction, removeFragment(props.lenke))}
              >
                <FormattedMessage id={props.lenkeTekst} />
              </Lenke>
            )
            : ''}
        </span>
      </Normaltekst>
      {(props.ingress)
        ? (
          <Normaltekst>
            {props.ingress}
          </Normaltekst>
        )
        : null}
      {props.etikett
        ? (
          <Undertekst className={`${props.className}__etikett`}>
            {props.etikett}
          </Undertekst>
        ) : ''}
    </div>
    <>
      {props.knapp
        ? (
          <div className={`${props.className}__knapp`}>
            <Lukknapp bla onClick={props.onClick}>
              {props.skjermleserTekst
                ? props.intl.formatMessage({ id: props.skjermleserTekst })
                : props.intl.formatMessage({ id: 'panel.knapp.skjermleser.lukk' })}
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
  overskrift: oneOfType([
    string,
    shape({ root: any }),
  ]).isRequired,
  ingress: shape({ root: any }),
  etikett: string,
  gaCategory: string,
  gaAction: string,
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
  etikett: null,
  gaCategory: null,
  gaAction: null,
  knapp: null,
  lenke: null,
  lenkeTekst: null,
  skjermleserTekst: null,
};

export default injectIntl(PanelMedIkon);
