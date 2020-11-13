import React from 'react';
import { FormattedMessage as F } from 'react-intl';
import LenkepanelMedIkon from './common/LenkepanelMedIkon';
import PanelOverskrift from './common/PanelOverskrift';
import IkonBlyant from '../assets/IkonBlyant';
import IkonSparegris from '../assets/IkonKane';
import IkonPlaster from '../assets/IkonPlaster';
import IkonSkilt from '../assets/IkonSkilt';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory } from '../utils/googleAnalytics';
import { lenker } from '../utils/lenker';

const DittnavFliser = () => (
  <>
    <div className="dittnav-lenkeikon-container">
      <LenkepanelMedIkon
        alt="Ditt sykefravær"
        overskrift={<PanelOverskrift overskrift={<F id="fliser.ditt.sykevravaer" />} type="Undertittel" />}
        ingress={<F id="fliser.ditt.sykevravaer.ingress" />}
        className="first"
        href={lenker.dittSykefravaer.url}
        gaCategory={GoogleAnalyticsCategory.Forside}
        gaAction={GoogleAnalyticsAction.DittSykefravaer}
      >
        <IkonPlaster />
      </LenkepanelMedIkon>
      <LenkepanelMedIkon
        alt="Mistet jobben?"
        overskrift={<PanelOverskrift overskrift={<F id="fliser.mistet.jobben" />} type="Undertittel" />}
        ingress={<F id="fliser.mistet.jobben.ingress" />}
        href={lenker.veilederArbeidssoker.url}
        gaCategory={GoogleAnalyticsCategory.Forside}
        gaAction={GoogleAnalyticsAction.MistetJobben}
      >
        <IkonSkilt />
      </LenkepanelMedIkon>
    </div>
    <div className="dittnav-lenkeikon-container blokk-xxl">
      <LenkepanelMedIkon
        alt="Skjemaer"
        overskrift={<PanelOverskrift overskrift={<F id="fliser.skjemaer" />} type="Undertittel" />}
        ingress={<F id="fliser.skjemaer.ingress" />}
        className="first"
        href={lenker.skjemaer.url}
        gaCategory={GoogleAnalyticsCategory.Forside}
        gaAction={GoogleAnalyticsAction.Skjemaer}
      >
        <IkonBlyant />
      </LenkepanelMedIkon>
      <LenkepanelMedIkon
        alt="Din pensjon"
        overskrift={<PanelOverskrift overskrift={<F id="fliser.din.pensjon" />} type="Undertittel" />}
        ingress={<F id="fliser.din.pensjon.ingress" />}
        href={lenker.dinPensjon.url}
        gaCategory={GoogleAnalyticsCategory.Forside}
        gaAction={GoogleAnalyticsAction.DinPensjon}
      >
        <IkonSparegris />
      </LenkepanelMedIkon>
    </div>
  </>
);

export default DittnavFliser;
