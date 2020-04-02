import React from "react";
import { Normaltekst, Undertittel } from "nav-frontend-typografi";
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";
import { FormattedMessage } from "react-intl";

const cssPrefix = "korona-varsel";

export const KoronaVarsel = ({ tittel, href, ingressId, visIkon = false, className }) => (
  <LenkepanelBase className={`${cssPrefix}${className ? ` ${className}` : ''}`} href={href} border={true}>
    {visIkon && <div className={`${cssPrefix}__ikon-kol`}>
      <div className={`${cssPrefix}__pulse`} />
      <div className={`${cssPrefix}__sirkel`} />
    </div>}
    <div className={`${cssPrefix}__tekst-kol`}>
      <Undertittel className={`lenkepanel__heading`}>
        {tittel}
      </Undertittel>
      {ingressId && (
        <Normaltekst className={`${cssPrefix}__ingress`}>
          <FormattedMessage id={ingressId} />
        </Normaltekst>
      )}
    </div>
  </LenkepanelBase>
);