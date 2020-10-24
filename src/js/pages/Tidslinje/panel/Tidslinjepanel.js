import React from 'react';
import Panel from 'nav-frontend-paneler';
import { Systemtittel } from 'nav-frontend-typografi';
import { arrayOf, object, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import TidslinjeSekvens from '../sekvens/Tidslinjesekvens';

const Tidslinjepanel = ({ notifikasjoner, forventninger }) => (
  <Panel className="tidslinje">
    <div className="sakspanel-container">
      <Systemtittel className="saksprosess-tittel">
        <FormattedMessage id="tidslinje.saksprosess.tittel" />
      </Systemtittel>
      {forventninger.map((tekst) => (
        <TidslinjeSekvens key={tekst} type="sekvens" className="sekvens" tekst={tekst} />
      ))}
      {notifikasjoner.map((notifikasjon) => (
        <TidslinjeSekvens key={notifikasjon.eventId} type="sekvensMedIkon" className="sekvens-med-ikon" notifikasjon={notifikasjon} />
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
