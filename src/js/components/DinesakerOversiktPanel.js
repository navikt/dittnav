import React from 'react';

import { Normaltekst, Undertittel} from 'nav-frontend-typografi'

import Lenke from "nav-frontend-lenker";
import HoyreChevron from "nav-frontend-chevron";
import PanelBase from "nav-frontend-paneler";

import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import DinesakerSakStatus from "./DinesakerSakStatus";

// TODO:    -kikk på designsystem docs, finn passende komponenter for å bygge dette panelet
//          -fetch data fra API (evt. bruk dummy-data siden API ikke er ferdig?)
//          -sett inn riktig ikon-grafikk
//          -rydd opp litt i kode, mulig overflødige klasser?
//

class DinesakerOversiktPanel extends React.Component {
    render() {
        const { href, onClick, className, overskrift, ingress, children } = this.props;

        const linkCreator = props => <a onClick={onClick} {...props} />;

        return(
            <PanelBase border className="dinesaker-panel">
                <div className="dinesaker-header">
                    <div className="ikon-og-overskrift">
                        <div className="dinesaker-ikon">
                            {children}
                        </div>
                        <div>
                            <Undertittel>
                                <FormattedMessage id={overskrift} />
                            </Undertittel>
                        </div>
                    </div>
                    <div>
                        <Normaltekst>
                            <Lenke href={href}>
                                Se flere dine saker
                                <HoyreChevron/>
                            </Lenke>
                        </Normaltekst>
                    </div>
                </div>
                <div><hr /></div>
                <div className="dinesaker-saker">
                    {/*Opp til n saker vises her.
                     Dersom #saker <= n, vis "Du har ingen flere saker" tekst
                     Hvis flere enn n saker, vis link til full oversikt?*/}
                    <DinesakerSakStatus
                        dato={new Date(Date.UTC(2019, 7,1))}
                        saksStatus={"under-behandling"}
                        temanavn={"Foreldrepenger"}
                        href={"#"}
                    />
                    <DinesakerSakStatus
                        dato={new Date(Date.UTC(2019, 8,15))}
                        saksStatus={"under-behandling"}
                        temanavn={"Sykepenger"}
                        href={"#"}
                    />
                </div>
                <div><hr /></div>
                <div className="dinesaker-footer">
                    <Normaltekst>
                        Du har ingen flere saker
                    </Normaltekst>
                </div>
            </PanelBase>
        );
    }
}

DinesakerOversiktPanel.propTypes = {
    href: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    className: PropTypes.string,
    overskrift: PropTypes.string.isRequired,
    ingress: PropTypes.string,
    children: PropTypes.node.isRequired,
};

DinesakerOversiktPanel.defaultProps = {
    onClick: null,
    className: '',
    ingress: '',
};

export default DinesakerOversiktPanel;