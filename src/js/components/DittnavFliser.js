import React from 'react';

import Config from '../Config';
import { LenkepanelMedIkon, IkonBlyant, IkonKane, IkonPille, IkonSkilt } from './LenkepanelMedIkon';

const DittnavFliser = () => (
  <>
    <div className="dittnav-lenkeikon-container">
      <LenkepanelMedIkon
        alt="Ditt sykefravær"
        overskrift="fliser.ditt.sykevravaer"
        ingress="fliser.ditt.sykevravaer.ingress"
        className="first"
        href={Config.LENKER.dittSykefravaer.url}
      >
        <IkonPille />
      </LenkepanelMedIkon>
      <LenkepanelMedIkon
        alt="Mistet jobben?"
        overskrift="fliser.mistet.jobben"
        ingress="fliser.mistet.jobben.ingress"
        href={Config.LENKER.veilederArbeidssoker.url}
      >
        <IkonSkilt />
      </LenkepanelMedIkon>
    </div>
    <div className="dittnav-lenkeikon-container blokk-xxl">
      <LenkepanelMedIkon
        alt="Skjemaer"
        overskrift="fliser.skjemaer"
        ingress="fliser.skjemaer.ingress"
        className="first"
        href={Config.LENKER.skjemaer.url}
      >
        <IkonBlyant />
      </LenkepanelMedIkon>
      <LenkepanelMedIkon
        alt="Din pensjon"
        overskrift="fliser.din.pensjon"
        ingress="fliser.din.pensjon.ingress"
        href={Config.LENKER.dinPensjon.url}
      >
        <IkonKane />
      </LenkepanelMedIkon>
    </div>
  </>
);

export default DittnavFliser;
