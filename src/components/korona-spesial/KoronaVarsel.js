import React from 'react';
import { Undertittel } from 'nav-frontend-typografi';
import { LenkepanelBase } from 'nav-frontend-lenkepanel/lib';
import { logAmplitudeEvent } from '../../utils/amplitudeUtils';

const cssPrefix = 'korona-varsel';

const KoronaVarsel = ({ tittel, href, visIkon = false, children, className, amplitudeComponentName, amplitudeAction }) => (
  <LenkepanelBase
    className={`${cssPrefix}${className ? ` ${className}` : ''}`}
    href={href}
    onClick={() => logAmplitudeEvent(amplitudeComponentName, amplitudeAction)}
    border
  >
    {visIkon && (
      <div className={`${cssPrefix}__ikon-kol`}>
        <div className={`${cssPrefix}__pulse`} />
        <div className={`${cssPrefix}__sirkel`} />
      </div>
    )}
    <div className={`${cssPrefix}__tekst-kol`}>
      <Undertittel className="lenkepanel__heading">
        {tittel}
      </Undertittel>
      {children && (
        <div className={`${cssPrefix}__ingress`}>
          {children}
        </div>
      )}
    </div>
  </LenkepanelBase>
);

export default KoronaVarsel;
