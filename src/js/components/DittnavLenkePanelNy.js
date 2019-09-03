import React from 'react';

import Config from '../Config';
import { LenkepanelMedIkon, IkonKane, IkonPille, IkonSkilt } from './LenkepanelMedIkon';
import OversiktspanelMedListe from "./OversiktspanelMedListe";
import DinesakerSakstema from "./DinesakerSakstema";

// TODO:    - finpusse layout etter skisse
//          - finn svg data for ikoner
//          - fjern gamle lenkepanel, rename denne

class DittnavLenkePanelNy extends React.Component{
    render() {
        const saker = this.props.sakstema.saker ? this.props.sakstema.saker.map((tema, index) => (
            <DinesakerSakstema
                key={index}
                dato={tema.sistOppdatert}
                status={tema.status}
                temanavn={tema.temanavn}
                href={tema.lenke}
            />
        )) : [];

        return (
            <div className="dittnav-lenkepanel-top-container">
                <div className="dittnav-lenkepanel-top-row first">
                    <OversiktspanelMedListe
                        alt="Dine saker"
                        overskrift="fliser.dine.saker"
                        ikon={<IkonSkilt/>}
                        headerLenkeTekst={"Se full saksoversikt ("+this.props.sakstema.antallSaker+")"}
                        headerLenkeHref={`${Config.dittNav.SERVICES_URL}/saksoversikt/`}
                        listeElementer={saker}
                        hasBorder={false}
                    />
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
                        className="last"
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