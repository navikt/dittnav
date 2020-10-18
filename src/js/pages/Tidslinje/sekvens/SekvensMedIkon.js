import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { objectOf, any, string } from 'prop-types';
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

const SekvensMedIkon = ({ notifikasjon, className }) => (
  <div className={className}>
    <div className={`${className}__ikon`}>
      {tidslinjeIcon(notifikasjon.type)}
    </div>
    <div className={`${className}__tekst`}>
      <Normaltekst>
        {tidslinjeText(notifikasjon)}
      </Normaltekst>
    </div>
  </div>
);

SekvensMedIkon.propTypes = {
  notifikasjon: objectOf(any),
  className: string,
};

SekvensMedIkon.defaultProps = {
  notifikasjon: null,
  className: null,
};

export default SekvensMedIkon;
