import React from 'react';
import { FormattedMessage } from 'react-intl';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import useStore from '../../hooks/useStore';
import Config from '../../globalConfig';
import Brodsmulesti from '../../components/brodsmulesti/Brodsmulesti';
import AdvarselBox from './alerts/AdvarselBox';
import Tittel from '../../components/common/Tittel';
import AktiveVarsler from './varsler/AktiveVarsler';
import InaktiveVarsler from './varsler/InaktiveVarsler';
import { GoogleAnalyticsAction, GoogleAnalyticsCategory, trackEvent } from '../../utils/GoogleAnalytics';
import PageBase from '../PageBase';
import DelayedSpinner from '../../components/DelayedSpinner';
import InnloggingsModal from '../../components/common/InnloggingsModal';

const Varslinger = () => {
  const { state } = useStore();
  const isLoading = Object.keys(state).some((key) => state[key].loading);

  if (state.visInnloggingsModal) {
    return (<InnloggingsModal onClick={() => null} isOpen />);
  }

  return (
    <PageBase uniqueErrors={[]}>
      <div className="row">
        <div className="brodsmulesti-row">
          <Brodsmulesti />
        </div>
        <div className="maincontent side-innhold">
          <div className="col-md-12" id="dittnav-main-container">
            <Tittel className="varslinger-tittel" tittelId="varslinger.tittel" />
            {isLoading ? <DelayedSpinner delay={500} spinnerClass="header-spinner" /> : null}
            <section className="infomeldinger-list">
              <AdvarselBox />
              <AktiveVarsler
                oppgaver={state.oppgaver.data}
                innbokser={state.innbokser.data}
                innloggingsstatus={state.innloggingsstatus.data}
              />
              <InaktiveVarsler
                oppgaver={state.inaktiveOppgaver.data}
                innbokser={state.inaktiveInnbokser.data}
                innloggingsstatus={state.innloggingsstatus.data}
              />
              <Panel className="mininnboks-panel">
                <Normaltekst>
                  <FormattedMessage
                    id="varslinger.mininnboks.melding"
                    values={{
                      innboksen: (
                        <Lenke
                          href={Config.LENKER.innboks.url}
                          onClick={() => trackEvent(
                            GoogleAnalyticsCategory.Varslinger,
                            GoogleAnalyticsAction.Innboks,
                            Config.LENKER.innboks.url,
                          )}
                        >
                          innboksen
                        </Lenke>
                      ),
                    }}
                  />
                </Normaltekst>
              </Panel>
            </section>
          </div>
        </div>
      </div>
    </PageBase>
  );
};

export default Varslinger;
