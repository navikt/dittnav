import React from 'react';
import { Panel } from 'nav-frontend-paneler';
import { Systemtittel } from 'nav-frontend-typografi';
import { arrayOf, object, string } from 'prop-types';
import SekvensMedIkon from '../sekvens/SekvensMedIkon';
import Sekvens from '../sekvens/Sekvens';

const Tidslinjepanel = ({ notifikasjoner, forventninger }) => (
  <Panel className="tidslinje">
    <div className="sakspanel-container">
      <Systemtittel className="saksprosess-tittel">
        Saksprossesen
      </Systemtittel>
      {forventninger.map((tekst) => (
        <Sekvens tekst={tekst} />
      ))}
      {notifikasjoner.map((notifikasjon) => (
        <SekvensMedIkon notifikasjon={notifikasjon} />
      ))}
    </div>
  </Panel>
);

Tidslinjepanel.propTypes = {
  notifikasjoner: arrayOf(object),
  forventninger: arrayOf(string),
};

Tidslinjepanel.defaultProps = {
  notifikasjoner: null,
  forventninger: null,
};

export default Tidslinjepanel;
