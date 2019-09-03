import React from 'react';

import LenkepanelBase from "nav-frontend-lenkepanel";
import { Element, Undertekst } from 'nav-frontend-typografi'
import Lenke from "nav-frontend-lenker";
import EtikettBase from "nav-frontend-etiketter";
import HoyreChevron from "nav-frontend-chevron";

import PropTypes from 'prop-types'

import { FormattedMessage, FormattedDate } from "react-intl";

// TODO:    -lokaliser tekst
//          -fiks lenke? Hvordan overstyre lenke css

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

class DinesakerSakstema extends React.Component {
    render() {
        const { dato, status, temanavn, href } = this.props;

        return(
            <div className="sak-container">
                <div className="sak-row-left">
                    <EtikettBase type={statusTilEtikettType[status]} className="sak-etikett">
                        <Undertekst>{statusTilEtikettTekst[status]}</Undertekst>
                    </EtikettBase>
                    <Undertekst>
                        {<FormattedDate
                            value={new Date(dato)}
                            year="numeric"
                            month="short"
                            day="numeric"
                        />}
                    </Undertekst>
                </div>

                <div className="sak-row-right">
                    <Lenke href={href}>{temanavn}</Lenke>
                    <HoyreChevron className="sak-chevron"/>
                </div>
            </div>
        );
    }
}

DinesakerSakstema.propTypes = {
    dato: PropTypes.string,            //.instanceOf(Date),
    status: PropTypes.string,
    temanavn: PropTypes.string,
    href: PropTypes.string,
}

export default DinesakerSakstema;