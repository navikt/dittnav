import React from 'react';

import Lenkepanel from 'nav-frontend-lenkepanel';
import { FormattedMessage } from 'react-intl';
import Config from '../Config';
import { LenkepanelMedIkon, IkonBlyant, IkonKane, IkonPille, IkonSkilt } from './LenkepanelMedIkon';

class DittnavFliser extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="dittnav-lenke-container">
          <Lenkepanel border className="first" href={`${Config.dittNav.SERVICES_URL}/utbetalingsoversikt/`}>
            <FormattedMessage id="fliser.dine.utbetalinger" />
          </Lenkepanel>
          <Lenkepanel border href={`${Config.dittNav.SERVICES_URL}/saksoversikt/`}>
            <FormattedMessage id="fliser.dine.saker" />
          </Lenkepanel>
          <Lenkepanel border className="last" href={`${Config.dittNav.SERVICES_URL}/mininnboks/`}>
            <FormattedMessage id="fliser.innboks" />
          </Lenkepanel>
        </div>
        <div className="dittnav-lenkeikon-container">
          <LenkepanelMedIkon
            alt="Ditt sykefravær"
            overskrift="fliser.ditt.sykevravaer"
            ingress="fliser.ditt.sykevravaer.ingress"
            className="first"
            href={`${Config.dittNav.SERVICES_URL}/sykefravaer/`}
          >
            <IkonPille />
          </LenkepanelMedIkon>
          <LenkepanelMedIkon
            alt="Mistet jobben"
            overskrift="fliser.mistet.jobben"
            ingress="fliser.mistet.jobben.ingress"
            href={`${Config.dittNav.SERVICES_URL}/veiledearbeidssoker/`}
          >
            <IkonSkilt />
          </LenkepanelMedIkon>
        </div>
        <div className="dittnav-lenkeikon-container">
          <LenkepanelMedIkon
            alt="Skjemaer"
            overskrift="fliser.skjemaer"
            ingress="fliser.skjemaer.ingress"
            className="first"
            href="/no/person/skjemaer-for-privatpersoner"
          >
            <IkonBlyant />
          </LenkepanelMedIkon>
          <LenkepanelMedIkon
            alt="Din pensjon"
            overskrift="fliser.din.pensjon"
            ingress="fliser.din.pensjon.ingress"
            href={`${Config.dittNav.SERVICES_URL}/pselv/publisering/dinpensjon.jsf`}
          >
            <IkonKane />
          </LenkepanelMedIkon>
        </div>
      </React.Fragment>
    );
  }
}

export default DittnavFliser;
