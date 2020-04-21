import React from 'react';
import { arrayOf } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { Normaltekst } from 'nav-frontend-typografi';
import Config from '../../globalConfig';
import Brodsmulesti from '../../components/brodsmulesti/Brodsmulesti';
import AdvarselBox from './alerts/AdvarselBox';
import Tittel from '../../components/common/Tittel';
import AktiveVarsler from './varsler/AktiveVarsler';
import InaktiveVarsler from './varsler/InaktiveVarsler';
import InnloggingType from '../../types/InnloggingType';
import OppgaverType from '../../types/OppgaveType';
import InnboksType from '../../types/InnboksType';

const Varslinger = ({ oppgaver, innbokser, inaktiveOppgaver, inaktiveInnbokser, innlogging }) => (
  <div className="row">
    <div className="brodsmulesti-row">
      <Brodsmulesti />
    </div>
    <div className="maincontent side-innhold">
      <div className="col-md-12" id="dittnav-main-container">
        <Tittel className="varslinger-tittel" tittelId="varslinger.tittel" />
        <section className="infomeldinger-list">
          <AdvarselBox />
          <AktiveVarsler
            oppgaver={oppgaver}
            innbokser={innbokser}
            innlogging={innlogging}
          />
          <InaktiveVarsler
            oppgaver={inaktiveOppgaver}
            innbokser={inaktiveInnbokser}
            innlogging={innlogging}
          />
          <Panel className="mininnboks-panel">
            <Normaltekst>
              <FormattedMessage
                id="varslinger.mininnboks.melding"
                values={{
                  innboksen: <Lenke id="innboksmelding-id" href={Config.LENKER.innboks.url}>innboksen</Lenke>,
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
  oppgaver: arrayOf(OppgaverType),
  innbokser: arrayOf(InnboksType),
  inaktiveOppgaver: arrayOf(OppgaverType),
  inaktiveInnbokser: arrayOf(InnboksType),
  innlogging: InnloggingType,
};

Varslinger.defaultProps = {
  oppgaver: null,
  innbokser: null,
  innlogging: null,
  inaktiveOppgaver: null,
  inaktiveInnbokser: null,
};

export default Varslinger;
