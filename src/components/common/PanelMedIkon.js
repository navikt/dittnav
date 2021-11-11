import React, { useState } from 'react';
import { shape, node, func, oneOfType, any, bool, string } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { Normaltekst, Undertekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import Lukknapp from 'nav-frontend-lukknapp';
import Lenke from 'nav-frontend-lenker';
import NavFrontendChevron from 'nav-frontend-chevron';
import {
  checkOverflow,
  checkForFormattedMessage,
  finnTekstBase,
  avkortTekst,
  ellipse,
  linebreak,
} from '../../utils/tekst';

const limit = 90;

const PanelMedIkon = (props) => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const isOverflowing = checkOverflow(props.overskrift, limit);
  const isFormattedMessage = checkForFormattedMessage(props.overskrift);
  const visPanelLenke = (props.lenke && isOpen) || (props.lenke && !isOverflowing) || isFormattedMessage;
  const tekst = finnTekstBase(props.overskrift, limit) + ellipse(!isOpen && isOverflowing);
  const avkortetTekst = avkortTekst(props.overskrift, limit);

  const utvidTekst = (event) => {
    event.preventDefault();
    setIsOpen(!isOpen);
  };

  const utvidTekstLenke = (
    <span>
      {linebreak(isOpen)}
      <Lenke className={`utvid-tekst-lenke__${isOpen ? 'skjul' : 'aapne'}`} href="#" onClick={(event) => utvidTekst(event)}>
        {(isOverflowing && !isOpen) ? 'Åpne' : 'Skjul'}
        <NavFrontendChevron type={isOpen ? 'opp' : 'ned'} />
      </Lenke>
    </span>
  );

  const panelLenke = (
    <>
      {props.lenke ? (
        <Lenke
          className="panel-lenke"
          id="panel-lenke-id"
          href={props.lenke}
        >
          <FormattedMessage id={props.lenkeTekst} />
        </Lenke>
      ) : ''}
    </>
  );

  const utvidbarTekst = (
    <>
      {tekst + (isOpen ? avkortetTekst : '')}
      {visPanelLenke ? panelLenke : ''}
      {isOverflowing ? utvidTekstLenke : ''}
    </>
  );

  return (
    <Panel className={props.className} border>
      <div className={`${props.className}__ikon`}>
        {props.children}
      </div>
      <div className={`${props.className}__tekst`}>
        {props.erInformasjonsmelding ? props.overskrift : (
          <Normaltekst>
            <span>
              {isFormattedMessage ? (
                <>
                  {props.overskrift}
                  {panelLenke}
                </>
              ) : utvidbarTekst}
            </span>
          </Normaltekst>
        )}
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
                  ? intl.formatMessage({ id: props.skjermleserTekst })
                  : intl.formatMessage({ id: 'panel.knapp.skjermleser.lukk' })}
              </Lukknapp>
            </div>
          )
          : null}
      </>
    </Panel>
  );
};

PanelMedIkon.propTypes = {
  onClick: func,
  className: string,
  overskrift: oneOfType([
    string,
    shape({ root: any }),
  ]).isRequired,
  ingress: shape({ root: any }),
  etikett: string,
  children: node.isRequired,
  knapp: bool,
  lenke: string,
  lenkeTekst: string,
  skjermleserTekst: string,
  erInformasjonsmelding: bool,
};

PanelMedIkon.defaultProps = {
  className: 'panel-med-ikon',
  onClick: null,
  ingress: null,
  etikett: null,
  knapp: null,
  lenke: null,
  lenkeTekst: null,
  skjermleserTekst: null,
  erInformasjonsmelding: false,
};

export default PanelMedIkon;
