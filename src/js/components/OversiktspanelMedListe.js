import React from 'react';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi'

import Lenke from "nav-frontend-lenker";
import HoyreChevron from "nav-frontend-chevron";
import PanelBase from "nav-frontend-paneler";

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

// TODO:    -kikk på designsystem docs, finn passende komponenter for å bygge dette panelet
//          -lag en gjenbrukbar generisk komponent? kan brukes til f.eks. innboks og utbetalinger

class OversiktspanelMedListe extends React.Component {
    render() {
        const { className, overskrift, ikon, headerLenkeTekst, headerLenkeHref, listeElementer, hasBorder } = this.props;

        const getElementName = (elementName) => {
            return className+"__"+elementName;
        }

        return(
            <PanelBase border={hasBorder} className={className}>
                <div className={getElementName("header")}>
                    <div className={getElementName("overskrift")}>
                        <div className="lenkepanel__ikon">
                            {ikon}
                        </div>
                        <Undertittel>
                            {/*trenger jeg FormattedMessage?!  (Ja det gjør jeg visst for lokalisering!)*/}
                            <FormattedMessage id={overskrift} />
                        </Undertittel>
                    </div>
                    <Normaltekst className={getElementName("header-lenke")}>
                        <Lenke href={headerLenkeHref}>
                            {headerLenkeTekst}
                        </Lenke>
                        <HoyreChevron className={getElementName("chevron")}/>
                    </Normaltekst>
                </div>
                <div><hr /></div>
                <div className={getElementName("liste")}>
                    {listeElementer}
                </div>
            </PanelBase>
        );
    }
}

OversiktspanelMedListe.propTypes = {
    className: PropTypes.string,
    hasBorder: PropTypes.bool,
    overskrift: PropTypes.string.isRequired,
    ikon: PropTypes.node,
    headerLenkeTekst: PropTypes.string,
    headerLenkeHref: PropTypes.string,
    listeElementer: PropTypes.arrayOf(PropTypes.node),
};

OversiktspanelMedListe.defaultProps = {
    className: "oversiktspanel",
    hasBorder: true,
};

export default OversiktspanelMedListe;