import React from 'react';
import PropTypes from 'prop-types';
import AdvarselBox from './alerts/AdvarselBox';
import Tittel from '../../components/common/Tittel';
import AktiveVarsler from './AktiveVarsler';
import InnloggingType from '../../types/InnloggingType';
import BeskjedType from '../../types/BeskjedType';
import OppgaverType from '../../types/OppgaveType';
import InnboksType from '../../types/InnboksType';

const Varslinger = ({ beskjeder, oppgaver, innbokser, innlogging }) => (
  <div className="row">
    <div className="maincontent side-innhold">
      <div className="col-md-12" id="dittnav-main-container">
        <Tittel className="varslinger-tittel" tittelId="varslinger.tittel" />
        <section className="infomeldinger-list">
          <AdvarselBox />
          <AktiveVarsler beskjeder={beskjeder} oppgaver={oppgaver} innbokser={innbokser} innlogging={innlogging} />
        </section>
      </div>
    </div>
  </div>
);

Varslinger.propTypes = {
  beskjeder: PropTypes.arrayOf(BeskjedType),
  oppgaver: PropTypes.arrayOf(OppgaverType),
  innbokser: PropTypes.arrayOf(InnboksType),
  innlogging: InnloggingType,
};

Varslinger.defaultProps = {
  beskjeder: null,
  oppgaver: null,
  innbokser: null,
  innlogging: null,
};

export default Varslinger;
