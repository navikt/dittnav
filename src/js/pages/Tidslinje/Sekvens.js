import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { objectOf, any } from 'prop-types';
import IkonInformasjon from '../../../assets/IkonInformasjon';
import IkonAdvarsel from '../../../assets/IkonAdvarsel';
import IkonStatus from '../../../assets/IkonStatus';

const getTidslinjeText = (element) => ({
  SENDT: 'Status i saken din: Sendt',
  MOTTATT: 'Status i saken din: Mottatt',
  UNDER_BEHANDLING: 'Ny status i saken din: Under behandling',
}[element.statusGlobal] || element.tekst);

const getTidslinjeIcon = (type) => ({
  Beskjed: <IkonInformasjon />,
  Oppgave: <IkonAdvarsel />,
  Statusoppdatering: <IkonStatus />,
}[type]);

const Sekvens = ({ element }) => (
  <div className="sekvens">
    <div className="sekvens__ikon">
      {getTidslinjeIcon(element.type)}
    </div>
    <div className="sekvens__tekst">
      <Normaltekst>
        {getTidslinjeText(element)}
      </Normaltekst>
    </div>
  </div>
);

Sekvens.propTypes = {
  // TODO: use PropTypes.oneOfType([PropTypes.object], ...)
  element: objectOf(any),
};

Sekvens.defaultProps = {
  element: null,
};

export default Sekvens;
