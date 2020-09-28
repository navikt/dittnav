import React from 'react';
import { arrayOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import Config from '../../globalConfig';
import AdvarselBox from './alerts/AdvarselBox';
import Tittel from '../../components/common/Tittel';
import AktiveVarsler from './varsler/AktiveVarsler';
import InaktiveVarsler from './varsler/InaktiveVarsler';
import InnloggingsstatusType from '../../types/InnloggingsstatusType';
import OppgaveType from '../../types/OppgaveType';
import InnboksType from '../../types/InnboksType';
import {
  GoogleAnalyticsAction,
  GoogleAnalyticsCategory,
  trackEvent,
} from '../../utils/GoogleAnalytics';

const Varslinger = ({ oppgaver, innbokser, inaktiveOppgaver, inaktiveInnbokser, innloggingsstatus }) => (
  <div className="row">
    <div className="maincontent side-innhold">
      <div className="col-md-12" id="dittnav-main-container">
        <Tittel className="varslinger-tittel" tittelId="varslinger.tittel" />
        <section className="infomeldinger-list">
          <AdvarselBox />
          <AktiveVarsler
            oppgaver={oppgaver}
            innbokser={innbokser}
            innloggingsstatus={innloggingsstatus}
          />
          <InaktiveVarsler
            oppgaver={inaktiveOppgaver}
            innbokser={inaktiveInnbokser}
            innloggingsstatus={innloggingsstatus}
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
);

Varslinger.propTypes = {
  oppgaver: arrayOf(OppgaveType),
  innbokser: arrayOf(InnboksType),
  inaktiveOppgaver: arrayOf(OppgaveType),
  inaktiveInnbokser: arrayOf(InnboksType),
  innloggingsstatus: InnloggingsstatusType,
};

Varslinger.defaultProps = {
  oppgaver: null,
  innbokser: null,
  innloggingsstatus: null,
  inaktiveOppgaver: null,
  inaktiveInnbokser: null,
};

export default Varslinger;
