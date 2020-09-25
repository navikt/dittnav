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

const Varslinger = () => {
  const { state } = useStore();
  const loading = false; // TODO: state.loading

  return (
    <PageBase uniqueErrors={[]}>
      <div className="row">
        <div className="brodsmulesti-row">
          <Brodsmulesti />
        </div>
        <div className="maincontent side-innhold">
          <div className="col-md-12" id="dittnav-main-container">
            <Tittel className="varslinger-tittel" tittelId="varslinger.tittel" />
            {loading ? <DelayedSpinner delay={500} spinnerClass="header-spinner" /> : null}
            <section className="infomeldinger-list">
              <AdvarselBox />
              <AktiveVarsler
                oppgaver={state.oppgaver}
                innbokser={state.innbokser}
                innloggingsstatus={state.innloggingsstatus}
              />
              <InaktiveVarsler
                oppgaver={state.inaktiveOppgaver}
                innbokser={state.inaktiveInnbokser}
                innloggingsstatus={state.innloggingsstatus}
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
