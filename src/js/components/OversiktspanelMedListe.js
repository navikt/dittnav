import React from 'react';
import PropTypes from 'prop-types';

import { Normaltekst, Undertittel } from 'nav-frontend-typografi'

import Lenke from "nav-frontend-lenker";
import HoyreChevron from "nav-frontend-chevron";
import PanelBase from "nav-frontend-paneler";

class OversiktspanelMedListe extends React.Component {
    render() {
        const { className, border, overskrift, ikon, headerLenkeTekst, headerLenkeHref, liste } = this.props;

        return(
            <PanelBase border={border} className={"oversiktspanel "+className}>
                <div className="oversiktspanel__header">
                    <div className="oversiktspanel__overskrift">
                        <div className="lenkepanel__ikon">
                            {ikon}
                        </div>
                        <Undertittel>
                            {overskrift}
                        </Undertittel>
                    </div>
                    <Normaltekst className="oversiktspanel__header-lenke">
                        <Lenke href={headerLenkeHref}>
                            {headerLenkeTekst}
                        </Lenke>
                        <HoyreChevron className="oversiktspanel__chevron"/>
                    </Normaltekst>
                </div>
                { liste && liste.length > 0 ?
                    <>
                    <div><hr /></div>
                    <div className="oversiktspanel__liste">
                        {liste}
                    </div>
                    </>
                    : null
                }

            </PanelBase>
        );
    }
}

OversiktspanelMedListe.propTypes = {
    className: PropTypes.string,
    border: PropTypes.bool,
    overskrift: PropTypes.node,
    ikon: PropTypes.node,
    headerLenkeTekst: PropTypes.string,
    headerLenkeHref: PropTypes.string,
    liste: PropTypes.arrayOf(PropTypes.node),
};

OversiktspanelMedListe.defaultProps = {
    border: true,
};

export default OversiktspanelMedListe;