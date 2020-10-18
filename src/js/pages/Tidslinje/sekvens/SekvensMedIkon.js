import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { objectOf, any } from 'prop-types';
import IkonInformasjon from '../../../../assets/IkonInformasjon';
import IkonAdvarsel from '../../../../assets/IkonAdvarsel';
import IkonStatus from '../../../../assets/IkonStatus';

const tidslinjeText = (notifikasjon) => ({
  SENDT: 'Status i saken din: Sendt',
  MOTTATT: 'Status i saken din: Mottatt',
  UNDER_BEHANDLING: 'Ny status i saken din: Under behandling',
}[notifikasjon.statusGlobal] || notifikasjon.tekst);

const tidslinjeIcon = (type) => ({
  Beskjed: <IkonInformasjon />,
  Oppgave: <IkonAdvarsel />,
  Statusoppdatering: <IkonStatus />,
}[type]);

const SekvensMedIkon = ({ notifikasjon }) => (
  <div className="sekvens-med-ikon">
    <div className="sekvens-med-ikon__ikon">
      {tidslinjeIcon(notifikasjon.type)}
    </div>
    <div className="sekvens-med-ikon__tekst">
      <Normaltekst>
        {tidslinjeText(notifikasjon)}
      </Normaltekst>
    </div>
  </div>
);

SekvensMedIkon.propTypes = {
  // TODO: use PropTypes.oneOfType([PropTypes.object], ...)
  notifikasjon: objectOf(any),
};

SekvensMedIkon.defaultProps = {
  notifikasjon: null,
};

export default SekvensMedIkon;
