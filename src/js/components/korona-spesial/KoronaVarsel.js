import React from "react";
import { Undertittel } from "nav-frontend-typografi";
import { LenkepanelBase } from "nav-frontend-lenkepanel/lib";

const cssPrefix = "korona-varsel";

export const KoronaVarsel = ({ tittel, href, visIkon = false, children, className }) => (
  <LenkepanelBase className={`${cssPrefix}${className ? ` ${className}` : ''}`} href={href} border={true}>
    {visIkon && (
      <div className={`${cssPrefix}__ikon-kol`}>
        <div className={`${cssPrefix}__pulse`} />
        <div className={`${cssPrefix}__sirkel`} />
      </div>
    )}
    <div className={`${cssPrefix}__tekst-kol`}>
      <Undertittel className={`lenkepanel__heading`}>
        {tittel}
      </Undertittel>
      {children}
    </div>
  </LenkepanelBase>
);
