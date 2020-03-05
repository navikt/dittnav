import React from 'react';
import AdvarselBox from './alerts/AdvarselBox';
import Tittel from '../../components/common/Tittel';
import HendelserType from '../../types/HendelserType';
import AktiveVarsler from './AktiveVarsler';
import InnloggingType from '../../types/InnloggingType';

const Varslinger = ({ hendelser, innlogging }) => (
  <div className="row">
    <div className="maincontent side-innhold">
      <div className="col-md-12" id="dittnav-main-container">
        <Tittel className="varslinger-tittel" tittelId="varslinger.tittel" />
        <section className="infomeldinger-list">
          <AdvarselBox />
          <AktiveVarsler hendelser={hendelser} innlogging={innlogging} />
        </section>
      </div>
    </div>
  </div>
);

Varslinger.propTypes = {
  hendelser: HendelserType,
  innlogging: InnloggingType,
};

Varslinger.defaultProps = {
  hendelser: null,
  innlogging: null,
};

export default Varslinger;
