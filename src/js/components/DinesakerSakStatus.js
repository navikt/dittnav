import React from 'react';

import { Normaltekst } from 'nav-frontend-typografi'

import PropTypes from 'prop-types'

import { FormattedMessage, FormattedDate } from "react-intl";

import Lenke from "nav-frontend-lenker";
import EtikettBase from "nav-frontend-etiketter";

class DinesakerSakStatus extends React.Component {

    render() {
        const { dato, status, temanavn, href } = this.props;

        return(
            <div className="saks-container">
                <div className="sak-row-left">
                    <Normaltekst>
                        <FormattedDate value={dato} />
                    </Normaltekst>

                    {/*Sett etikett type avhenging av saksStatus*/}
                    <EtikettBase type="fokus">
                        Under behandling
                    </EtikettBase>
                </div>
                <div className="sak-row-right">
                    <Normaltekst>
                        {temanavn}
                    </Normaltekst>
                    <Lenke href={href}>
                        {/*Sett tekst avhenging av saksStatus*/}
                        En søknad er under behandling
                    </Lenke>
                </div>
            </div>
        );
    }
}

DinesakerSakStatus.propTypes = {
    dato: PropTypes.instanceOf(Date),
    saksStatus: PropTypes.string,       // Kanskje bruk en enum?
    temanavn: PropTypes.string,         // Eller finnes det allerede definerte datatyper for saker?
    href: PropTypes.string,
}

export default DinesakerSakStatus;