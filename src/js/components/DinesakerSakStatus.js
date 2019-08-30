import React from 'react';

import { Normaltekst, Element, Undertekst } from 'nav-frontend-typografi'

import PropTypes from 'prop-types'

import { FormattedMessage, FormattedDate } from "react-intl";

import Lenke from "nav-frontend-lenker";
import EtikettBase from "nav-frontend-etiketter";
import HoyreChevron from "nav-frontend-chevron";

// TODO:    -lokaliser tekst

const statusTilEtikettType = {
    "FERDIG_BEHANDLET": "suksess",
    "UNDER_BEHANDLING": "fokus",
    "UKJENT": "info",
};

const statusTilEtikettTekst = {
    "FERDIG_BEHANDLET": "Ferdig behandlet",
    "UNDER_BEHANDLING": "Under behandling",
    "UKJENT": "Ukjent status",
}

class DinesakerSakStatus extends React.Component {

    render() {
        const { dato, status, temanavn, href } = this.props;

        return(
            <div className="saks-container">
                <div className="sak-row-left">
                    <EtikettBase type={statusTilEtikettType[status]} className="saks-etikett">
                        <Undertekst>{statusTilEtikettTekst[status]}</Undertekst>
                    </EtikettBase>
                    <Undertekst>{dato}</Undertekst>
                </div>
                <div className="sak-row-right">
                    <Element>
                        <Lenke href={href}>{temanavn}</Lenke>
                    </Element>
                </div>
                <HoyreChevron className="sak-chevron"/>
            </div>
        );
    }
}

DinesakerSakStatus.propTypes = {
    dato: PropTypes.string,            //.instanceOf(Date),
    status: PropTypes.string,
    temanavn: PropTypes.string,
    href: PropTypes.string,
}

export default DinesakerSakStatus;