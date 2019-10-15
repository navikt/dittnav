import React from 'react';
import { FormattedMessage as F } from 'react-intl';
import Config from '../Config';
import { LenkepanelMedIkon, IkonBlyant, IkonKane, IkonPille, IkonSkilt, createOverskrift } from './LenkepanelMedIkon';

const DittnavFliser = () => (
  <>
    <div className="dittnav-lenkeikon-container">
      <LenkepanelMedIkon
        alt="Ditt sykefravær"
        overskrift={createOverskrift(<F id="fliser.ditt.sykevravaer" />, 'Undertittel')}
        ingress={<F id="fliser.ditt.sykevravaer.ingress" />}
        className="first"
        href={Config.LENKER.dittSykefravaer.url}
      >
        <IkonPille />
      </LenkepanelMedIkon>
      <LenkepanelMedIkon
        alt="Mistet jobben?"
        overskrift={createOverskrift(<F id="fliser.mistet.jobben" />, 'Undertittel')}
        ingress={<F id="fliser.mistet.jobben.ingress" />}
        href={Config.LENKER.veilederArbeidssoker.url}
      >
        <IkonSkilt />
      </LenkepanelMedIkon>
    </div>
    <div className="dittnav-lenkeikon-container blokk-xxl">
      <LenkepanelMedIkon
        alt="Skjemaer"
        overskrift={createOverskrift(<F id="fliser.skjemaer" />, 'Undertittel')}
        ingress={<F id="fliser.skjemaer.ingress" />}
        className="first"
        href={Config.LENKER.skjemaer.url}
      >
        <IkonBlyant />
      </LenkepanelMedIkon>
      <LenkepanelMedIkon
        alt="Din pensjon"
        overskrift={createOverskrift(<F id="fliser.din.pensjon" />, 'Undertittel')}
        ingress={<F id="fliser.din.pensjon.ingress" />}
        href={Config.LENKER.dinPensjon.url}
      >
        <IkonKane />
      </LenkepanelMedIkon>
    </div>
  </>
);

export default DittnavFliser;
