import React from 'react';

import Lenkepanel from 'nav-frontend-lenkepanel';
import { LenkepanelBase } from 'nav-frontend-lenkepanel';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import { FormattedMessage } from 'react-intl';
import Config from '../Config';

class LenkepanelMedIkon extends React.Component {
    render() {
        const {href, onClick, className, overskrift, ingress, children} = this.props;

        const linkCreator = (props) => {// eslint-disable-next-line
            return <a onClick={onClick} {...props} />;
        };

        return (
            <LenkepanelBase
                className={className}
                href={href}
                linkCreator={linkCreator}
                border={true}
            >
                <div className="lenkepanel__innhold">
                    <div className="lenkepanel__ikon">
                        {children}
                    </div>
                    <div>
                        <Undertittel>
                            <FormattedMessage id={overskrift} />
                        </Undertittel>
                        {(ingress)
                            ?
                            <Normaltekst>
                                {ingress}
                            </Normaltekst>
                            : ''
                        }
                    </div>
                </div>
            </LenkepanelBase>
        );
    }
}

const Icon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <g stroke="#000" strokeLinejoin="round" strokeMiterlimit="10" fill="none">
        <circle cx="8.5" cy="8.5" r="8"/>
        <path strokeLinecap="round" d="M14.156 14.156l9.344 9.344"/>
    </g>
</svg>);

class DittnavFliser extends React.Component {
    render() {
        return (
        <React.Fragment>
            <div className='dittnav-lenke-container'>
                <Lenkepanel border={true} className='first' href={`${Config.dittNav.SERVICES_URL}/utbetalingsoversikt/`}>
                    <FormattedMessage id='fliser.dine.utbetalinger' />
                </Lenkepanel>
                <Lenkepanel border={true} href={`${Config.dittNav.SERVICES_URL}/saksoversikt/`}>
                    <FormattedMessage id='fliser.dine.saker' />
                </Lenkepanel>
                <Lenkepanel border={true} className='last' href={`${Config.dittNav.SERVICES_URL}/mininnboks/`}>
                    <FormattedMessage id='fliser.innboks' />
                </Lenkepanel>
            </div>
            <div className='dittnav-lenkeikon-container'>
                <LenkepanelMedIkon
                    alt="Ditt sykefravær"
                    overskrift="fliser.ditt.sykevravaer"
                    className='first'
                    href={`${Config.dittNav.SERVICES_URL}/sykefravaer/`}
                >
                    <Icon/>
                </LenkepanelMedIkon>
                <LenkepanelMedIkon
                    alt="Mistet jobben"
                    overskrift="fliser.mistet.jobben"
                    href={`${Config.dittNav.SERVICES_URL}/veiledearbeidssoker/`}
                >
                    <Icon/>
                </LenkepanelMedIkon>
            </div>
            <div className='dittnav-lenkeikon-container'>
                <LenkepanelMedIkon
                    alt="Skjemaer"
                    overskrift="fliser.skjemaer"
                    className='first'
                    href='/no/person/skjemaer-for-privatpersoner'
                >
                    <Icon/>
                </LenkepanelMedIkon>
                <LenkepanelMedIkon
                    alt="Din pensjon"
                    overskrift="fliser.din.pensjon"
                    href={`${Config.dittNav.SERVICES_URL}/pselv/publisering/dinpensjon.jsf`}
                >
                    <Icon/>
                </LenkepanelMedIkon>
            </div>
        </React.Fragment>)
    }
}

export default DittnavFliser