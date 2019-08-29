import React from 'react';

import Config from '../Config';
import { LenkepanelMedIkon, IkonKane, IkonPille, IkonSkilt } from './LenkepanelMedIkon';
import DineSakerOversiktPanel from './DinesakerOversiktPanel';

// TODO:    - finpusse layout etter skisse
//          - finn svg data for ikoner
//          - fjern gamle lenkepanel, rename denne

class DittnavLenkePanelNy extends React.Component{
    render() {
        return (
            <div className="dittnav-lenkepanel-top-container">
                <div className="dittnav-lenkepanel-top-row first">
                    <DineSakerOversiktPanel
                        alt="Dine saker"
                        overskrift="fliser.dine.saker"
                        sakstema={this.props.sakstema}
                        href={`${Config.dittNav.SERVICES_URL}/saksoversikt/`}
                    >
                        <IkonSkilt/>
                    </DineSakerOversiktPanel>
                </div>
                <div className="dittnav-lenkepanel-top-row">
                    <LenkepanelMedIkon
                        alt="Utbetalinger"
                        overskrift="fliser.dine.utbetalinger"
                        ingress=""
                        href={`${Config.dittNav.SERVICES_URL}/utbetalingsoversikt/`}
                    >
                        <IkonPille/>
                    </LenkepanelMedIkon>
                    <LenkepanelMedIkon
                        alt="Innboks"
                        overskrift="fliser.innboks"
                        ingress=""
                        href={`${Config.dittNav.SERVICES_URL}/mininnboks/`}
                    >
                        <IkonKane/>
                    </LenkepanelMedIkon>
                </div>
            </div>
        );
    }
}

const IkonListe = () => (
    true
);

const IkonLommebok = () => (
    true
);

const IkonInnboks = () => (
    true
);



export default DittnavLenkePanelNy;