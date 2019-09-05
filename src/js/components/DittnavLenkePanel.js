import React from 'react';

import Config from '../Config';
import { LenkepanelMedIkon, IkonKane, IkonPille, IkonSkilt } from './LenkepanelMedIkon';
import OversiktspanelMedListe from "./OversiktspanelMedListe";
import DinesakerSakstema from "./DinesakerSakstema";
import {FormattedMessage} from "react-intl";
import {Undertekst} from "nav-frontend-typografi";

// TODO:    - finpusse layout
//          - finn svg data for ikoner
//          - gjør layout-tilpasning litt mer elegant?
//          - lokaliser tekst

const saksoversiktUrl = `${Config.dittNav.SERVICES_URL}/saksoversikt/`;
const utbetalingsoversiktUrl = `${Config.dittNav.SERVICES_URL}/utbetalingsoversikt/`;
const innboksUrl = `${Config.dittNav.SERVICES_URL}/mininnboks/`;

class DittnavLenkePanel extends React.Component{
    render() {
        const { antallSaker, saker } = this.props.sakstema;

        const sakerValid = saker ? saker : [];
        const visStorSaksoversikt = sakerValid && antallSaker > 0;
        const numRemainingSaker = antallSaker - sakerValid.length;
        const footer = (
            <div key="footer">
                <hr/>
                <Undertekst>
                    {makeFooterTekst(numRemainingSaker)}
                </Undertekst>
            </div>
        );

        return (
            <div className="dittnav-lenkepanel-top-container">
                { visStorSaksoversikt ?
                        <div className="dittnav-lenkepanel-top-row stor">
                            <OversiktspanelMedListe
                                className="dittnav-lenkepanel-top-item"
                                alt="Dine saker"
                                overskrift={<FormattedMessage id="fliser.dine.saker" />}
                                ikon={<IkonSkilt/>}
                                headerLenkeTekst={"Se alle dine saker ("+antallSaker+")"}
                                headerLenkeHref={saksoversiktUrl}
                                liste={
                                    sakerValid.map((tema, index) => (
                                        <DinesakerSakstema
                                            key={index}
                                            dato={tema.sistOppdatert}
                                            status={tema.status}
                                            temanavn={tema.temanavn}
                                            href={tema.lenke}
                                        />
                                    )).concat([footer])
                                }
                                border={true}
                            />
                        </div>
                    : null }
                <div className={ visStorSaksoversikt ? "dittnav-lenkepanel-top-row" : "dittnav-lenkepanel-top-col" }>
                    { !visStorSaksoversikt ?
                            <LenkepanelMedIkon
                                alt="Dine saker"
                                overskrift="fliser.dine.saker"
                                ingress=""
                                className="dittnav-lenkepanel-top-item"
                                href={saksoversiktUrl}
                            >
                                <IkonSkilt/>
                            </LenkepanelMedIkon>
                            : null }
                    <LenkepanelMedIkon
                        alt="Utbetalinger"
                        overskrift="fliser.dine.utbetalinger"
                        ingress=""
                        className={"dittnav-lenkepanel-top-item"+(visStorSaksoversikt ? " last" : "")}
                        href={utbetalingsoversiktUrl}
                    >
                        <IkonPille/>
                    </LenkepanelMedIkon>
                    <LenkepanelMedIkon
                        alt="Innboks"
                        overskrift="fliser.innboks"
                        ingress=""
                        className="dittnav-lenkepanel-top-item last"
                        href={innboksUrl}
                    >
                        <IkonKane/>
                    </LenkepanelMedIkon>
                </div>
            </div>
        );
    }
}

function makeFooterTekst(numRemainingSaker) {
    if (numRemainingSaker <= 0) {
        return "Du har ingen flere aktive saker";
    } else  {
        return <a href={saksoversiktUrl+"#saksoversikt"}>{"Du har "+numRemainingSaker+" flere aktive saker"}</a>;
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
export default DittnavLenkePanel;