import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import IkonInformasjon from '../../../assets/IkonInformasjon';
import IkonAdvarsel from '../../../assets/IkonAdvarsel';
import IkonStatus from '../../../assets/IkonStatus';

const Sekvens = ({ element }) => (
  <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '1.35em' }} className="sekvens">
    <div style={{ paddingRight: '0.65em' }} className="sekvens__ikon">
      {element.type === 'Beskjed' && <IkonInformasjon />}
      {element.type === 'Oppgave' && <IkonAdvarsel />}
      {element.type === 'Statusoppdatering' && <IkonStatus />}
    </div>
    <div className="sekvens__tekst">
      <Normaltekst>
        {element.type === 'Statusoppdatering' && element.statusGlobal}
        {element.tekst && element.tekst}
      </Normaltekst>
    </div>
  </div>
);

export default Sekvens;
