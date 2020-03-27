import React from 'react';
import { arrayOf } from 'prop-types';
import AdvarselBox from './alerts/AdvarselBox';
import Tittel from '../../components/common/Tittel';
import AktiveVarsler from './varsler/AktiveVarsler';
import InaktiveVarsler from './varsler/InaktiveVarsler';
import InnloggingType from '../../types/InnloggingType';
import OppgaverType from '../../types/OppgaveType';
import InnboksType from '../../types/InnboksType';

const Varslinger = ({ oppgaver, innbokser, inaktiveOppgaver, inaktiveInnbokser, innlogging }) => (
  <div className="row">
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
