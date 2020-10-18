import React from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Systemtittel } from 'nav-frontend-typografi';
import { arrayOf, object } from 'prop-types';
import Sekvens from '../Sekvens';
import Future from '../Future';

const Tidslinjepanel = ({ data }) => (
  <Panel className="tidslinje">
    <div className="sakspanel-container">
      <Systemtittel className="saksprosess-tittel">
        Saksprossesen
      </Systemtittel>
      {[
        { tekst: 'Dersom søknaden din blir godkjent vil du bli bedt om å sende meldekort, og du vil få første utbetaling 2-3 virkedager etter fristen for innsending av meldekort' },
        { tekst: 'Vi vil gi deg svar på søknaden din innen 6 uker etter at du har lastet opp all nødvendig dokumentasjon' }].map((el) => (
          <Future element={el} />
      ))}
      {data.map((el) => (
        <Sekvens element={el} />
      ))}
    </div>
  </Panel>
);

Tidslinjepanel.propTypes = {
  data: arrayOf(object),
};

Tidslinjepanel.defaultProps = {
  data: null,
};

export default Tidslinjepanel;
