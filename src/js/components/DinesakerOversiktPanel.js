import React from 'react';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi'

import Lenke from "nav-frontend-lenker";
import HoyreChevron from "nav-frontend-chevron";
import PanelBase from "nav-frontend-paneler";

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import DinesakerSakStatus from "./DinesakerSakStatus";
import {IkonSkilt} from "./LenkepanelMedIkon";

// TODO:    -kikk på designsystem docs, finn passende komponenter for å bygge dette panelet
//          -sett inn riktig ikon-grafikk
//          -mulig refaktorering: fjerne overflødige klasser?
//          -bør denne komponenten håndtere eget innhold eller få via parametre/props? (href + overskrift)
//          -lokaliser tekst
//          -lag en gjenbrukbar generisk komponent? kan brukes til f.eks. innboks og utbetalinger

class DinesakerOversiktPanel extends React.Component {
    render() {
        const { href, onClick, overskrift, sakstema, children } = this.props;

        const saker = sakstema.saker ? sakstema.saker.map((tema, index) => (
            <DinesakerSakStatus
                dato={tema.sistOppdatert}
                status={tema.status}
                temanavn={tema.temanavn}
                href={tema.lenke}
            />
        )) : "";

        const footer = sakstema.antallSaker > 2 ? "Du har flere saker" : "Du har ikke flere saker";

        return(
            <PanelBase border className="dinesaker-panel">
                <div className="dinesaker-header">
                    <div className="ikon-og-overskrift">
                        {/*{children}*/}
                        <IkonSkilt className="dinesaker-ikon"/>
                        <Undertittel>
                            <FormattedMessage id={overskrift} />
                        </Undertittel>
                    </div>
                    <Normaltekst>
                        <Lenke href={href}>
                            {/*Lokaliser denne teksten*/}
                            Se full saksoversikt ({sakstema.antallSaker})
                        </Lenke>
                        <a href={href}><HoyreChevron/></a>
                    </Normaltekst>
                </div>
                <div><hr /></div>
                <div className="dinesaker-saker">
                    {saker}
                </div>

                {/*Fjerne denne?*/}
                {/*<div><hr /></div>*/}
                {/*<div className="dinesaker-footer">*/}
                {/*    <Normaltekst>*/}
                {/*        {footer}*/}
                {/*    </Normaltekst>*/}
                {/*</div>*/}
            </PanelBase>
        );
    }
}

DinesakerOversiktPanel.propTypes = {
    href: PropTypes.string,
    onClick: PropTypes.func,
    className: PropTypes.string,
    overskrift: PropTypes.string.isRequired,
    sakstema: PropTypes.shape({
        antallSaker: PropTypes.number.isRequired,
        saker: PropTypes.arrayOf(Object),
    }),
};

DinesakerOversiktPanel.defaultProps = {
    onClick: null,
    className: '',
    ingress: '',
};

export default DinesakerOversiktPanel;